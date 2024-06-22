"use client"
//components
import Layout from '../../../../components/Layout.jsx'
import axios from "axios"
import { redirect, useParams } from "next/navigation"
import { useEffect,useState } from "react"
import { ReactSortable } from 'react-sortablejs'




export default function editProduct() {
  const {id} = useParams()
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [category_id, setcategory_id] = useState()
  const [category, setcategory] = useState()
  const [categories, setcategories] = useState([])
  const [product, setproduct] = useState([])
  const [goProducts, setgoProducts] = useState(false)
  const [imgd, setimgd] = useState(false)
  const [refresh, setrefresh] = useState(false)
  const [file, setFile] = useState()
  const [images, setimages] = useState([])
  const [properties, setproperties] = useState([])
  useEffect(() => {
   
    axios.get('/api/products?id='+id).then(r=>{
      setproduct(r.data)
      setname(r.data.name)
      setdescription(r.data.description)
      setprice(r.data.price)
      setimages(r.data?.images)
      setcategory_id(r.data?.category?._id)
      setcategory(r.data?.category);
      setproperties(r.data.properties || [])
    })
    
    
  }, [id,refresh])
  useEffect(() => {
    
    uploadImages()
    
  }, [file])
  useEffect(() => {
    getcategories()  
  }, [])
  
   //functions
   async function edit_product(){
    const data = {id,name,images,description,price,properties,category:category_id}
    await axios.patch('/api/products',data).then(()=>{
       setrefresh(!refresh)
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
   async function delete_product(){
    try {
     await axios.delete('/api/products?id='+id).then(()=>{
      setgoProducts(true)
    })
    } catch (error) {
     console.log(error.message)
    }
   
   }
   if(goProducts){
    redirect('/admin/products')
  }
  async function uploadImages(){
    
   // e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Work with the JSON data here
        setimages([...images,data.path])
        
      })
     
     
      
      
    } catch (err) {
      // Handle errors here
      console.error(err)
    }
    
    
  }
  function images_order(images){
     setimages(images)
  }
  async function delete_image(img){
    try {
      await axios.post('/api/upload/delete',{img}).then(()=>{
        setimages((images) =>
        images.filter((i) => i !== img)
      );
      })
      
      
    } catch (err) {
      // Handle errors here
      console.error(err)
    }
  }
  function propertiesHnadler(name,value){
    const is_exist = properties.find((p)=>p.name === name);
    if(is_exist){
      
      const updatedproperties = properties.map(p => {
        if (p.name === name) {
          return { ...p, values: value };
        }
        return p; 
      });
  
      setproperties(updatedproperties)
    }else{
      setproperties([...properties,{name:name,values:value}])
    }
  }
 
 
  return (
   <Layout>
  
        <h1 className='text-center mb-5' >Edit Product  </h1> 
         <input value={name}
          onChange={ev =>setname(ev.target.value)} type="text" placeholder={product.name} />

          <label>Images</label>
          <div className='flex flex-wrap m-4' >
            <ReactSortable list={images} setList={images_order} className='flex flex-wrap' >
            {images?.map(i=>(
              <div key={i}  className='border-lg h-24 m-1  ' >
                {imgd == true ?(
                   <button onClick={()=>delete_image(i)} className='broder bg-red-700 text-bold rounded-lg text-white p-1' >X</button>
                ):(<></>)}
                
                <img onClick={()=>setimgd(!imgd)} className='rounded-lg' src={'/product/'+i}  alt="" />
              </div> 
            ))}
            
            </ReactSortable>
         
          <div className="ml-4 mb-5 mt-1" >
              <label className="bg-gray-200 rounded-lg border h-24 w-24 flex items-center p-1" >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  Upload
                  <input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0])} className="hidden" />
              </label>
          </div>
          
          
               
          </div>
        
         
         
        
         

         <textarea value={description} onChange={ev =>setdescription(ev.target.value)} placeholder={product.description}></textarea>
         <label >category : </label>
         <select onChange={ev=>setcategory_id(ev.target.value)} value={category_id} className=' mb-3 mt-1' >
          {categories?.map((c)=>(
             <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <label  >properties : </label>
        
        <div>
           {category?.properties.map((p,i)=>(
            <div className='flex gap-1' >
              <p className='mt-2 mr-2' > {p.name} </p>
              <select defaultValue={properties?.length > 0 && properties[i]?.values} onChange={(ev)=>propertiesHnadler(p.name,ev.target.value)}   className=' mb-3 w-1/4 mt-1' >
              <option key={p.name} value="">null</option>
                {p.values?.map((pv)=>(
                   <option key={pv} value={pv}>{pv}</option>
                ))}
              </select>
            </div>
          ))}
          {categories.filter((c)=>c.parent?._id == category?.parent)[0]?.parent?.properties.map((p,i)=>(
            <div className='flex gap-1' >
              <p className='mt-2 mr-2' > {p.name} </p>
              <select  defaultValue={properties?.length > 0 && properties[i+category?.properties.length]?.values}  onChange={(ev)=>propertiesHnadler(p.name,ev.target.value)}  className=' mb-3 w-1/4 mt-1' >
              <option key={p.name} value="">null</option>
                {p.values?.map((pv)=>(
                   <option key={pv} value={pv}>{pv}</option>
                ))}
                
              </select>
            </div>
          ))}
        </div>
        
        <label >Price :</label>
         <input onChange={ev =>setprice(ev.target.value)} value={price} type="number"  placeholder={product.price} />
         <button onClick={()=>edit_product()} type='submit' className='btn' >Save</button>
         <button onClick={()=>delete_product()}  className='p-3 bg-red-600 rounded-lg text-white  ml-5' >Delete</button>
   </Layout>
  )
}
