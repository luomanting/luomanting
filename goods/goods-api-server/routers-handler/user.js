const db = require('../db/mysqlconfig.js');
var bcrypt = require('bcryptjs');
exports.login = (req, res) => {
    const userinfo = req.body
        // userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    const sql = 'select * from sp_manager where mg_name=?'
    db.query(sql, userinfo.username, (err, resualts) => {
            if (err) return res.ResInfo(err)
            if (resualts.length != 1) return res.ResInfo('用户名错误')

            // 比较前端密码与数据库中密码是否一致，一致返回true,否则返回false
            const compareres = bcrypt.compareSync(userinfo.password, resualts[0].mg_pwd)
            if (!compareres) return res.ResInfo('密码错误')

            res.ResInfo('登录成功', 0, resualts)
        })
        // res.send({ status: 0, message: '登陆成功', data: req.body })
}