const express = require("express");
const cors = require("cors");
const childProcess = require("child_process");
const fs = require("fs");

var bodyParser = require("body-parser");
const { pseudoRandomBytes } = require("crypto");
const { json } = require("body-parser");
const app = express();
const port = 8883;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/commit/:branch", (req, res) => {
  childProcess.execSync("git checkout " + req.params.branch, {
    cwd: "../brainversion",
  });
  let rawData = fs.readFileSync(
    "../brainversion/" + req.params.branch + ".json"
  );
  let jsonData = JSON.parse(rawData);
  res.send({ result: jsonData });
});

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
  childProcess.execSync("git checkout -b " + req.body.branchName, {
    cwd: "../brainversion",
  });

  var data = {
    bookName: req.body.bookName,
    WPP: req.body.WPP,
    memo: req.body.memo,
    branchName: req.body.branchName,
    log: [{ start: 1, end: 1, message: "Create Branch" }],
  };

  var jsonData = JSON.stringify(data);

  fs.writeFileSync(
    "../brainversion/" + req.body.branchName + ".json",
    jsonData
  );

  childProcess.execSync("git add " + req.body.branchName + ".json", {
    cwd: "../brainversion",
  });

  childProcess.execSync("git commit -m 'Create Branch'", {
    cwd: "../brainversion",
  });

  const pushCommand = childProcess
    .execSync("git push origin " + req.body.branchName, {
      cwd: "../brainversion",
    })
    .toString();
  console.log(pushCommand);
  res.send({ result: { status: 200 } });
});

app.delete("/branch", (req, res) => {
  childProcess.execSync("git checkout " + req.body.branchName, {
    cwd: "../brainversion",
  });

  fs.unlinkSync("../brainversion/" + req.body.branchName + ".json");

  childProcess.execSync("git checkout main", {
    cwd: "../brainversion",
  });
  childProcess.execSync("git branch -d --force " + req.body.branchName, {
    cwd: "../brainversion",
  });
  childProcess.execSync(
    "git push origin --delete --force " + req.body.branchName,
    {
      cwd: "../brainversion",
    }
  );

  res.send({ result: { status: 200 } });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
