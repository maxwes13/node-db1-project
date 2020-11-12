const express = require("express");

const db = require("../data/dbConfig.js");

const accountsRouter = require("../accounts/accountsRouter.js")

const server = express();

server.use(express.json());

server.use("/api/accounts", accountsRouter);

server.use("/", (req, res) => {
    res.status(200).json({ accounts: "Db1 Project Up!" })
})

module.exports = server;
