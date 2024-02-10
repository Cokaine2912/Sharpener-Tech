const path = require("path");
const fs = require("fs");

const rootDir = require("../util/path");

// const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    // products.push(this);
    const p = path.join(rootDir, "../Task6/data/products.json");
    console.log("TO CHECK THIS !!!!!!!", p);
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    const p = path.join(rootDir, "../Task6/data/products.json");
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
