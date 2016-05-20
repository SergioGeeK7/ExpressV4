"use strict"
const nJwt = require('njwt');
const secret = require("../config.json").secretJWT;
const claims = {
  scope    : "self, admins"
};

module.exports = {
    create,
    validate
};

function create(data){
    
    let keys = Object.keys(data);
    for(let i =0,length=keys.length;i<length;i++){
        claims[keys[i]] = data[keys[i]];
    }
    
    return nJwt.create(claims,secret).compact();
}

function validate (token,verify) {
    nJwt.verify(token,secret,verify);
}
