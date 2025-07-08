const express=require("express")
const router=express.Router()
const {getAllBlogs,getSingleBlog,createBlog,updateBlog,deleteBlog}=require("../controllers/Blogscontroller")

const multer=require("multer")
//const uploadmiddleware=multer({dest:"./images"})
const uploadmiddleware = multer({
  dest: "./images",
  limits: {
    fieldSize: 50 * 1024 * 1024  // 50 MB
  }
});


router.route("/blogs").get(getAllBlogs)
router.route("/blogs/getBlog/:id").get(getSingleBlog)
router.route("/blogs/new").post(uploadmiddleware.single("image"),createBlog) //tyo file chai timro aagadi bata 
//pathako form data ma file ko key kun ho vanae ko
//save gardi halxa tyo file lai tara format chai halnae nai milauni 
router.route("/blogs/update/:id").put(uploadmiddleware.single("image"),updateBlog)
router.route("/blogs/deleteBlog/:id").delete(deleteBlog)

module.exports=router