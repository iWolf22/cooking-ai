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
  await page.goto("https://en.wikipedia.org/wiki/Canada");

  await page.screenshot({ path: "image.png"});

const pageData = await page.evaluate(() => {
  return {
    html: document.documentElement.innerHTML,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  }
})

const $ = load(pageData.html);

console.log($.text());

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
