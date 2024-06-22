"use client"
import Link from "next/link"
import Layout from "../../components/Layout"
import { useEffect,useState } from "react"
import axios from "axios"


export default  function Products() {

  const [products, setproducts] = useState([])
  useEffect(() => {
   axios.get('/api/products').then(response=>{
    setproducts(response.data);
    
   })
  }, [])
  

  return (
   <Layout>
    <Link className="  bg-green-600 text-white p-4 rounded-lg" href={'/admin/products/new'} >Add New Product</Link>
    <table className="mt-7 basic " >
      <thead>
        <tr>
          <td> name</td>
          <td>price</td>
          <td>category</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {products.map(p=>(
          <tr>
            <td>{p.name}</td>
            <td>{p.price} $</td>
            <td>{p.category ? p?.category.name : "/"} </td>
            <td>
              <Link
               className="bg-green-500 p-1 rounded-lg  flex " 
               href={'/admin/products/edit/'+p._id} >edit
               </Link>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
   </Layout>
  )
}