/*import express from "express";
import bodyParser from "body-parser";

require("dotenv").config();

import { Configuration, OpenAIApi } from "openai";
*/

const puppeteer = require('puppeteer');

const cheerio = require('cheerio');
const { load } = require('cheerio');


/*
const app = express();
const port = 3001;
*/

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      
      width: 500,
      height: 900,
    }
});

  const page = await browser.newPage();
  await page.goto("https://www.honestfoodtalks.com/green-tea-matcha-mochi-recipe/");

  await page.screenshot({ path: "image.png"});

const pageData = await page.evaluate(() => {
  return {
    html: document.documentElement.innerHTML,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  }
})

const $ = load(pageData.html);

const headings = $("h2, h3").get();

var body = {
  ingredients: "",
  instructions: ""
};

for (const _heading of headings) {
  const heading = $(_heading).text();
  if (heading.includes("Ingredients") || heading.includes("ingredients")) {
    const parentBody = $(_heading).parent();
    //console.log($(parentBody).text());
    body.ingredients = $(parentBody).text();
  }
  if (heading.includes("Instructions") || heading.includes("instructions") || heading.includes("Preparation")) {
    const parentBody = $(_heading).parent();
    body.instructions = $(parentBody).text();
    //add instructions and everything into array together before feeding to openAI
  }

}

console.log("Ingredients: " + body.ingredients + " Instructions: " + body.instructions);

  await browser.close();
})();

/*
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

*/
