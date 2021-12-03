export interface Producto {
  category:    string;
  description: string;
  id:          number;
  image:       string;
  price:       number;
  quantity:    number;
  rating:      Rating;
  title:       string;
  total:       number;
}

export interface Rating {
  rate:  number;
  count: number;
}
