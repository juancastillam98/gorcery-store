
import {createContext, useState} from "react";
import {getCartItems} from "@/utils/GlobalAPi";

export const ProductsContext = createContext();
export default function ProductsProvider({children}){
    const [updateCart, setUpdateCart]=useState(false)
    const  [cartListItem, setCartListItem]=useState([])
    const [subtotal, setSubtotal]=useState(0)
    const [totalCartItems, setTotalCartItems]=useState(0);
    const [totalPrice, setTotalPrice]=useState(0)

    const calculoSubtotal=()=>{
        let total=0;
        {cartListItem?.forEach(element =>{
            total+=element.amount;
        })}
        //const total = parseFloat((subtotal + 5).toFixed(2));
        setSubtotal(parseFloat(total.toFixed(2)));
        setTotalPrice(parseFloat((total + 4.99).toFixed(2)))
    }



    return (
        <ProductsContext.Provider
        value={
            {
                updateCart,
                setUpdateCart,
                cartListItem,
                setCartListItem,
                subtotal,
                setSubtotal,
                totalCartItems,
                setTotalCartItems,
                calculoSubtotal,
                totalPrice
            }
        }
        >
            {children}
        </ProductsContext.Provider>
    )
}