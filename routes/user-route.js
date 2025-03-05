const express =require("express")
const router =express.Router()
const {listUsers, changeStatus, changeRole, userCart, getUserCart, deleteUserCart, userOrder, getUserOrder, getUsers, createOrder} = require("../Controller/user-controller")
const { authCheck, adminCheck } = require("../Middlewares/authenticate")

//@ENDPOINT http://localhost:8900/users
router.get('/users',authCheck,adminCheck,getUsers)
router.post('/users',authCheck,adminCheck,getUsers)
// router.post('/changeStatus',authCheck,adminCheck,changeStatus)
// router.post('/changeRole',authCheck,adminCheck,changeRole)

// router.post('/users/cart',authCheck,userCart)
// router.get('/users/cart',authCheck,getUserCart)
// router.delete('/users/cart',authCheck,deleteUserCart)

// order
router.post('/users/order',authCheck,createOrder)




module.exports=router