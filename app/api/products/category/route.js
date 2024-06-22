import { DBconnect } from '../../../lib/mongoose'
import category from '../../../models/category';
import Category from '../../../models/category'
import { NextResponse } from "next/server";
import { isAdmin } from '../../auth/[...nextauth]/route';


export  async function  POST(request){
   await DBconnect()
  // await isAdmin()
    const {name,parent,properties} = await request.json()

    try {
      const categoryAdded = await Category.create({name,parent,properties})
      return NextResponse.json({categoryAdded });
    } catch (error) {
        return NextResponse.json({"message":error.message});
    }  
}
export  async function  GET(request){
    try {
        await DBconnect()
        
       
        
        const id = request.nextUrl.searchParams.get('id'); 
        if(id){
            return NextResponse.json( await Category.findById(id).populate('parent'));  
        }else{
            return NextResponse.json( await Category.find().populate('parent'));  
        }
       
    } catch (error) {
        return NextResponse.json({"error":error.message});  
    }
}
export  async function  DELETE(request){
    await DBconnect()
    //await isAdmin()
    const id = request.nextUrl.searchParams.get('id'); 
    try {
        await Category.findByIdAndDelete(id)
        return NextResponse.json( {data : "product deleted"});  
    } catch (error) {
        return NextResponse.json( {data : "error"});  
    } 
   
}
export  async function  PATCH(request){
    await DBconnect()
    //await isAdmin()
    const {id,name,parent,properties} = await request.json()
     await Category.findByIdAndUpdate(id,{name,parent,properties});
    return NextResponse.json( {data : "category updted"});  
 }