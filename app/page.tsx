"use client";

import { useState } from "react";
import AddItemForm from "@/components/grocery/GroceryForm";
import GroceryList from "@/components/grocery/GroceryList";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="flex flex-col h-full">
      
      {/* Header */}
      <div className="bg-green-600 text-white p-4 text-lg font-semibold shadow">
        Grocery List
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <AddItemForm onAdd={() => setRefresh(!refresh)} />
        <GroceryList key={refresh.toString()} />
      </div>

      {/* Bottom Nav */}
      <div className="h-14 bg-gray-100 flex justify-around items-center border-t">
        <span>🏠</span>
        <span>💬</span>
      </div>

    </div>
  );
}