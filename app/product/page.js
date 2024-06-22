"use client"
import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import {  SimpleGrid, GridItem ,Button,Grid,Checkbox} from '@chakra-ui/react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,Box
  } from '@chakra-ui/react'
import axios from 'axios'

function Products() {
    const [products, setproducts] = useState([])
    const [filtredproducts, setfiltredproducts] = useState([])
    const [categories, setcategories] = useState([])
    const [orderby, setorderby] = useState(1)
    const [search, setsearch] = useState("")
    const [categories_filter, setcategories_filter] = useState([])
    useEffect(() => {
        axios.get('/api/products/category').then(response=>{
            setcategories(response.data)
            setcategories_filter(new Array(response.data.length).fill(true))
           })
        
    }, [])
   
    useEffect(() => {
        axios.get('/api/products?orderby='+orderby+'&search='+search).then(response=>{
         setproducts(response.data);
        })
       }, [search,orderby])
    useEffect(() => {
     let products_copy = []
     products.forEach((p)=>{
        categories?.map((c,i)=>{
            if(p?.category?._id == c?._id ){
                if(categories_filter[i] == true){
                   
                    products_copy.push(p)
                }
            }
        })
     })
     
     setfiltredproducts(products_copy)
    }, [categories_filter,products])
    
    //functions
    function setCategoryFilter(index,value,isparent,category){

        let catfil_copy = []
        categories_filter.forEach((c,i)=>{
            if(i == index){
                catfil_copy.push(value)
               
            }else{
                catfil_copy.push(c)
            }
        })
        if(isparent){
            categories?.map((cat,i)=>{
                if(cat?.parent?._id == category?._id){
                   catfil_copy[i] = value;
                }
            })
        }
      

        setcategories_filter(catfil_copy);
        
    }
    return (
    <div>
        <Navbar></Navbar>
        <div className='p-16' ></div>
        <center>
          <h1 className='text-3xl font-lato'>All Products</h1>
        </center>
        <Grid className='p-4 pl-8' templateColumns={{sm:'2fr',md:"0.5fr 1.5fr"}}gap={6}>
            <div className='bg-gray-100 p-3 rounded-lg' >
                <h1 className='font-bold text-2xl  mb-2' >Categories</h1>
                <Accordion defaultIndex={[0,1,2,3,4,5]} allowMultiple>
                {categories?.map((c,i)=>(<>
                    {!c?.parent && (
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                           <div className='flex justify-between' >
                           <h1 className='text-lg font-bold' >{c.name}</h1>
                           <Checkbox value={categories_filter[i]} onChange={(ev)=>setCategoryFilter(i,ev.target.checked,true,c)} size={"lg"} colorScheme={"green"} defaultChecked></Checkbox>
                           </div>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <div>
                            {categories?.map((cat,index)=>(
                                <>
                                {cat?.parent?._id == c._id && (<div className='flex justify-between p-1' >
                                  <h1 className="ml-2" > {cat?.name}</h1>
                                   <Checkbox  value={categories_filter[i]} onChange={(ev)=>setCategoryFilter(index,ev.target.checked,false,c)} size={'md'} colorScheme={"green"}  defaultChecked></Checkbox>
                                </div>)}
                                </>
                            ))}
                        </div>
                    </AccordionPanel>
                  </AccordionItem>
                    )}</>))}
                  
                </Accordion>
               
            </div>
            <div >
                <div className='bg-gray-100 rounded-lg p-4 w-full mb-4 flex' >
                    <select onChange={(ev)=>setorderby(ev.target.value)}  style={{maxWidth:200}} className='mr-4 mb-0' >
                        <option value="1" key="">order by date (new - old)</option>
                        <option value="2" key="">order by date (old - new)</option>
                        <option value="3" key="">order by price (high - low)</option>
                        <option value="4" key="">order by price (low - high)</option>
                    </select>
                    <input onChange={(ev)=>setsearch(ev.target.value)} className='mr-1 mb-0' type="text" placeholder='search product' />
                    <Button onClick={()=>setsearch(search)} rounded={"lg"} colorScheme={"white"} background={"yellow.700"} >Search</Button>
                </div>
                <div className='bg-gray-200 rounded-lg p-4 w-full '>
                    <SimpleGrid columns={{sm:2,md:2,lg:3}} spacing={10}>
                       {products?.length >0 && filtredproducts?.map(p=>(
                            <ProductCard product={p}></ProductCard>
                        ))}
                    </SimpleGrid>
                </div>
                
            </div>
        </Grid>

        
    </div>
  )
}

export default Products