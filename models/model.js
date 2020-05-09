const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "db.sqlite"), err => {
    console.log(err);
});

module.exports = {
    init: function init() {
        db.run(`CREATE TABLE IF NOT EXISTS game (
                        RoomId BIGSERIAL PRIMARY KEY,
                        HostUserId INT NULL,
                        QuizSetId INT NULL,
                        CreatedOn DATETIME NULL
                        )
                     `);
        db.run(`CREATE TABLE IF NOT EXISTS quizset (
                         quizSetId BIGSERIAL PRIMARY KEY,
                         createdByUserId INT NULL,
                         quizName NVARCHAR(500) NULL,
                         quizDescription NVARCHAR(4000)  NULL,
                         createdOn DATETIME NULL
                        );
                `);
        db.run(`CREATE TABLE IF NOT EXISTS quizquestions (
            questionId BIGSERIAL PRIMARY KEY,
            quizSetId INT NULL,
            number INT NULL,
            content NVARCHAR(4000) NULL,
            correctAnswerNumber INT,
            createdOn DATETIME NULL
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS quizanswers (
            answerId BIGSERIAL PRIMARY KEY,
            questionId INT,
            content NVARCHAR(4000) NULL,
            createdOn DATETIME NULL
        )`);



        console.log("The Database is initialized");
    },
    db: db
}