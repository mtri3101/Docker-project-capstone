const express = require("express");
const { sequelize } = require('./models')
const { AppError, handleErrors } = require("../src/helpers/error");
const app = express();

app.use(express.json());

app.use(express.static("./static"))

sequelize.sync({ alter: true })

const v1 = require("./routers/v1");

app.use("/api/v1", v1);


app.use(handleErrors);

app.listen(4000);
