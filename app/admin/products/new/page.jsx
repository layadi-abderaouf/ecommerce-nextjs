"use client"
import Layout from '../../../components/Layout'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { useState,useEffect } from 'react'


export default function New() {
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [category, setcategory] = useState()
  const [categories, setcategories] = useState([])
  const [goProducts, setgoProducts] = useState(false)
  const [properties, setproperties] = useState([])
  useEffect(() => {
    getcategories()  
  }, [])
  
  //functions
  async function create_product(){
    //ev.preventDefault();
    const data = {name,description,price,category,properties}
    await axios.post('/api/products',data).then(()=>{
       setgoProducts(true)
    })
  }
  async function getcategories(){
    try {
      await axios.get('/api/products/category').then((response)=>{
        setcategories(response.data)
      })
    } catch (error) {
      
    }
  }
  if(goProducts){
    redirect('/admin/products')
  }
  return (
    <Layout>
     
         <h1 className='text-center mb-5' >Add New Product </h1> 
         <input value={name}
          onChange={ev =>setname(ev.target.value)} type="text" placeholder='product name' />
         <textarea value={description} onChange={ev =>setdescription(ev.target.value)} placeholder='description'></textarea>
         <label >category : </label>
         <select onChange={ev=>setcategory(ev.target.value)} value={category} className=' mb-3 mt-1' >
          {categories?.map((c)=>(
             <option value={c._id}>{c.name}</option>
          ))}
        </select>
         <input onChange={ev =>setprice(ev.target.value)} value={price} type="number"  placeholder='price' />
         <button onClick={()=>create_product()} type='submit' className='btn' >Save</button>
    
      
    </Layout>
  )
}
