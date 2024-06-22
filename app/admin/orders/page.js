"use client"
import Layout from '@/app/components/Layout'
import { Button,useToast } from '@chakra-ui/react'
import axios from 'axios'
import React,{useState,useEffect} from 'react'


function Orders() {
    const toast = useToast()
    const [orders, setorders] = useState([])
    useEffect(() => {
     axios.get('/api/orders').then(response=>{
      setorders(response.data);
      
     })
    }, [])
    async function deleteorder(id){
        try {
            await axios.delete('/api/orders/?id='+id).then(()=>{
              setorders((orders) =>
              orders.filter((o) => o._id !== id))
              toast({
                title: 'order created.',
                position:'bottom',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
              
            })
            
          } catch (error) {
            console.log(error)
          }
    }
  return (
    <Layout>
        <table className="mt-7 basic " >
      <thead>
        <tr>
          <td>customer </td>
          <td>total price</td>
          
          <td>date</td>
          <td  >products</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {orders.map(p=>(
          <tr>
            <td>
                <div className='py-2 ' >
                    <h2>{p.name}</h2>
                    <h2>{p.email}</h2>
                    <h2>{p.country} / {p.city} </h2>
                    <h2>{p.address}</h2>
                </div>
            </td>
            <td>{p.total_price} $</td>
           
            <td>
             {p.createdAt.substring(0,10)}
            </td>
            <td>
                {p.line_items?.map(l=>(
                    <div className='flex py-4 px-0 mx-0 '>
                        <h1 className='font-bold' >{l.price_data.product_data.name} : </h1>
                        <h2>{l.quantity} x {l.price_data.unit_amount /100}$ </h2>
                    </div>
                ))}
            </td>
            <td>
               <Button background={'red'} colorScheme={'white'} onClick={()=>deleteorder(p._id)}>X</Button>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
    </Layout>
  )
}

export default Orders