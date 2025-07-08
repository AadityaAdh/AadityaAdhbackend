const express=require("express")
const router=express.Router()
const {getAllPosts,createPost,updatePost,deletePost, getSinglePost}=require("../controllers/Postscontroller")
const multer=require("multer")
//const uploadmiddleware=multer({dest:"./images"})
const uploadmiddleware = multer({
  dest: "./images",
  limits: {
    fieldSize: 50 * 1024 * 1024  // 50 MB
  }
});


router.route("/posts").get(getAllPosts)
router.route("/posts/getPost/:id").get(getSinglePost)
router.route("/posts/new").post(uploadmiddleware.single("image"),createPost) //tyo file chai timro aagadi bata 
//pathako form data ma file ko key kun ho vanae ko
//save gardi halxa tyo file lai tara format chai halnae nai milauni 
router.route("/posts/update/:id").put(uploadmiddleware.single("image"),updatePost)
router.route("/posts/deletePost/:id").delete(deletePost)

module.exports=router