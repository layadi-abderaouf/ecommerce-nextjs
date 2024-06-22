"use client"
import Navbar from '@/app/components/Navbar'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React,{useState,useEffect,useContext} from 'react'
import { Grid, GridItem ,Button} from '@chakra-ui/react'
import ImagesSlider from '@/app/components/ImagesSlider'
import { CartContext } from '@/app/components/CartContext'


function ProductPage() {
  const {cartproducts,setcartproducts} = useContext(CartContext)
  const {id} = useParams()
  const [product, setproduct] = useState({})
  useEffect(() => {
     
      axios.get('/api/products?id='+id).then(response=>{
       setproduct(response.data);
       
      })
     }, [])
  function add_to_cart(){
    setcartproducts([...cartproducts,product])
    console.log(cartproducts);
  }
  return (
    <div className='bg-gray-100' >
      <Navbar></Navbar>
      <div className='pt-16 pb-12'></div>
      <Grid className='p-4' templateColumns={{md:"1fr 1fr",sm:"2fr"}} gap={6}>
       <GridItem  className='bg-white'  >

         <ImagesSlider images={product?.images} ></ImagesSlider>
       </GridItem>
       <GridItem >
         <h1 className='font-bold text-5xl mt-1 mb-6' >{product?.name}</h1>
         <div className='flex flex-wrap' >
         {product?.properties?.map(p=>(
          <div key={p._id} className='p-2 px-3 m-2 rounded-full bg-yellow-600 ' >
            {p?.name} : {p?.values}
          </div>
         
         ))}
         </div>
         <h3 className='text-gray-400 text-xl' >{product?.description}</h3>
         <div className='flex justify-between p-2 pr-12 mt-6' >
          <h1 className='font-bold text-2xl' >{product?.price}$</h1>
          <Button onClick={add_to_cart} padding={4} background={"yellow.700"} colorScheme={"white"}  >
            Add to Cart
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

            </Button>
         </div>
       </GridItem>
      
      </Grid>
     
    </div>
  )
}

export default ProductPage