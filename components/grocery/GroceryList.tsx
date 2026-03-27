"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";

export default function GroceryList() {
  const [filter, setFilter] = useState("");

  const { data = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["groceries", filter],
    queryFn: async () => {
      const url = filter
        ? `/api/grocery/category/${filter}`
        : `/api/grocery`;
      const res = await api.get(url);
      return res.data;
    }
  });

  const toggle = async (id: number) => {
    await api.put(`/api/grocery/${id}/toggle`);
    refetch();
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Error loading data</p>;
  }

  return (
    <div className="space-y-3">

      {/* Filter Dropdown */}
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 rounded-lg border shadow-sm bg-white"
      >
        <option value="">All Categories</option>
        <option>Fruits</option>
        <option>Vegetables</option>
        <option>Ration</option>
        <option>Bakery</option>
        <option>Spices</option>
      </select>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center text-gray-400 mt-5">
          No items found 🛒
        </div>
      )}

      {/* List */}
      {data.map((i: any) => (
        <div
          key={i.id}
          className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border"
        >
          {/* Left */}
          <div>
            <p className="font-medium text-gray-800">
              {i.item?.name}
            </p>
            <p className="text-sm text-gray-500">
              {i.quantity} • {i.item?.category?.name}
            </p>

            {i.note && (
              <p className="text-xs text-gray-400 italic">
                {i.note}
              </p>
            )}
          </div>

          {/* Right */}
          <input
            type="checkbox"
            checked={i.bought}
            onChange={() => toggle(i.id)}
            className="w-5 h-5 accent-green-600"
          />
        </div>
      ))}
    </div>
  );
}