const prisma = require("../configs/prisma");

exports.createCategory = async(req, resp) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({
            data: {
                name:name
            }
        });
        resp.json({ message: 'Hello category' });
    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: 'server error' });
    }
}
exports.listCategory = (req, resp) => {
    try {
        const category = prisma.category.findMany ()
        resp.json(category);
    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: 'server error' });
    }
}
exports.removeCategory = (req, resp) => {
    try {
        const { id } = req.params
        const category = prisma.category.delete({
            where: {
                id: Number(id)
            }
        });
        resp.json(category);
    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: 'server error' });
    }
}