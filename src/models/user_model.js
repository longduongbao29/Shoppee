const db = require('../mysqlconnector');

const User = {
    tableName: 'users',
    create: function (user, callback) {
        const sql = `INSERT INTO ${this.tableName} (username, password_hash) VALUES (?, ?)`;
        db.query(sql, [user.username, user.password_hash], callback);
    },

};

module.exports = User;