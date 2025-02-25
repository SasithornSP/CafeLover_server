const prisma = require('../configs/prisma');
const jwt = require('jsonwebtoken')
const createError = require('../utils/createError')
const bcrypt = require('bcryptjs')


exports.register = async(req,resp,next)=>{
    try {
        const { firstName, lastName, email, password } = req.body
        if(!firstName || !lastName || !email || !password){
            return resp.status(400).json({message:"Please fill in all fields"})
        }

        const CheckEmail = await prisma.user.findFirst({
            where: { email: email }
        });        
        if (CheckEmail){
            return resp.status(400).json({message:"Email is alread exits!!"})
        }

        const hashPassword = bcrypt.hashSync(password,10)

        await prisma.user.create({
            data:{
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:hashPassword
            }
        })
        resp.json({message:"Register Success"})
    } catch (error) {
        next(error)
    }
    };
    
exports.login = async(req,resp,next)=>{
    try {
        const { email, password } = req.body
        //Check email
        const user =await prisma.user.findFirst({
            where:{
                email:email,
            }
        })
        if(!user){
            return createError(400,"Email,password is invalid")
        }
        //Check password
        const isMatch =bcrypt.compareSync(password,user.password)
        if(!isMatch){
            return createError(400,"Email,password is invalid")
        }
        //Generate token
        const payload ={
            id:user.id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            role:user.role
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"30d"
        })
        // Response
        resp.json({message:"Login success",
            payload:payload,
            token:token
        });
    } catch (error) {
        next(error);
        resp.status(500).json({message:"Server Error!!"})
    }
    };

exports.currentUser = async (req,resp,next)=>{
    try {
        const {email}= req.user
        console.log(email);
        const profile =await prisma.user.findFirst({
            where:{email:email},
            select:{
                id:true,
                email:true,
                role:true}
        })
        console.log(profile);
        resp.json({result:profile})
    } catch (error) {
        next(error)
    }
    }
