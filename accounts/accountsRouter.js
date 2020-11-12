const express = require("express");

const db = require("../data/dbConfig.js");

const accountsRouter = express.Router();

db.on("query", (data) => {
  console.log(data);
});

accountsRouter.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error with database", error: error });
  }
});

accountsRouter.post("/", async (req, res) => {
  const accountData = req.body;

  try {
    const account = await db("accounts").insert(accountData);
    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error with database", error: error });
  }
});

accountsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const count = await db("accounts").update(changes).where({ id });
    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Problem with database", error: error });
  }
});

accountsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await db("accounts").del().where({ id });

    if (count) {
      res.json({ deleted: count });
    } else {
      res.status(404).json({ message: "Invalid id" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = accountsRouter;