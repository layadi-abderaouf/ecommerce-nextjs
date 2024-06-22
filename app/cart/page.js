"use client"
import React,{useContext,useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import { Grid, GridItem,Button } from '@chakra-ui/react'
import { CartContext } from '../components/CartContext';
import axios from 'axios';


function Cart() {

    const {cartproducts,setcartproducts}=useContext(CartContext);
    const [total_price, settotal_price] = useState(0)
    const [quantitys, setquantitys] = useState([])
    //order state
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [address, setaddress] = useState('')
    const [country, setcountry] = useState('')
    const [city, setcity] = useState('')
    const [postalcode, setpostalcode] = useState('')

    useEffect(() => {
      setquantitys(new Array(cartproducts.length).fill(1));
    }, [])
    

    useEffect(() => {
    
      var total = 0;
      cartproducts?.map((p,i)=>{
        total += p?.price * quantitys[i];
      })
      settotal_price(total)
    
    }, [quantitys])
    

    //functions
    async function checkout(){
      const response = await axios.post('/api/checkout',
        {name,address,city,postalcode,email
         ,quantitys,cartproducts,country,total_price});
      if(response.data.url){
        window.location = response.data.url
      }
    }
    function delete_product(index){ 
      const newArray = [...cartproducts];
      newArray.splice(index, 1);
      setcartproducts(newArray);
      const newArray2 = [...quantitys];
      newArray2.splice(index, 1);
      setquantitys(newArray2);
      
    }
    function add_quantity(index,new_quantity) {
     
      if(new_quantity <= 0){
        new_quantity =0;
      }
      const nextquantity = quantitys.map((q, i) => {
        if (i === index) {
          return parseInt(new_quantity);
        } else {
          
          return q;
        }
      });
      setquantitys(nextquantity);
     
    }

    if(window.location.href.includes("success")){
      setcartproducts([])
      return(
       
        <center  > 
            <div className=' p-12 w-1/2 rounded-lg mt-12 bg-green-500' >
              <h1 className='text-white text-3xl font-bold'>thanks for your order!</h1>
              <p className='text-xl font-lato text-white' >your payment is success,you will get an email after a few minutes</p>
            </div>
        </center>
       
        
      )
    }
  return (
    <div className='bg-gray-200 pb-32'>
        <Navbar ></Navbar>
        <center>
        <h1 className='pt-20 pb-4 text-5xl font-bold font-lato'>Cart</h1>
        </center>
       
        <Grid className='p-4 pl-8' templateColumns={{sm:'2fr',md:"1.3fr 0.7fr"}}gap={6}>
          <GridItem rounded={"lg"} padding={30} bg='white' >
            {cartproducts?.length > 0 ?
             (<div>
                <table  className="mt-7 bg-gray-200 basic" >
                  <thead>
                    <tr>
                      <td></td>
                      <td>product name</td>
                      <td>price</td>
                      <td>quantity</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {cartproducts.map((p,i)=>(
                      <tr key={i}>
                        <td>
                            <img style={{maxHeight:125}} className=' md:w-60 sm:w-full rounded-lg' src={'/product/'+p?.images[0]} alt="" />
                        </td>
                        <td>{p?.name}</td>
                        <td>{p?.price} $</td>
                       
                       <td>
                        <center>
                        <input className=' md:w-12 sm:w-full ' value={quantitys[i]} onChange={(ev)=>add_quantity(i,ev.target.value)} type='number' />
                        </center>
                       </td>
                       <td>
                        <Button onClick={()=>delete_product(i)} background={"red"} colorScheme='white' >x</Button>
                       </td>
            
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='p-4 bg-gray-200 mt-5 w-full rounded-lg flex justify-between'>
                  <h1 className='text-2xl font-bold' >total price :</h1>
                  <h1 className='text-2xl font-bold'>{total_price}$</h1>
                </div>
             </div>)
             :(<h1>Your Cart is empty</h1>)}
          </GridItem>
          {cartproducts?.length > 0?(
             <GridItem rounded={"lg"} padding={30} bg='gray.200' >
             

             
             <h1 className='py-4  font-lato text-3xl' >Order Information</h1>
             <input name="name"  value={name} onChange={ev =>setname(ev.target.value)} type="text" placeholder='Name' />
             <input  name="email" value={email} onChange={ev =>setemail(ev.target.value)} type="text" placeholder='Email' />
             <input  name="address" value={address} onChange={ev =>setaddress(ev.target.value)} type="text" placeholder='Address' />
             <div className='flex ' >
             <input  name="city" value={city} onChange={ev =>setcity(ev.target.value)} className='mr-1' type="text" placeholder='City' />
             <input name="postalcode"  value={postalcode} onChange={ev =>setpostalcode(ev.target.value)} type="text" placeholder='postal code' />
             </div>
             <input  name="products" value={cartproducts}  type="hidden"  />
             <input  name="quantitys" value={quantitys}  type="hidden"  />
             <input  name="total_price" value={total_price}  type="hidden"  />
             <input  name="country" value={country} onChange={ev =>setcountry(ev.target.value)} type="text" placeholder='country' />
             <Button onClick={checkout} colorScheme={"white"} background={"yellow.700"}>Continue Payment</Button>
             
            </GridItem>
          ):(<div></div>)}
         
         
        </Grid>
    </div>
  )
}

export default Cart