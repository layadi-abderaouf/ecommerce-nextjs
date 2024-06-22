import { DBconnect } from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { headers } from "next/headers";
import {buffer} from 'micro'; 
import { Order } from "@/app/models/order";

export async function POST(request){
 
    await DBconnect();
   

  let event;
  const endpointSecret = "whsec_3d691af875b78f6158fdfdabdf0d08a3d108860aa3d7cb39eeb2f281e0404d3d";

  try {
    const body = await request.text();
    const sig = headers().get("Stripe-Signature") ?? "";
   
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
   
    return NextResponse.json({error:err.message});
    
  }
 

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderid= data.metadata.orderID;
      if(orderid && data.payment_status == 'paid'){
        await Order.findByIdAndUpdate(orderid,{paid:true});
        return NextResponse.json({success:"yes"});
      }
      break;
   
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({success:"no"});
}
//id acct_1ONdBfJSgJkn82Pw
export const config = {
    api:{bodyParser:false}
}
