"use client"
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React,{useContext} from 'react'
import { CartContext } from './CartContext'


function ProductCard({product}) {
  const {cartproducts,setcartproducts}=useContext(CartContext);

  function add_to_cart(){
    setcartproducts([...cartproducts,product])
    console.log(cartproducts);
  }
  return (
    <div className='p-4 rounded-lg  bg-white'>

      <center  >
        <Link href={"/product/"+product?._id}>
        <img style={{maxHeight:175}} className='rounded-lg' src={"/product/"+product.images[0]} alt="" />
        </Link>
       
        
          <Link href={"/product/"+product?._id}>
            <h1 className='text-2xl mt-1 mb-2 font-bold' >{product.name}</h1>
          </Link>
        

        <div className='flex justify-between' >
          <h1 className='text-lg my-auto' >{product?.price}$</h1>
        <Button onClick={add_to_cart} size={2} padding={4}  marginTop={1} colorScheme={"white"} background={"#6224DF"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>

        </Button>
        </div>
        
        </center>
        
       
       

       
        
        
    </div>
  )
}

export default ProductCard