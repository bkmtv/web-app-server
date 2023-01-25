const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());

const corsOptions = { origin: ["https://users-ibkmt.herokuapp.com", "https://users-ibkmt.vercel.app"], credentials: true }
app.use(cors(corsOptions));

const db = require("./models");

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