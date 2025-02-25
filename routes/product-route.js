const express =require("express")
const router =express.Router()
const {createProduct,listProducts,searchProduct, updateProduct, deleteProduct, readProduct} = require("../Controller/product-controller")

router.post("/",createProduct)
router.get("/:count",listProducts)
router.get("/:id",readProduct)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)
router.post("/search",searchProduct)

module.exports=router