const express =require("express")
const router =express.Router()
const  payment = require("../Controller/payment-controller")
const { authCheck, adminCheck } = require("../Middlewares/authenticate")

// payment
//@ENDPOINT http://localhost:8900/order/payment
router.post('/payment/checkout',authCheck,payment.checkOut)
router.get('/payment/checkout-status/:session_id',authCheck,payment.checkOutStatus)

module.exports=router





