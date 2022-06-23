const express = require("express");
const cors = require("cors");
const childProcess = require("child_process");
const fs = require("fs");

var bodyParser = require("body-parser");
const { pseudoRandomBytes } = require("crypto");
const app = express();
const port = 8883;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/branch", (req, res) => {
  childProcess.execSync("cd ../brainversion && git checkout main");
  const branchCommand = childProcess
    .execSync("cd ../brainversion && git branch")
    .toString();
  let branches = branchCommand.trim().split("\n");
  let getData = [];
  for (let line of branches) {
    if (line.trim() != "* main") {
      getData.push(line.trim());
    }
  }
  res.send({ result: getData });
});

app.post("/branch", (req, res) => {
  console.log(req.body);
  childProcess.execSync(
    "cd ../brainversion && git checkout -b " + req.body.branchName
  );

  var data = {
    bookName: req.body.bookName,
    WPP: req.body.WPP,
    memo: req.body.memo,
    branchName: req.body.branchName,
    log: [],
  };

  var jsonData = JSON.stringify(data);

  fs.writeFileSync(
    "../brainversion/" + req.body.branchName + ".json",
    jsonData
  );

  const pushCommand = childProcess
    .execSync("git push origin " + req.body.branchName, {
      cwd: "../brainversion",
    })
    .toString();
  console.log(pushCommand);
  res.send({ result: { status: 200 } });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
