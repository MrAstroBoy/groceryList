"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex gap-4 p-4 bg-gray-800 text-white">
      <Link href="/">Dashboard</Link>
      <Link href="/chat">Chat</Link>
    </div>
  );
}