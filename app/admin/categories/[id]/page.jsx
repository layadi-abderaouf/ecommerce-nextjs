"use client"
//components
import Layout from '../../../components/Layout'
import axios from "axios"
import { redirect, useParams } from "next/navigation"
import { useEffect,useState } from "react"
import { ReactSortable } from 'react-sortablejs'




export default function editCategory() {
  const {id} = useParams()
  const [name, setname] = useState("")
  const [parent, setparent] = useState({})
  const [propertyname, setpropertyname] = useState("")
  const [propertyvalue, setproperyvalue] = useState('')
  const [category, setcategory] = useState([])
  const [categories, setcategories] = useState([])
  const [properties, setproperties] = useState([])
  const [refresh, setrefresh] = useState(false)
  useEffect(() => {
   
    axios.get('/api/products/category').then(r=>{
      setcategories(r.data);  
    })
    axios.get('/api/products/category?id='+id).then(r=>{
        setcategory(r.data);  
        setname(r.data.name)
        setparent(r.data?.parent)
        setproperties(r.data.properties)
      })
    
    
  }, [id,refresh])
 
  
  
   //functions
   async function edit_product(){
    const data = {id,name,parent,properties}
    await axios.patch('/api/products/category',data).then(()=>{
       setrefresh(!refresh)
    })
   }
   function addproperty(){
    const values = propertyvalue.split(',')
    if(propertyname && propertyvalue){
      setproperties([...properties,{name:propertyname,values:values}])
    }
     
  }
  function deleteproperty(name){
    if( !name) return;
    setproperties((properties) =>
        properties.filter((p) => p?.name !== name))

  }
  
  return (
   <Layout>
  
        <h1 className='text-center text-2xl mb-5' >Edit category  </h1> 
         <label>name</label>
         <input className='mb-5' value={name}
          onChange={ev =>setname(ev.target.value)} type="text" placeholder={name} />
          <label>parent category</label>
         <select  onChange={ev=>setparent(ev.target.value)}  value={parent?._id} className='mb-5 ml-1 ' >
          <option value="">no parent category</option>
          {categories?.map((c)=>(
             <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <div className='mb-3 flex flex-wrap' >
          <label className='item-center mt-3' >properties : </label>
          {properties?.map(p=>(<>
            
            <h3 className='p-2 m-1 rounded-full bg-gray-300' >
            <button onClick={()=>deleteproperty(p?.name)} className='bg-red-400 rounded-full  py-0 px-2 mr-1' >x</button>
              {p?.name} : {p?.values?.map(v=>(<>{v} ,</>))}</h3>
            </>))}
        </div>
        <div className='flex mb-3'>
        <input  value={propertyname} onChange={ev=>setpropertyname(ev.target.value)} className='w-1/3 mb-0' type="text" placeholder='name ,example : color' />
        <input value={propertyvalue} onChange={ev=>setproperyvalue(ev.target.value)} className='w-1/3 ml-3 mb-0' type="text" placeholder='values (Separate by "," ) , example : red,green ' />
        <button onClick={addproperty} className='ml-2  px-3 text-white bg-yellow-700 rounded-lg' >add New Property</button>
        </div>
        
         <button onClick={()=>edit_product()} type='submit' className='btn p-6' >Save</button>
   </Layout>
  )
}
