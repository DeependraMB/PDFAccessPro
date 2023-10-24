import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaymentForm = ({ onPurchase }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardName, setCardName] = useState('');
  const [customerName, setCustomerName] = useState(''); // New state for customer name
  const [customerAddress, setCustomerAddress] = useState(''); // New state for customer address
  const { id } = useParams();
  const [pdfDetails, setPdfDetails] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {
    const fetchPdfDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/get-pdf/${id}`);
        setPdfDetails(response.data);
      } catch (error) {
        console.error('Error fetching PDF details:', error);
      }
    };

    fetchPdfDetails();

    const createPaymentIntent = async () => {
      try {
        const response = await axios.post('http://localhost:5001/create-payment-intent', {
          amount: pdfDetails.price * 100,
          currency: 'usd',
          description: pdfDetails.title,
          customerName: customerName, // Include customer name
          customerAddress: customerAddress, // Include customer address
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    createPaymentIntent();
  }, [id, pdfDetails, customerName, customerAddress]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret || isLoading) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: cardName },
      },
    });

    setIsLoading(false);

    if (error) {
      console.error(error);
    } else if (paymentMethod) {
      onPurchase(paymentMethod, pdfDetails);
    }
  };

  return (
    <div>
      <h2>PDF Details</h2>
      <p>Title: {pdfDetails ? pdfDetails.title : 'Loading...'}</p>
      <p>Price: {pdfDetails ? pdfDetails.price + ' Rupees' : 'Loading...'}</p>

      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Customer Name" // Add a field for customer name
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Customer Address" // Add a field for customer address
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
        <CardElement />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : `Pay ${pdfDetails ? pdfDetails.price : '...'} Rupees`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
