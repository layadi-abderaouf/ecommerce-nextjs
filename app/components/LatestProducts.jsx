"use client"
import React,{useState,useEffect} from 'react'
import { SimpleGrid,Box } from '@chakra-ui/react'
import axios from 'axios'
import ProductCard from './ProductCard'


function LatestProducts() {
    const [products, setproducts] = useState([])
    useEffect(() => {
       
        axios.get('/api/products?latest=true').then(response=>{
         setproducts(response.data);
         
        })
        console.log(products);
       }, [])
  return (
    <div className='p-8 bg-gray-200'>
        <h1 className='text-5xl font-lato my-4 mb-8' >Latest products</h1>
        <SimpleGrid columns={{sm:2,md:3,lg:4}} spacing={10}>
            {products?.length >0 && products?.map(p=>(
                <ProductCard product={p}></ProductCard>
            ))}
          
        </SimpleGrid>
    </div>
  )
}

export default LatestProducts