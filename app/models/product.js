const { default: mongoose } = require("mongoose");


const productSchema =  mongoose.Schema({
    name:{type:String,required:true},
    description:String,
    category:{type:mongoose.Types.ObjectId,ref:"Category"},
    price:{type:Number,required:true},
    images : {
        type:[String],
        default:["1.png"]
    },
    properties: {type:Object},
},{
    timestamps:true
})
 
module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);