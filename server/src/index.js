const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs-extra");

const app = express();

app.use(cors());
app.use(morgan("short"));

const PORT = 5005;

const json = fs.readJsonSync("data.json");

app.get("/channels", async (req, res) => {
  res.status(200).json(Object.keys(json.data));
});

app.get("/data/:channel", async (req, res) => {
  const { channel } = req.params;
  res.status(200).json(json.data[channel]);
});

app.get("/latex", async (req, res) => {
  res.status(200).json(json["technical_description"]);
});

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
