"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="flex items-center gap-2 text-sm justify-end text-gray-500 my-6">
      <span>Sort by:</span>
      <select
        name="sort"
        id="sort"
        value={searchParams.get("sort") || "newest"}
        onChange={(e) => handleSortChange(e.target.value)}
        className="ring-1 ring-gray-200 shadow-md p-1 rounded-sm"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Filter;
