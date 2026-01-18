"use client";

import { OrderTable } from "@/app/(client)/_components/ordertable";

export default function Orders() {
  return (
    <main className="w-full">
      <div className="bg-white rounded-2xl p-6">
        <OrderTable />
      </div>
    </main>
  );
}
