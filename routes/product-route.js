const express =require("express")
const router =express.Router()
const {createProduct,listProduct,searchProduct} =require("../Controller/product-controller")

router.post("/",createProduct)
router.get("/:id",listProduct)
router.post("/search",searchProduct)

module.exports=router