const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
     username:{
        type:String
     },
     email:{
         type:String,
         required:[true,'Enter a email']
     },
     mobile:{
        type:Number,
        required:true
     },
     password:{
        type:String
     }
},{
    timestamps:true
});

module.exports=mongoose.model("User",userSchema);
