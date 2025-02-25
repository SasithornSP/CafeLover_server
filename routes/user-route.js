const express =require("express")
const router =express.Router()
const {listUsers, changeStatus, changeRole, userCart, getUserCart, deleteUserCart, userOrder, getUserOrder} = require("../Controller/user-controller")
const { authCheck, adminCheck } = require("../Middlewares/authenticate")

router.get('/users',authCheck,adminCheck,listUsers)
router.post('/changeStatus',authCheck,adminCheck,changeStatus)
router.post('/changeRole',authCheck,adminCheck,changeRole)

router.post('/user/cart',authCheck,userCart)
router.get('/user/cart',authCheck,getUserCart)
router.delete('/user/cart',authCheck,deleteUserCart)


router.post('/user/order',authCheck,userOrder)
router.get('/user/order',authCheck,getUserOrder)



module.exports=router