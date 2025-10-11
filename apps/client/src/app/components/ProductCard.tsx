"use client";
import React, { useState } from "react";
import { ProductsType } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductsType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0]!,
    color: product.colors[0]!,
  });
  const { addToCart } = useCartStore();

  const handleProductTypesChange = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes({ ...productTypes, [type]: value });
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size ?? "",
      selectedColor: productTypes.color ?? "",
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[productTypes.color] ?? ""}
            alt={product.name}
            fill
            className="hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      {/* PRODUCT DETAILS */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* Product types */}
        <div className="flex items-center gap-4 text-xs">
          {/* SIZE */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              value={productTypes.size}
              onChange={(e) =>
                handleProductTypesChange({
                  type: "size",
                  value: e.target.value,
                })
              }
              className="ring ring-gray-300 rounded-md p-1 px-2"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* COLOR */}
          <div className="flex flex-col gap-1 cursor-pointer">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className={`rounded-full border-1 ${
                    productTypes.color === color
                      ? "border-gray-400"
                      : "border-gray-200"
                  } w-5 h-5 flex items-center justify-center`}
                >
                  <div
                    onClick={() =>
                      handleProductTypesChange({
                        type: "color",
                        value: color,
                      })
                    }
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* PRICE AND ADD TO CART */}
        <div className="flex items-center justify-between gap-4">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="ring ring-gray-300 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
