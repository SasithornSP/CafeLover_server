const prisma = require("../configs/prisma");

exports.createProduct = async(req, resp, next) => {
    try {
        const { name,description,price,image,categoryId } = req.body
        const product = await prisma.product.create({
            data: {
                name: name,
                description: description,
                price: parseFloat(price),
                image: image,
                categoryId: parseInt(categoryId) 
            }
        });
        resp.json({ message: "Hello Products" });
    } catch (error) {
        next(error);
        resp.status(500).json({ message: 'server error' });
    } 
}
exports.listProducts = async(req, resp, next) => {
    try {
        const { count } = req.params
        const products = await prisma.product.findMany({
            take: Number(count),
            orderBy:{createdAt: 'desc'},
            include: {
                category: true,
                image: true
            }
        });
        resp.json(products);
    } catch (error) {
        next(error);
        resp.status(500).json({ message: 'server error' });
    } 
}
exports.readProduct = async(req, resp, next) => {
    try {
        const { id } = req.params
        const products = await prisma.product.findfirst({
            where: {
                id: Number(id)
            },
            include: {
                category: true,
                image: true
            }
        });
        resp.json(products);
    } catch (error) {
        next(error);
        resp.status(500).json({ message: 'server error' });
    } 
}
exports.updateProduct = async(req, resp, next) => {
    try {
        const { name,description,price,image,categoryId } = req.body
        const { id } = req.params
        const clearImage = await prisma.image.deleteMany({
            where: {
                productId: Number(id)
            }
        });
        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                description: description,
                price: parseFloat(price),
                image: image,
                categoryId: parseInt(categoryId) 
            }
        });
    } catch (error) {
        next(error);
        resp.status(500).json({ message: 'server error' });
    } 
}
exports.deleteProduct = async(req, resp, next) => {
    try {
        const { id } = req.params
        const product = await prisma.product.delete({
            where: {
                id: Number(id)
            }
        });
        resp.json({ message: "Delete Products success" });
    } catch (error) {
        next(error);
        resp.status(500).json({ message: 'server error' });
    } 
}
exports.searchProduct = async(req, resp, next) => {
    try {
        const { query } = req.body
        if(query){
            const products = await prisma.product.findMany({
                where: {
                    name: {
                        contains: query
                    }
                },
                include: {
                    category: true,
                    image: true
                }
        })}
        resp.json(products)
    } catch (error) {
        next(error);
        resp.status(500).json({ message: 'Seaech error' });
    } 
}