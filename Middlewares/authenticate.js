const prisma = require('../configs/prisma');
const createError = require('../utils/createError');
const jwt = require('jsonwebtoken');


//ใช้verify token
exports.authCheck =async(req,resp,next)=>{
    try {
        //รับ header จาก client
        const authorization =req.headers.authorization
        //check ถ้าไม่มีToken
        console.log(authorization);
        if(!authorization){
            return createError(401,"Missing Token!!!")
        }
        //Bearer token.......ใช้ .slit แบ่งด้วยช่องว่าง
        const token =authorization.split(" ")[1]

        //verify token
        const decode = jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return createError(401,"Unauthorized !!")
            }
            // สร้าง property user =decode (ข้อมูล user จาก token)
            req.user = decode
            console.log(req);
            next()
        })
    } catch (error) {
        next(error)
    }
}

exports.adminCheck =async(req,resp,next)=>{
    try {
        const {email} = req.user
        const adminUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!adminUser || adminUser.role !=="ADMIN"){
            return resp.status(403).json({message:" Admin Access success"})
        }
        next()
    } catch (error) {
        console.log(error)
        resp.status(500).json({message:"Admin Access Denied"})
    }
    }