"use client";
import { ShippingFormInput, shippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInput) => void;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInput>({
    resolver: zodResolver(shippingFormSchema),
  });

  const onSubmit: SubmitHandler<ShippingFormInput> = (data) => {
    setShippingForm(data);
    router.push("/cart?step=3", { scroll: false });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm color-gray-500 font-medium">
          Name
        </label>
        <input
          className="
        border-b-1 border-gray-200
         py-2 outline-none text-sm
        "
          type="text"
          placeholder="Enter your name"
          id="name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm color-gray-500 font-medium">
          Email
        </label>
        <input
          className="
        border-b-1 border-gray-200
         py-2 outline-none text-sm
        "
          placeholder="Enter your email"
          type="text"
          id="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm color-gray-500 font-medium">
          Phone Number
        </label>
        <input
          className="
        border-b-1 border-gray-200
         py-2 outline-none text-sm
        "
          type="text"
          placeholder="Enter your phone number"
          id="phone"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs">{errors.phone.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm color-gray-500 font-medium">
          Address
        </label>
        <input
          className="
        border-b-1 border-gray-200
         py-2 outline-none text-sm
        "
          type="text"
          placeholder="Enter your address"
          id="phone"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-red-500 text-xs">{errors.address.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm color-gray-500 font-medium">
          City
        </label>
        <input
          className="
        border-b-1 border-gray-200
         py-2 outline-none text-sm
        "
          type="text"
          placeholder="Enter your address"
          id="city"
          {...register("city")}
        />
        {errors.city && (
          <p className="text-red-500 text-xs">{errors.city.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
      >
        Continue
        <ArrowRight className="w-3 h-3" />
      </button>
    </form>
  );
};

export default ShippingForm;
