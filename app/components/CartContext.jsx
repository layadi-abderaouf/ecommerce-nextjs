
const { createContext ,useState,useEffect} = require("react");

export const CartContext = createContext({})

export function CartContextProvider({children}){
    const [cartproducts, setcartproducts] = useState(JSON.parse(localStorage?.getItem('cart')) || [])
    useEffect(() => {
      localStorage?.setItem('cart',JSON.stringify(cartproducts))
    }, [cartproducts])
    
    return(
        <CartContext.Provider value={{cartproducts,setcartproducts}} >{children}</CartContext.Provider>
    )
}