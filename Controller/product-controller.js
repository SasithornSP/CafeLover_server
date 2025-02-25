

exports.createProduct = async(req, resp, next) => {
    try {
        resp.json({ message: "Hello Products" });
    } catch (error) {
        next(error);
        resp.status(500).json({ message: 'server error' });
    } 
}
exports.listProduct = async(req, resp, next) => {
    try {
        resp.json({ message: "Hello List Products" });
    } catch (error) {
        next(error);
        resp.status(500).json({ message: 'server error' });
    } 
}
exports.searchProduct = async(req, resp, next) => {
    try {
        resp.json({ message: "Hello search Products" });
    } catch (error) {
        next(error);
        resp.status(500).json({ message: 'server error' });
    } 
}