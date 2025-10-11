import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image
        src="/logo.png"
        alt="logo"
        width={36}
        height={36}
        className="w-6 h-6 md:w-9 md:h-9"
      />
      <p className="text-md font-medium tracking-wider hidden md:block">
        TRENDLY
      </p>
    </Link>
  );
};

export default Logo;
