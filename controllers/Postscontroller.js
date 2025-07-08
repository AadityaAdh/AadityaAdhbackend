const Post = require("../models/postsModel")
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const fs = require('fs')


dotenv.config({ path: "./.env" })


exports.createPost = async (req, res, next) => {
    const { originalname, path } = req.file;
    // fs.renameSync(path,`images/${originalname}`)// yo nagaram hola yedi yeutai name gare ko image upload garyo vanae ta paila ko gayo
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newpath = path + '.' + ext
    fs.renameSync(path, newpath);

    //now lets prepare our data

    const { title, summary, link, content, techstack } = req.body

    const post = await Post.create({
        title,
        summary,
        techstack,
        link,
        image: newpath,
        content

    })

    res.status(200).json('okay')


}



exports.getAllPosts = async (req, res) => {

    const post = await Post.find()

    res.status(200).json({ post })
}

exports.getSinglePost = async (req, res) => {

    let post = await Post.findOne({ "_id": req.params.id })

    res.status(200).json({ post })
}


exports.updatePost = async (req, res) => {

    let id = req.params.id
    let post = await Post.findOne({ "_id": id })
    if (!post) {
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
        let updated_document = await Post.findByIdAndUpdate(req.params.id, {
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

        let updated_document = await Post.findByIdAndUpdate(req.params.id, {
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

exports.deletePost = async (req, res) => {
    console.log("hello delete")
    let post = await Post.findById(req.params.id)

    if (!post) {
        res.status(500).json({
            message: "your post is not found"
        })
    }
    let filename = post.image;
    try {

        await fs.promises.unlink(filename);
        console.log("File deleted successfully");
    } catch (err) {
        console.error("Error deleting file:", err);
    }
    let deleteddocument = await Post.findByIdAndDelete(req.params.id);




    res.status(200).json({
        message: "deleted sucessfully"
    })
}





