// import { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';

// export interface Product {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   image: string;
//   inStock: number;
//   categories: string[];
// }

// interface ProductContext {
//     products: Product[];
//     getAllProducts: () => Promise<void>;
// }

// export interface NewProduct {
//   title: string;
//   description: string;
//   price: number,
//   image: string,
//   inStock: number,
// }

// const ProductContext = createContext<ProductContext>({
//   products: [],
//   getAllProducts: async () => {},
// })

// export const useProductContext = () => useContext(ProductContext)

// const ProductProvider = ({children}: PropsWithChildren) => {
//   const [ products, setProducts ] = useState<Product[]>([]);

//   const getAllProducts = async () => {
//       try {
//         const response = await fetch(
//           "api/products"
//         );
//         const data = await response.json();
//         setProducts(data);
 
//       } catch (err) {
//         console.log(err);
//       }
//     };

//   useEffect(() => {
//       getAllProducts();
//     }, []);


//     return (
//     <ProductContext.Provider value = {{ products, getAllProducts }}>
//         {children}
//     </ProductContext.Provider>
// )

// }

// export default ProductProvider

