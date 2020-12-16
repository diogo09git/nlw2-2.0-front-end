import { createContext } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface Cart {
    products?: Product[];
    shippingValue?: number;
}

const CartContext = createContext<Cart>({
    products: [],
    shippingValue: 0
});

export default CartContext;