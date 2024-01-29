import { Product } from "./ProductInterfaces";

export interface CartItem {
 quantity: number;
 product: Product;
 _id: string, 
 price: number,
}
