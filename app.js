const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const app = express();

const dbConnect = require('./db/dbConnect');
const User = require('./db/userModel');
const auth = require("./auth");

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.json({
        message: "Hey!, This is your server response"
    });
    next();
});

app.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            const user = new User({
                email: req.body.email,
                password: hashedPassword
            });

            user.save()
                .then((result) => {
                    res.status(201).send({
                        message: "User Created Successfully",
                        result
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Error creating user",
                        error
                    });
                });
        }).catch((error) => {
            res.status(500).send({
                message: "Password was not hashed successfully",
                error
            });
        });
});

app.post("/login", (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password)
                .then((passwordCheck) => {
                    if (!passwordCheck) {
                        return res.status(400).send({
                            message: 'Passwords do not match'
                        });
                    }

                    const token = jwt.sign({
                        userId: user._id,
                        userEmail: user.email
                    }, "RANDOM-TOKEN", { expiresIn: "24h" });

                    res.status(200).send({
                        message: "Login is successful",
                        email: user.email,
                        token,
                    });
                })
                .catch(err => {
                    res.status(400).send({
                        message: 'Passwords do not match',
                        err
                    });
                });
        })
        .catch((err) => {
            res.status(404).send({
                message: "Email not found",
                err
            });
        });
});

app.get("/public-endpoint", (req, res) => {
    res.json({
        message: "You are free to access this route any time"
    });
});

