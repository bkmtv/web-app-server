const express = require('express');
const app = express();
const db = require("./models");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

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