const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs-extra");

const app = express();

app.use(cors());
app.use(morgan("short"));

const PORT = 5005;

const data = fs.readJsonSync("data.json");

app.get("/channels", async (req, res) => {
  res.status(200).json(Object.keys(data));
});

app.get("/data/:channel", async (req, res) => {
  const { channel } = req.params;
  res.status(200).json(data[channel]);
});

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
