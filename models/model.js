const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database("../db.sqlite")

console.log("The Database is Connected")

module.export = db