"use client";

import { OrderTable } from "@/app/admin/_components/ordertable";

export default function Orders() {
  return (
    <main className="w-full">
      <div className="bg-white rounded-2xl p-6">
        <OrderTable />
      </div>
    </main>
  );
}
