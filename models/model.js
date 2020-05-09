const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("../db.sqlite", err => {
    console.log(err);
});

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