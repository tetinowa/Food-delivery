type Food = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients?: string;
  categoryIds: {
    _id: string;
    name: string;
  }[];
};
export type { Food };
