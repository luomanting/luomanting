const express = require('express');
const Router = express.Router();
const UserHandle = require('../routers-handler/user.js')
const expressJoi = require('@escook/express-joi');
const login_schema = require('../schema/schema.js')
Router.post('/login', expressJoi(login_schema.login_schema), UserHandle.login)

module.exports = Router