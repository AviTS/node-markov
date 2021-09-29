const markov = require('./markov')
const axios = require('axios')
const process = require('process')
const fs = require('fs')

function generateText(text) {
  let mMachine = new markov.MarkovMachine(text);
  console.log(mMachine.makeText());
}


function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Error: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}


async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Error: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data)
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Error: ${method}`);
  process.exit(1);
}