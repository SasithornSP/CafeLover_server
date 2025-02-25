const prisma = require("../configs/prisma");

exports.listUsers = async(req, resp) => {
    try {
       const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            // cart: true,
            // order: true
        }
       })
         resp.json(users)
    } catch (error) {
        resp.status(400).json({message: "Could not list users"})
    }
}

exports.changeStatus = async(req, resp) => {
    try {
        const {id, status} = req.body
        await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                status: status
            }
        })
        resp.json({"message":"Update status successfull"})
    } catch (error) {
        resp.status(400).json({message: "Could not change status"})
    }
}

exports.changeRole = async(req, resp) => {
    try {
        const {id, role} = req.body
        await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                role: role
            }
        })
        resp.json({message:"Update role successfull"})
    } catch (error) {
        resp.status(400).json({message: "Could not change role"})
    }
}

exports.userCart = async(req, resp) => {
    try {
        const {cart} = req.body
        console.log(cart)
        console.log(req.user.id)

        const user =await prisma.user.findFirst({
            where:{
                id:Number(req.user.id)
            }
        })
        console.log(user)
        //Delete old cartItem
        const deleteCartItem = await prisma.cartItem.deleteMany({
            where: {
                userId: req.user.id
            }
        })
        //delete old cart เราไม่มี cart ใน user แล้ว
        // const deleteCart = await prisma.cart.deleteMany({
        //     where: {
        //        orderById:user.id
        //     }
        // })
        //เตรียมสินค้า
        const products = cart.map(item => {
            return {
                product: {connect: {
                    id: item.id,
                    price: item.price
                }},
                quantity: item.quantity
            }
        })
//หาผลรวมของราคาสินค้า
        let cartTotal = prisma.cartItem.reduce((sum, item) => {
            return sum + item.price * item.quantity
        }, 0)

        console.log(cartItem);
        console.log(cartTotal)
//New cart
        const newCart = await prisma.cartItem.create({
            data: {
                products: {
                    create: products
                },
                total: cartTotal,
                orderById: user.id,
            }
        })
        console.log(newCart);
        resp.json({message:"Add to cart successfull"})
    } catch (error) {
        resp.status(400).json({message: "Could not userCart"})
    }
}

exports.getUserCart = async(req, resp) => {
    try {
        const cart = await prisma.cartItem.findMany({
            where: {
                orderById: Number(req.user.id)
            },
            include: {
                products: true
            }
        })
        // console.log(cart);
        resp.json({
            products: cart.products,
            cartTotal: cart.cartTotal
        })
    } catch (error) {
        resp.status(400).json({message: "Could not getUserCart"})
    }
}

exports.deleteUserCart = async(req, resp) => {
    try {
        const cart = await prisma.cartItem.findFirst({
            where: {
                orderById: Number(req.user.id)
            }})
            if(!cart){
                return resp.status(400).json({message: "No Cart"})
            }
//Delete cart
            const deleteCart = await prisma.cartItem.deleteMany({
                where: {
                    id: cart.id
                }
            })
            const deleteCartItem = await prisma.cartItem.deleteMany({
                where: {
                    orderById: Number(req.user.id)
                }
            })
            console.log(deleteCartItem);
        resp.json({message:"Cart delete successfull", deletedCount: deleteCartItem.count})
    } catch (error) {
        resp.status(400).json({message: "Could not deleteUserCart"})
    }
}

exports.userOrder = async(req, resp) => {
    try {
        res.status(200).json({"message":"Hello userOrder"})
    } catch (error) {
        res.status(400).json({message: "Could not userOrder"})
    }
}

exports.getUserOrder = async(req, resp) => {
    try {
        res.status(200).json({"message":"Hello getUserOrder"})
    } catch (error) {
        res.status(400).json({message: "Could not getUserOrder"})
    }
}
