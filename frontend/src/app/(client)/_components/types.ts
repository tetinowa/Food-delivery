export interface FoodCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  category?: string;
  ingredients?: string;
}

export interface FoodFromAPI {
  _id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
  categoryId: string;
  ingredients?: string;
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
