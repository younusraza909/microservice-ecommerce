"use client";
import { PaymentFormInputs, paymentFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const PaymentForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const onSubmit: SubmitHandler<PaymentFormInputs> = (data) => {};

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardHolder"
          className="text-xs text-gray-500 font-medium"
        >
          Name on card
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cardHolder"
          placeholder="John Doe"
          {...register("cardHolder")}
        />
        {errors.cardHolder && (
          <p className="text-xs text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm color-gray-500 font-medium">
          Card Number
        </label>
        <input
          className="
        border-b-1 border-gray-200
         py-2 outline-none text-sm
        "
          placeholder="Enter your email"
          type="text"
          id="cardNumber"
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-xs">{errors.cardNumber.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm color-gray-500 font-medium">
          Expiration Date
        </label>
        <input
          className="
        border-b-1 border-gray-200
         py-2 outline-none text-sm
        "
          type="text"
          placeholder="Enter your phone number"
          id="expirationDate"
          {...register("expirationDate")}
        />
        {errors.expirationDate && (
          <p className="text-red-500 text-xs">
            {errors.expirationDate.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm color-gray-500 font-medium">
          CVV
        </label>
        <input
          className="
        border-b-1 border-gray-200
         py-2 outline-none text-sm
        "
          type="text"
          placeholder="Enter your address"
          id="cvv"
          {...register("cvv")}
        />
        {errors.cvv && (
          <p className="text-red-500 text-xs">{errors.cvv.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Image
          src="/klarna.png"
          alt="klarna"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/cards.png"
          alt="cards"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/stripe.png"
          alt="stripe"
          width={50}
          height={25}
          className="rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
      >
        Checkout
        <ShoppingCart className="w-3 h-3" />
      </button>
    </form>
  );
};

export default PaymentForm;
