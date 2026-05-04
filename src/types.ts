export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  price: string;
  priceNum: number;
  description?: string;
  image?: string;
  category: 'coffee' | 'tea' | 'food' | 'drinks';
}

export interface Category {
  id: MenuItem['category'];
  label: string;
  icon: string;
}

export interface CartItem extends MenuItem {
  cartId: string; // Unique ID for items in cart (allows multiple of same item)
}

export interface Feature {
  id: string;
  title: string;
  content: string;
}
