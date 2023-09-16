import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let data = {
    header: "Input Recipe " 
  }
  res.render("index.ejs", data);
});

app.post("/submit", (req, res) => {
  let data = {
    header: "The recipe you inputted is " + (req.body["inputtedRecipe"]) + "!"
  }
  res.render("index.ejs", data)
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
