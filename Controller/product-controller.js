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

const handleQuery = async (req, resp, query) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: query,
                }
            },
            include: {
                category: true,
            }

        })
        resp.json(products)
    } catch (err) {
        //err
        console.log(err)
        resp.status(500).json({ message: "Search Error" })
    }
}
const handleCategory = async (req, resp, categoryId) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryId.map((id) => Number(id))
                }
            },
            include: {
                category: true,
            }
        })
        resp.json(products)
    } catch (err) {
        console.log(err)
        resp.status(500).json({ message: 'Server Error ' })
    }
}

exports.searchProduct = async(req, resp, next) => {
    try {
        const { query, category } = req.body
        if(query){
            const products = await handleQuery(req,resp,query) 
        }
        // if(category){
        //     const category = await handleCategory(req,resp,prisma.category)
        // }
        // resp.json(products)
    } catch (error) {
        next(error);
        // resp.status(500).json({ message: 'Seaech Server error' });
    } 
}