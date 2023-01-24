const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            email: email,
            password: hash,
            regDate: new Date().toLocaleString(),
        });
        res.json("Регистрация прошла успешно");
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username }});
    
    if (!user) {
        res.json({ error: "Пользователь не существует" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Неверное сочетание логина и пароля"});
            } else if (!user.status) {
                    res.json({ error: "Пользователь заблокирован"});
                } else {
                    const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
                    Users.update({ authDate: new Date().toLocaleString()}, {
                        where: { username: user.username }
                    })
                    res.json({
                        token: accessToken,
                        username: username,
                        id: user.id,
                        status: user.status,
                    });
                }
            });
        };
    });

router.get("/", validateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;