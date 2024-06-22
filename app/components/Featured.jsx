"use client"

import React, { useEffect,useState ,useContext} from 'react'
import {  SimpleGrid, GridItem ,Button} from '@chakra-ui/react'
import axios from 'axios'
import Link from 'next/link'
import { CartContext } from './CartContext'




export default function Featured() {
  const [product, setproduct] = useState({})
  const {cartproducts,setcartproducts}=useContext(CartContext);
  
  useEffect(() => {
    const featuredProductId = '65748529db1cafe480232dd9';
    axios.get('/api/products?id='+featuredProductId).then(response=>{
     setproduct(response.data);
     
    })
    
   }, [])

   function add_to_cart(){
     setcartproducts([...cartproducts,product])
     console.log(cartproducts);
   }
  
  return (
    <div className='bg-yellow-600 py-20 pt-40  px-10'>
     
      < SimpleGrid columns={{sm:1,md:2}} spacing={10}>
         <GridItem   >
           <h1 className='text-5xl text-white mb-4 font-lato'>{product?.name}</h1>
           <p className='text-gray-300 text-lg'>{product?.description}</p>
            <Button onClick={add_to_cart} size={5} padding={4} marginRight={3} marginTop={2} colorScheme={"white"} background={"#6224DF"}>Add To Cart ({product?.price}$)</Button>
            <Button size={5} padding={4} marginTop={2} colorScheme={"white"} background={"#6224DF"}>
              
              <Link href="/admin">Read More</Link>
              </Button>
          </GridItem>
          <GridItem   >
             <img className='rounded-lg w-full' src={product && product.images && product.images.length > 0 ?"/product/"+product?.images[0] : "/product/1.png"} alt="" />
          </GridItem>
 
        </ SimpleGrid>
       
        
    </div>
  )
}


