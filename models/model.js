const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("../db.sqlite", err => {
    console.log(err);
});

<<<<<<< HEAD
db.run(`CREATE TABLE IF NOT EXISTS dummy (
                Id BIGSERIAL PRIMARY KEY
            )`);
db.run(`CREATE TABLE IF NOT EXISTS game ( 
                        RoomId BIGSERIAL PRIMARY KEY, 
                        HostUserId INT NULL, 
                        QuizSetId INT NULL, 
                        CreatedOn DATETIME DEFAULT now
                        )
                     `);
db.run(`CREATE TABLE IF NOT EXISTS quizset ( 
                         quizSetId BIGSERIAL PRIMARY KEY, 
                         createdByUserId INT NULL, 
                         quizName NVARCHAR(500) NULL, 
                         quizDescription NVARCHAR(4000)  NULL, 
                         createdOn DATETIME DEFAULT now
                        ); 
                `);
=======
console.log("The Database is Connected")
>>>>>>> 1de612ba08641dae863ec1f5faa94a0a315d5e25

db.close();
console.log("The Database is initialized");

module.exports = {
    // init: function init() {

    //     db.run(`CREATE TABLE IF NOT EXISTS dummy (
    //             Id BIGSERIAL PRIMARY KEY
    //         )`);
    //     db.run(`CREATE TABLE IF NOT EXISTS game ( 
    //                     RoomId BIGSERIAL PRIMARY KEY, 
    //                     HostUserId INT NULL, 
    //                     QuizSetId INT NULL, 
    //                     CreatedOn DATETIME DEFAULT now
    //                     )
    //                  `);
    //     db.run(`CREATE TABLE IF NOT EXISTS quizset ( 
    //                      quizSetId BIGSERIAL PRIMARY KEY, 
    //                      createdByUserId INT NULL, 
    //                      quizName NVARCHAR(500) NULL, 
    //                      quizDescription NVARCHAR(4000)  NULL, 
    //                      createdOn DATETIME DEFAULT now
    //                     ); 
    //             `);

    //     db.close();
    //     console.log("The Database is initialized");

    // },
    db: db
}