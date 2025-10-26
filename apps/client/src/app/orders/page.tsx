import { auth } from "@clerk/nextjs/server";
import React from "react";

const OrdersPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const productResponse = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const productData = await productResponse.json();
  console.log(productData);

  const paymentResponse = await fetch("http://localhost:8002/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const paymentData = await paymentResponse.json();
  console.log(paymentData);

  const orderResponse = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const orderData = await orderResponse.json();
  console.log(orderData);

  return <div>OrdersPage</div>;
};

export default OrdersPage;
