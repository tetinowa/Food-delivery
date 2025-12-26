import { OrderProps } from "./types";

export const Orders: OrderProps[] = [
  {
    id: "order1",
    number: 1,
    customerName: "John Doe",
    items: [
      {
        foodId: "food1",
        quantity: 2,
      },
    ],
    totalPrice: 20.0,
    status: "pending",
    createdAt: "2023-04-05T14:30:00Z",
    address: "123 Main Street",
  },
];
