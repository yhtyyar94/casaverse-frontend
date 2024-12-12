export interface ProductProps {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  id: number;
}
export interface StoreProduct {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  id: number;
  quantity: number;
}

export interface StateProps {
  productData: [];
  favoriteData: [];
  userInfo: null | string;
  next: any;
}
