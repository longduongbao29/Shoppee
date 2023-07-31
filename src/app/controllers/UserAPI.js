const db = require('../../connectSQL');


async function getUsers(req, res) {

    const data = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result)
            }
        })
    })
    return res.status(200).json(data)
}
async function findUser(req, res) {
    var user;
    try {
        user = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE users.id=?', req.params.id, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            })
        })

    } catch (err) {
        return res.status(404).send(err.message)
    }

    res.status(200).json(user);
}

async function loggedInUser(req, res) {
    var user;
    try {
        user = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE users.id=?', req.session.loggedInUser.id, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            })
        })

    } catch (err) {
        return res.status(404).send(err.message)
    }

    res.status(200).json(user);
}


module.exports = {
    getUsers, findUser
}