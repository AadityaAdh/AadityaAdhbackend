const mongoose=require('mongoose')

const adminSchema= new mongoose.Schema({
    uniqueid:{
        type:String,
        required:[true,"please give unique id"]
        
    },
    password:{
        type:String,
        required:[true,"Password required"],
        
        
    }
    
    
    
    
    

})

module.exports=mongoose.model("Admin",adminSchema)
