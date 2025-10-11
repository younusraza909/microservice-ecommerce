import Image from "next/image";
import Link from "next/link";
import React from "react";
import Searchbar from "./Searchbar";
import { Bell, Home, ShoppingCart } from "lucide-react";
import Logo from "./Logo";
import ShoppingCartIcon from "./ShoppingCartIcon";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between border-b border-color-gray-200 pb-4">
      {/* LEFT SIDE */}
      <Logo />
      {/* RIGHT SIDE */}
      <div>
        <div className="flex items-center gap-6">
          <Searchbar />
          <Link href="/" className="flex items-center gap-1">
            <Home className="w-4 h-4 text-gray-600" />
          </Link>
          <Link href="/" className="flex items-center gap-1">
            <Bell className="w-4 h-4 text-gray-600" />
          </Link>
          <ShoppingCartIcon />
          <Link href="/login" className="">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
