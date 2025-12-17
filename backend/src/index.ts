import express from "express";

const app = express();

app.use(express.json());

const arr: string[] = [];

app.get("/", (req, res) => {
  res.json("aa");
});

app.post("/", (req, res) => {});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
