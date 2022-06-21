const express = require("express");
const app = express();
const cors = require("cors");
const port = 8883;

app.use(cors());

app.get("/branch", (req, res) => {
  let branch = ["돈키호테", "역행자", "백만장자의시크릿"];
  res.send({ result: branch });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
