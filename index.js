const express = require('express');
const app = express();
const cors = require("cors");
const db = require("./models");

const authRouter = require("./routes/Auth");
const userRouter = require("./routes/Users");

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/users", userRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server on port 3001");
    });
});