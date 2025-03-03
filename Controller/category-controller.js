const prisma = require("../configs/prisma");


exports.listCategory = (req, resp) => {
    try {
        const category = prisma.category.findMany()
        resp.json(category);
    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: 'server error' });
    }
}