const User = require("../models/usersModel")
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const secretkey = "lufthansacargo"

dotenv.config({ path: "./.env" })




exports.getSingleUser = async (req, res) => {
    let user = await User.findOne({ "uniqueid": req.query.uniqueid, "password": req.query.password })

    if (!user) {
        res.json({ message: "doesnt exist" }).status(500);
    }
    else {

        jwt.sign({ uniqueid: user.uniqueid, id: user._id }, secretkey, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('okay').status(200);
        })
    }
}

exports.getProfile = async (req, res) => {

    const { token } = req.cookies;
    
    jwt.verify(token, secretkey, {}, (err, info) => {
        if (err) {
            //first ma ta token nai hudaina so tyo error ni aauxa
            //unverified token vayo vanae pani error nai ta aauxa
            //console.log("error in verifying or token is not verified")
            res.status(500).json("bad")
            //note status first hunu parxa json vanda paila
        }
        else {
            res.status(200).json(info)
        }

    })
}

exports.userLogout = async (req, res) => {

    res.cookie('token','').json('okay').status(200);
    //tyo jwt le na banako token or empty pathai dini aani ta vai halyo
    //cookie reset gare ko
}












