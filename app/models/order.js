import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
  line_items:[{type:Object}],
  name:String,
  email:String,
  city:String,
  postalcode:String,
  address:String,
  country:String,
  total_price:Number,
  paid:Boolean,
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);