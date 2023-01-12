const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/api/counter", async (req, res) => {
  const count = getDbCount();
  res.json({ count });
});

app.post("/api/counter", async (req, res) => {
  const count = incrementCountInDb();
  res.json({ count });
});

// Зачем-то юзаем статику
app.use(express.static(path.join(__dirname, "../client/dist")));

// All remaining requests return the React app, so it can handle routing.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

function getDbCount() {
  const db = JSON.parse(fs.readFileSync("db.json"));
  const count = db.count;
  return count;
}

function incrementCountInDb() {
  const db = JSON.parse(fs.readFileSync("db.json"));
  const incrementedDb = { ...db, count: db.count + 1 };
  fs.writeFileSync("db.json", JSON.stringify(incrementedDb));

  return db.count + 1;
}
