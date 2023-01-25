const express = require('express');
const cors = require("cors");
const app = express();
const db = require("./models");
require("dotenv").config();

app.use(cors());
app.options('*', cors());
app.use(express.json());

const authRouter = require("./routes/Auth");
const userRouter = require("./routes/Users");
app.use("/auth", authRouter);
app.use("/users", userRouter);

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started");
    });
}).catch((err) => {
    console.log(err);
});