const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("../db.sqlite",(err, db)=>{
    if (err) {
      console.error(err);
    }
    console.log("The Server is connected to the db")
})

db.each("CREATE TABLE IF NOT EXISTS games(id BIGSERIAL PRIMARY KEY, games BIGSERIAL);", function (err) {
    if(err){
        console.error(err)
    }

  })