"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CartItemsType, ShippingFormInputs } from "@repo/types";
import useCartStore from "@/stores/cartStore";
import CheckoutForm from "./CheckoutForm";

const stripe = loadStripe(
  "pk_test_51SObAePK4EGvLhE2KeP2a8MivY8bOMNhvD4t4wK0FjHK8o5fmNYvn8VFNwPKcvXWiCVxcqhLwCWV2XcPJY9sYVfd00fb93hisj"
);

const fetchClientSecret = async (cart: CartItemsType, token: string) => {
  return fetch(`http://localhost:8002/sessions/create-checkout-session`, {
    method: "POST",
    body: JSON.stringify({
      cart,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => json.checkoutSessionClientSecret);
};

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const { cart } = useCartStore();
  const [token, setToken] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  if (!token) {
    return <div className="">Loading...</div>;
  }

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{ fetchClientSecret: () => fetchClientSecret(cart, token) }}
    >
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
