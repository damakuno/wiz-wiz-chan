const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("../db.sqlite", (err, db) => {
  if (err) {
    console.error(err);
  }
  console.log("The Server is connected to the db")
})

db.each("CREATE TABLE IF NOT EXISTS users(id BIGSERIAL PRIMARY KEY,\
  first_name VARCHAR(100) NOT NULL,\
  last_name VARCHAR(100) NOT NULL,\
  username VARCHAR(100) NOT NULL,\
  email VARCHAR(100) NOT NULL,\
  first_password VARCHAR(100) NOT NULL,\
  confirm_password VARCHAR(100) NOT NULL,\
  date_of_birth DATE NOT NULL,\
  gender VARCHAR(10) NOT NULL,\
  country_of_birth VARCHAR(150) NOT NULL);", function (err) {
  if (err) {
    console.error(err)
  }
})

db.each("DROP TABLE IF EXISTS games;")

module.exports = db;