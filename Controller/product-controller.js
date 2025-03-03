const prisma = require("../configs/prisma");


exports.listProducts = async(req, resp, next) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
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
                category: true
            }
        });
        resp.json(products);
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