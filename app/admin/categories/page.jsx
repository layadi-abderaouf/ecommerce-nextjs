"use client"
import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import Link from 'next/link'


function Categories() {
  const [name, setname] = useState("")
  const [parent, setparent] = useState('')
  const [propertyname, setpropertyname] = useState("")
  const [propertyvalue, setproperyvalue] = useState('')
  const [categories, setcategories] = useState([])
  const [properties, setproperties] = useState([])
  const [changec, setchangec] = useState(false)
  useEffect(() => {
    
  getcategories();
    
  }, [changec])
  
  //functions
  async function addcategory(){
    if(!name) return;
    console.log(properties);
    var data = {};
    if(parent == 0){
       data ={name,properties}
    }else{
       data ={name,parent,properties}
    }
    console.log(data);
    try {
      await axios.post('/api/products/category',data).then(()=>{
        setchangec(!changec)
        setname("")
        setproperties([])
        setpropertyname("")
        setproperyvalue("")
      })
    } catch (error) {
      
    }
  }
  async function getcategories(){
    try {
      await axios.get('/api/products/category').then((response)=>{
        setcategories(response.data)
      })
    } catch (error) {
      
    }
  }
  async function deletecategory(id,name){
    console.log(id)
    try {
      await axios.delete('/api/products/category?id='+id).then(()=>{
        setcategories((categories) =>
        categories.filter((c) => c !== name))
        setchangec(!changec)
      })
      
    } catch (error) {
      console.log(error)
    }
  }
  function addproperty(){
    const values = propertyvalue.split(',')
    if(propertyname !== "" && propertyvalue !== ""){

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
        
        <label className='text-bold' >Add New category</label>
        <div className='flex mt-3' >
        <input value={name} onChange={ev=>setname(ev.target.value)} className='' type="text" placeholder='name' />
        <select onChange={ev=>setparent(ev.target.value)} value={parent} className=' ml-1' >
          <option value="0">no parent category</option>
          {categories?.length >0 && categories?.map((c)=>(
             <option value={c._id}>{c.name}</option>
          ))}
        </select>
        </div>
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
        <button onClick={addproperty} className='ml-2  px-3 text-white bg-green-600 rounded-lg' >add New Property</button>
        </div>
        <button onClick={addcategory} className=' bg-yellow-700 px-4 py-2 text-white rounded-lg' >save</button>
        
    
    <center>
      <h1 className='p-4 bold text-2xl mt-5' >Categories List</h1>
    </center>
    <table className="mt-7 basic" >
      <thead>
        <tr>
          <td>name </td>
          <td>parent category </td>
          <td></td>
          
        </tr>
      </thead>
      <tbody>
        {categories?.length >0 && categories?.map(c=>(
          <tr key={c._id}>
            <td className='w-2/4' >{c.name}</td>
            <td className='' >{c.parent || c.parent == ""  ? c.parent.name:"/"}</td>
            <td className='flex' >
              <Link
               className="bg-green-500 text-white p-1 px-3 rounded-lg  " 
               href={'/admin/categories/'+c._id} >edit
               </Link>
              <button onClick={()=>deletecategory(c._id)}
               className="bg-red-500 text-white p-1 rounded-lg ml-4  " 
                >delete
               </button>

              
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
   </Layout>
        
 )
}

export default Categories