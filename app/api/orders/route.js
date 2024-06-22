import { DBconnect } from '../../lib/mongoose'
import {Order} from '../../models/order'
import { NextResponse } from "next/server";


export  async function  GET(request){
    await DBconnect()
    
    const id = request.nextUrl.searchParams.get('id'); 
    if(id){
     
       return NextResponse.json( await Order.findById(id)); 
    }
  
    return NextResponse.json( await Order.find({paid:true}).sort([['updatedAt', -1]]));  
 }

 export  async function  DELETE(request){
    await DBconnect()
   // await isAdmin()
    const id = request.nextUrl.searchParams.get('id'); 
    await Order.findByIdAndDelete(id);
    return NextResponse.json( {data : "order deleted"});  
 }