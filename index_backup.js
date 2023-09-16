/*import express from "express";
import bodyParser from "body-parser";

require("dotenv").config();

import { Configuration, OpenAIApi } from "openai";
*/

const puppeteer = require('puppeteer');

const cheerio = require('cheerio');
const { load } = require('cheerio');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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

// console.log(pageData.html);

// const document = (new JSDOM(pageData.html, {includeNodeLocations: true})).window.document;

// console.log(document.querySelectorAll("div"));
// for (const h2 of document.querySelectorAll("h2")) {
//   if (h2.textContent.includes("Economy")) {
//     console.log("economy!");
//     console.log(h2.parent);
//     console.log(h2);
//     console.log({...h2});
//     console.log(h2.);
//   }
// }

const $ = load(pageData.html);

const headings = $("h2").get();

// console.log($.text());


for (const _heading of headings) {
  const heading = $(_heading)
  console.log(heading.text());
}

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
