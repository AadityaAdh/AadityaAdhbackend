const express=require("express")
const router=express.Router()
const {getSingleUser,getProfile,userLogout}=require("../controllers/Usercontroller")

router.route("/posts/getUser").get(getSingleUser)

router.route("/profile").get(getProfile)

//jaa jaa logged in xa vanni verify gary xa tya tya yo profile with crediendials pathauni
//yedi milyo vanae matrai access garni
//simply login garnu ko kaam yo token generate garnu 

router.route("/logout").post(userLogout)

module.exports=router