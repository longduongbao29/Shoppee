const db = require('../connectSQL');

const UserInfoModel = {
    tableName: 'user_infos',
    create: function (user, callback) {
        const sql = `INSERT INTO ${this.tableName} (name, birdthday,sex,address,phone_number) VALUES (?, ?,?,?,?)`;
        db.query(sql, [user.name, user.birdthday, user.sex, user.addressm, user.phone_number], callback);
    },

};

module.exports = UserInfoModel;