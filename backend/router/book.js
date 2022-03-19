const router =require("express").Router()
const {bookaddCtrl,bookgetCtrl,bookupdate,bookdelete}=require("../controller/book")
const verifytoken= require("../middleware/verifytoken")

router.post("/add",verifytoken,bookaddCtrl)
router.get("/all",verifytoken,bookgetCtrl)
router.put("/update/:id",verifytoken,bookupdate)
router.delete("/delete/:id",verifytoken,bookdelete)

module.exports=router