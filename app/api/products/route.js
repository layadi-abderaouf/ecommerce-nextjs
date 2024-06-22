import { DBconnect } from '../../lib/mongoose'
import product from '../../models/product'
import { NextResponse } from "next/server";
import { isAdmin } from '../auth/[...nextauth]/route';

export  async function  POST(request){
   await DBconnect()
   //await isAdmin()
   const {method} = request;
   if(method == "POST"){
      const {name,description,price,category,properties} = await request.json()
      
      
      const productAdded = await product.create({name,description,price,category,properties})
     
      return NextResponse.json({productAdded });
   }
   
}
export  async function  GET(request){
   await DBconnect()
   
   const id = request.nextUrl.searchParams.get('id'); 
   const is_latest = request.nextUrl.searchParams.get('latest'); 
   
   if(id){
    
      return NextResponse.json( await product.findById(id).populate("category")); 
   }
   else if(is_latest){
      return NextResponse.json( await product.find().sort([['updatedAt', -1]]).limit(8));
   }
   const search = request.nextUrl.searchParams.get('search') || ''; 
   const orderby = request.nextUrl.searchParams.get('orderby') || 1; 
   const regex = new RegExp(search, 'i');
   let orderby_query = ['updatedAt', -1]
   switch (orderby) {
      case "1":
         orderby_query = ['updatedAt', -1]
         break;
      case "2":
         orderby_query = ['updatedAt', 1]
         break;
      case "3":
         orderby_query = ['price', -1]
         break;
      case "4":
         orderby_query = ['price', 1]
         break;
     
   }
   return NextResponse.json( await product.find({name:regex}).sort([orderby_query]).populate("category"));  
}
export  async function  DELETE(request){
   await DBconnect()
  // await isAdmin()
   const id = request.nextUrl.searchParams.get('id'); 
   await product.findByIdAndDelete(id);
   return NextResponse.json( {data : "product deleted"});  
}
export  async function  PATCH(request){
   await DBconnect()
   //await isAdmin()
   const {id,name,images,description,price,category,properties} = await request.json()
    await product.findByIdAndUpdate(id,{name,images,category,description,price,properties});
   return NextResponse.json( {data : "product updted"});  
}