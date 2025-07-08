const Blog = require("../models/blogsModel")
const dotenv = require("dotenv")
const fs = require('fs')


dotenv.config({ path: "./.env" })


exports.createBlog = async (req, res, next) => {
    const { title, summary, minread, content} = req.body
    const now = new Date();
    const dateString = now.toDateString().split(' ').slice(1).join(' ');
    
    


    if (req.file){
    const { originalname, path } = req.file;
    // fs.renameSync(path,`images/${originalname}`)// yo nagaram hola yedi yeutai name gare ko image upload garyo vanae ta paila ko gayo
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newpath = path + '.' + ext
    fs.renameSync(path, newpath);

    //now lets prepare our data


    const blog = await Blog.create({
        title,
        summary,
        minread,
        image: newpath,
        content,
        date:dateString

    })

    res.status(200).json('okay')
    }
    else{
        const blog = await Blog.create({
        title,
        summary,
        minread,
        content:content,
        date:dateString

    })
    res.status(200).json('okay')

    }


}



exports.getAllBlogs = async (req, res) => {
    

    const blog = await Blog.find()
    

    res.status(200).json({ blog })
}

exports.getSingleBlog = async (req, res) => {
    



    let blog = await Blog.findOne({ "_id": req.params.id })

    res.status(200).json({ blog })
}


exports.updateBlog = async (req, res) => {

    let id = req.params.id
    let blog = await Blog.findOne({ "_id": id })
    if (!blog) {
        res.status(500).json({
            message: "your post is not found"
        })
    }

    const { title, summary, link, content, techstack } = req.body
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newpath = path + '.' + ext
        fs.renameSync(path, newpath);
        let updated_document = await Blog.findByIdAndUpdate(req.params.id, {
            title,
            summary,
            techstack,
            link,
            image: newpath,
            content

        }, { new: true })
        await updated_document.save();
        res.status(200).json({
            message: "updated sucessfully"
        })
    }
    else {

        let updated_document = await Blog.findByIdAndUpdate(req.params.id, {
            title,
            summary,
            techstack,
            link,
            content

        }, { new: true })
        await updated_document.save();
        res.status(200).json({
            message: "updated sucessfully"
        })
    }





}

exports.deleteBlog = async (req, res) => {
    let blog = await Blog.findById(req.params.id)

    if (!blog) {
        res.status(500).json({
            message: "your post is not found"
        })
    }
    if (blog.image){
    let filename = blog.image;
    try {

        await fs.promises.unlink(filename);
        console.log("File deleted successfully");
    } catch (err) {
        console.error("Error deleting file:", err);
    }
}
    let deleteddocument = await Blog.findByIdAndDelete(req.params.id);




    res.status(200).json({
        message: "deleted sucessfully"
    })
}





