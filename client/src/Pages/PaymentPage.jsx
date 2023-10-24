import React from "react";
import Navbar2 from "../Components/Navbar/Navbar2";
import PaymentForm from "../Components/PaymentForm/PaymentForm";
import StripeProvider from "../Components/StripeProvider/StripeProvider";

function PaymentPage() {
  return (
    <div>
      <StripeProvider>
        <Navbar2 />
        <PaymentForm />
      </StripeProvider>
    </div>
  );
}

export default PaymentPage;
