const db = require('../../connectSQL');

async function getAllProducts(req, res) {
    var productList;
    try {
        productList = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM products', (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result)
                }
            })
        })
    } catch (error) {
        return res.status(200).send(error.message);
    }

    return res.status(200).json(productList);
}


async function getProductList(req, res) {
    var productList;

    try {
        productList = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM products WHERE products.id BETWEEN ? AND ?', [req.params.from, req.params.to], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result)
                }
            })
        })
    } catch (error) {
        return res.status(200).send(error.message);
    }

    return res.status(200).json(productList);
}

async function findProduct(req, res) {
    var product;
    try {
        product = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM products WHERE products.id=?', req.params.id, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result[0])
                }
            })
        })
    } catch (error) {
        return res.status(404).send(error.message);
    }
    return res.status(200).json(product);
}

module.exports = {
    getProductList, findProduct, getAllProducts
}



