export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  prepTime: string;
  isVeg: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
