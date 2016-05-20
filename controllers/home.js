var express    = require('express');
var controller = express.Router();
var login      = require("../helper/JWT.js");

controller
    .route('/')
    .get(function (req, res) {
        
        var token = req.headers["authorization"];
    
        login.validate(token,verify);
    
    
        function verify (err,obj){
            if(err)
                return res.end("su session ha caducado")
            console.log(obj);
            res.end("se ha logeado correctamente "+obj.body.user);
            
        
        }
    });
    
module.exports = ['/', controller];