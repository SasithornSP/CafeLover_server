const express = require("express")
const router =express.Router()
const authController = require("../Controller/auth-controller")
const {registerSchema,loginSchema,validateWithZod} = require("../Middlewares/validator")
const {authCheck} = require("../Middlewares/authenticate")

//@ENDPOINT http://localhost:8900/register
router.post("/register",validateWithZod(registerSchema),authController.register)
router.post("/login",validateWithZod(loginSchema),authController.login)
router.get("/ProfileUser",authCheck,authController.currentUser)

module.exports=router