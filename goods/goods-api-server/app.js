const express = require('express');
var app = express()
const cors = require('cors')
app.use(cors())
const router = require('./routers/user.js')
const bodyparser = require('body-parser');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// 信息返回中间件
app.use((req, res, next) => {
    res.ResInfo = function(err, status = 1, data = {}) {
        res.send({
            // 如果系统错误，返回系统错误信息，否则返回自定义错误
            message: err instanceof Error ? err.message : err,
            status,
            resdata: data
        })
    }
    next()
})


app.use('/api', router)

// 错误级别中间件
const Joi = require('joi');
app.use(function(err, req, res, next) {
    if (err instanceof Joi.ValidationError) {
        return res.ResInfo(err)
    }
})
app.listen(8888, () => {
    console.log('server running at http://127.0.0.1:8888');
})