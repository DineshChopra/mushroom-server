const mongoose = require("mongoose");
const User = require("./user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
exports.signup = (req, res, next) => {
    const {email, password} = req.body;
    User.find({email})
        .then(userResponse => {
            if(userResponse.length >= 1) {
                const message = 'User already exist'
                res.status(500).json({message});
            } else {
                bcrypt.hash(password, 10, (error, hash) => {
                    if(error) {
                        return res.status(500).json({error});
                    } else {
                        const user = new User({
                            _id : new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                const message = 'User created';
                                res.status(201).json({message});
                            })
                            .catch(error => {
                                res.status(500).json({error});
                            });
                    }
                });
            }
        });
}

exports.login = (req, res, next) => {
    const {email, password} = req.body;
    User.find({email})
        .then(users => {
            if(users.length < 1){
                return res.status(401).json({
                    messag: 'Auth Failed'
                });
            }
            bcrypt.compare(req.body.password, users[0].password, (error, result) => {
                if(error) {
                    return res.status(401).json({message: 'Auth Failed'});
                }
                if(result) {
                    const payload = {email : users[0].email, userId: users[0]._id};
                    const jwtKey = 'SecretKey'; // It can be anything
                    const jwtOptions = {
                        expiresIn: '1h'
                    };
                    const token = jwt.sign(payload, jwtKey, jwtOptions)
                    return res.status(200).json({ message: 'Auth Successful', token});
                } else {
                    return res.status(401).json({message: 'Auth Failed'});
                }
            })
        })
        .catch(error => {
            res.status(500).json({error});
        })
}
exports.deleteUser = (req, res, next) => {
    User.remove()
        .then(result => {
            const message = 'User Deleted';
            res.status(200).json({message});
        })
        .catch(error => {
            res.status(500).json({error});
        })
}