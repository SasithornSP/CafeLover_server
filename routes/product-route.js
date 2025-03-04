const express =require("express")
const router =express.Router()
const {searchProduct, readProduct, listProducts} = require("../Controller/product-controller")

//@ENDPOINT http://localhost:8900/products/
router.get("/",listProducts)

// หน้าdetail
router.get("/:id",readProduct)

// หน้าเมนู
router.post("/search",searchProduct)

module.exports=router