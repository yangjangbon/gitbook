const express = require("express");
const cors = require("cors");
const path = require("path");
const childProcess = require("child_process");
const fs = require("fs");
const tesseract = require("node-tesseract-ocr");

const bodyParser = require("body-parser");
const multer = require("multer");
const { pseudoRandomBytes } = require("crypto");
const { json } = require("body-parser");
const app = express();
const port = 8883;
const upload = multer({
  dest: __dirname + "/uploads",
});
const config = {
  lang: "kor+eng",
  oem: 1,
  psm: 3,
};

const http = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "/build")));

app.post("/image/:branch", upload.single("file"), (req, res, next) => {
  console.log("image/" + req.params.branch + " post");
  const { path } = req.file;
  let words;
  tesseract
    .recognize(path, config)
    .then((text) => {
      words = text.split(" ");
      console.log(words);
      wordsList = [];
      for (item of words) {
        if (item != "") {
          wordsList.push(item);
        }
      }
      console.log(wordsList);
      res.send({ result: { status: 200, WPP: wordsList.length } });
    })
    .catch((error) => {
      console.log(error.message);
      res.send({ result: { status: 500, WPP: 100 } });
    });
});

app.get("/commit/:branch", (req, res) => {
  console.log("commit/" + req.params.branch + " get");
  childProcess.execSync("git checkout " + req.params.branch, {
    cwd: "../brainversion",
  });
  let rawData = fs.readFileSync(
    "../brainversion/" + req.params.branch + ".json"
  );
  let jsonData = JSON.parse(rawData);
  res.send({ result: jsonData });
});

app.post("/merge/:branch", (req, res) => {
  console.log("merge/" + req.params.branch + " post");
  childProcess.execSync("git checkout " + req.params.branch, {
    cwd: "../brainversion",
  });
  let rawData = fs.readFileSync(
    "../brainversion/" + req.params.branch + ".json"
  );
  let jsonData = JSON.parse(rawData);
  console.log(jsonData);
  jsonData.log.push(req.body);
  console.log(jsonData);

  fs.writeFileSync(
    "../brainversion/" + req.params.branch + ".json",
    JSON.stringify(jsonData)
  );

  childProcess.execSync("git add " + req.params.branch + ".json", {
    cwd: "../brainversion",
  });
  childProcess.execSync("git commit -m '" + req.body.commitMessage + "'", {
    cwd: "../brainversion",
  });

  childProcess.execSync("git checkout main", {
    cwd: "../brainversion",
  });

  childProcess.execSync("git merge " + req.params.branch, {
    cwd: "../brainversion",
  });

  childProcess.execSync("git push origin main", {
    cwd: "../brainversion",
  });

  res.send({ result: { status: 200, jsonData } });
});

app.post("/commit/:branch", (req, res) => {
  console.log("commit/" + req.params.branch + " post");
  childProcess.execSync("git checkout " + req.params.branch, {
    cwd: "../brainversion",
  });
  let rawData = fs.readFileSync(
    "../brainversion/" + req.params.branch + ".json"
  );
  let jsonData = JSON.parse(rawData);
  console.log(jsonData);
  jsonData.log.push(req.body);
  console.log(jsonData);

  fs.writeFileSync(
    "../brainversion/" + req.params.branch + ".json",
    JSON.stringify(jsonData)
  );

  childProcess.execSync("git add " + req.params.branch + ".json", {
    cwd: "../brainversion",
  });
  childProcess.execSync("git commit -m '" + req.body.commitMessage + "'", {
    cwd: "../brainversion",
  });

  childProcess.execSync("git push origin " + req.params.branch, {
    cwd: "../brainversion",
  });

  res.send({ result: { status: 200, jsonData } });
});

app.get("/branch", (req, res) => {
  console.log("branch get");
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
  console.log("branch post");
  console.log(req.body);
  childProcess.execSync("git checkout -b " + req.body.branchName, {
    cwd: "../brainversion",
  });

  var data = {
    bookName: req.body.bookName,
    WPP: req.body.WPP,
    memo: req.body.memo,
    branchName: req.body.branchName,
    log: [{ start: 1, end: 1, commitMessage: "Create Branch" }],
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
  console.log("branch delete");
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

app.get("/", (res, req) => {
  console.log("get /");
  req.sendFile(path.join(__dirname, "/build/index.html"));
});

http.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
