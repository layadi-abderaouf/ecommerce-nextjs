import { NextResponse } from "next/server";
import { DBconnect } from '../../lib/mongoose'
import {Order} from '../../models/order'
const stripe = require('stripe')(process.env.STRIPE_SK);



export async function POST(request){
    await DBconnect()
    const {
        name,email,address,city,quantitys
        ,postalcode,country,cartproducts,total_price
    } = await request.json();
    let line_items = []
    for (let index = 0; index < cartproducts?.length; index++) {
        line_items.push({
            quantity:quantitys[index],
            price_data:{
                currency:'USD',
                product_data:{name:cartproducts[index].name},
                unit_amount:100  * cartproducts[index].price
            }
        })
        
    }
    try {
        const order = await Order.create({
            line_items,name,address,country,email
            ,city,postalcode,total_price,paid:false})

        const seasion = await stripe?.checkout.sessions.create({
            line_items,
            mode:'payment',
            customer_email:email,
            success_url:process.env.NEXTAUTH_URL + '/cart?success=1',
            cancel_url:process.env.NEXTAUTH_URL + '/cart?cancel=1',
            metadata:{orderID:order._id.toString()}

        })
        return NextResponse.json({url:seasion.url});

    } catch (error) {
        return NextResponse.json({error:error.message});
    }

    

}