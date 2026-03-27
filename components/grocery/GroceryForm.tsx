"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

const predefinedItems = {
  Fruits: ["Apple", "Banana"],
  Vegetables: ["Carrot", "Onion"],
  Candy: ["Kitkat"],
  Spices: ["Pepper"],
  Ration: ["Rice", "Wheat"],
  Bakery: ["Bread", "Chips"],
};

export default function GroceryForm() {

  const qc = useQueryClient();

  const [category, setCategory] = useState("Fruits");
  const [selectedItem, setSelectedItem] = useState("");
  const [customItem, setCustomItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const mutation = useMutation({
    mutationFn: (data: any) => api.post("/api/grocery", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["groceries"] }),
  });

  const submit = () => {
    const name = customItem || selectedItem;
    if (!name) return alert("Enter item");

    mutation.mutate({ name, quantity, category, note });

    setCustomItem("");
    setSelectedItem("");
    setNote("");
  };

  return (
    <div className="p-4 border rounded-xl space-y-2">

      <select onChange={e => setCategory(e.target.value)} className="border p-2 w-full">
        {Object.keys(predefinedItems).map(c => <option key={c}>{c}</option>)}
      </select>

      <select value={selectedItem}
        onChange={e => setSelectedItem(e.target.value)}
        className="border p-2 w-full">
        <option value="">Select Item</option>
        {predefinedItems[category].map(i => <option key={i}>{i}</option>)}
      </select>

      <input
        placeholder="Or type new item"
        className="border p-2 w-full"
        value={customItem}
        onChange={e => setCustomItem(e.target.value)}
      />

      <input type="number" step="0.25" min="0.25" max="5"
        className="border p-2 w-full"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      />

      <input
        placeholder="Note (optional)"
        className="border p-2 w-full"
        value={note}
        onChange={e => setNote(e.target.value)}
      />

      <button onClick={submit}
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Item
      </button>
    </div>
  );
}