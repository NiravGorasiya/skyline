const router =require("express").Router()
const {signupCtrl,signinCtrl}=require("../controller/user")

router.post("/signup",signupCtrl)
router.post("/signin",signinCtrl)

module.exports=router