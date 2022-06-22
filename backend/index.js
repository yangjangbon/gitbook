const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const port = 8883;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/branch", (req, res) => {
  let branch = ["돈키호테", "역행자", "백만장자의시크릿"];
  res.send({ result: branch });
});

app.post("/branch", (req, res) => {
  let branch = ["돈키호테", "역행자", "백만장자의시크릿"];
  console.log(req.body);
  res.send({ a: "b" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
