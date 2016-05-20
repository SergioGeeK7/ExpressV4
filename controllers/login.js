"use strict"
var express    = require('express');
var controller = express.Router();
var login      = require("../helper/JWT.js");

controller
    .route('/')
    .get(function (req, res) {
        const token = login.create({user:"Sergio"});
        res.end(token);
    });




module.exports = ['/login', controller];