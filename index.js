const express = require('express');
const app = express();
const db = require("./models");
require("dotenv").config();

const cors = require("cors");
app.use(cors());

app.use(express.json());

const authRouter = require("./routes/Auth");
const userRouter = require("./routes/Users");
app.use("/auth", authRouter);
app.use("/users", userRouter);

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("Server on port 3001");
    });
}).catch((err) => {
    console.log(err);
});