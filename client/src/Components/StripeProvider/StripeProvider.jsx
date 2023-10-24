import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51O4ObVSJTQs86EUI2eFMr9hFdZbqJvIjCsx7Q1y0NilbodsIpd9hMXwQJUbaapiwIwCPkMOaAP3Y9S8bnmbqSBmh00vG972Y70');

const StripeProvider = ({ children }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeProvider;
