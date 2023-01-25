const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/", async (req, res) => {
    const users = await Users.findAll();
    res.send(users);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    res.send(user);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    await Users.destroy({ where: { id: id } });
    user.save();
    const users = await Users.findAll();
    res.send(users);
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    await Users.update({ status: 0 }, { where: { id: id } });
    user.save();
    const users = await Users.findAll();
    res.send(users);
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    await Users.update({ status: 1 }, { where: { id: id } });
    user.save();
    const users = await Users.findAll();
    res.send(users);
});

module.exports = router;