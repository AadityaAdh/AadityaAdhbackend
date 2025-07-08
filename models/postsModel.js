const mongoose=require('mongoose')

const postsSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please give title"]
        
    },
    summary:{
        type:String,
        required:[true,"Summary required"],
        
        
    },
    techstack:{
        type:String,
        
    },
    link:{
        type:String,
    
        
        
    },
    image:{
        type:String,
    
        
        
    },
    content:{
        type:String,
        required:[true,"Content required"],
        
        
    },
    
    
    
    

})

module.exports=mongoose.model("Post",postsSchema)