const { default: mongoose } = require("mongoose");


const categorySchema =  mongoose.Schema({
    name:{type:String,required:true},
    parent:{type:mongoose.Types.ObjectId,ref:"Category"},
    properties: [{type:Object}]
})
 
module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);