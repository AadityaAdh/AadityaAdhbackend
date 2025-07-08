const mongoose=require('mongoose')

const blogsSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please give title"]
        
    },
    summary:{
        type:String,
        required:[true,"Summary required"],
        
        
    },
    minread:{
        type:String,
        required:[true,"Min read required"]
    
        
        
    },
    image:{
        type:String,
    
        
        
    },
    content:{
        type:String,
        required:[true,"Content required"],
        
        
    },
    date:{
        type:String,
        required:[true,"Date required in blog"]
    }
    
    
    
    
    

})

module.exports=mongoose.model("Blog",blogsSchema)