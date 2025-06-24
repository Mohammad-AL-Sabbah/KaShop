import { useState } from "react";
import { createContext } from "react";



export const CartContext = createContext(null);

const CartContextProvider = ({children})=>{

    const [cartItems, setCartItems] = useState(0);
    return(
        <>
        <CartContext.Provider value={{cartItems}}>
            {children}
        </CartContext.Provider>
        </>
    )
}

export default CartContextProvider 