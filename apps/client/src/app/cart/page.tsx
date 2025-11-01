"use client";
import { ShippingFormInputs } from "@repo/types";
import { ArrowRight, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ShippingForm from "../components/ShippingForm";
import Image from "next/image";
import useCartStore from "@/stores/cartStore";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();
  const { cart, removeFromCart } = useCartStore();
  const activeStep = +(searchParams.get("step") || 1);

  return (
    <div className="flex flex-col gap-8 items-center  justify-center mt-12">
      {/* Title */}
      <h1 className="text-2xl font-medium">Shopping Cart</h1>
      {/* Steps */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 border-b-2 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-400"
            } pb-4`}
          >
            <div
              className={`w-6 h-6 rounded-full text-white p-4  flex items-center justify-center ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {step.id}
            </div>
            <span
              className={`text-sm text-gray-500
            ${step.id === activeStep ? "text-gray-800" : "text-gray-400"}`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* CART ITEMS & DETAILS TOTAL */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cart.map((item) => (
              // SINGLE CART ITEM
              <div
                className="flex items-center justify-between"
                key={item.id + item.selectedSize + item.selectedColor}
              >
                {/* IMAGE AND DETAILS */}
                <div className="flex gap-8">
                  {/* IMAGE */}
                  <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={
                        (item.images as Record<string, string>)?.[
                          item.selectedColor
                        ] || ""
                      }
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* ITEM DETAILS */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                      <p className="text-xs text-gray-500">
                        Color: {item.selectedColor}
                      </p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                {/* DELETE BUTTON */}
                <button
                  onClick={() => removeFromCart(item)}
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? null : (
            <p className="text-sm text-gray-500">
              Please fill the shipping form first to continue
            </p>
          )}
        </div>
        <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount(10%)</p>
              <p className="font-medium">$ 10</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-medium">$10</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
