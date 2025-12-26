export interface FoodCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export interface OrderProps {
  id: string;
  number: number;
  customerName: string;
  items: Array<{
    foodId: string;
    quantity: number;
  }>;
  totalPrice: number;
  status: "pending" | "preparing" | "delivering" | "delivered";
  createdAt: string;
  address: string;
}
