const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "db.sqlite"), err => {
    if (err) {
        console.log(err);
    }
});

module.exports = {
    init: function init() {
        db.serialize(() => {
            db.run('DROP TABLE game')
            .run('DROP TABLE quizanswers')
            .run('DROP TABLE quizquestions')
            .run('DROP TABLE quizset')
            .run(`CREATE TABLE IF NOT EXISTS game (
                roomId INTEGER PRIMARY KEY AUTOINCREMENT,
                hostUserId INTEGER NULL,
                quizSetId INTEGER NULL,
                createdOn DATETIME DEFAULT CURRENT_TIMESTAMP
                )
             `).run(`CREATE TABLE IF NOT EXISTS quizset (
                quizSetId INTEGER PRIMARY KEY AUTOINCREMENT,
                createdByUserId INTEGER NULL,
                quizName NVARCHAR(500) NULL,
                quizDescription NVARCHAR(4000)  NULL,
                createdOn DATETIME DEFAULT CURRENT_TIMESTAMP
               );
            `).run(`CREATE TABLE IF NOT EXISTS quizquestions (
                questionId INTEGER PRIMARY KEY AUTOINCREMENT,
                quizSetId INTEGER NULL,
                number INTEGER NULL,
                content NVARCHAR(4000) NULL,
                correctAnswerNumber INTEGER,
                questionDuration INTEGER NULL,
                createdOn DATETIME DEFAULT CURRENT_TIMESTAMP
            )`).run(`CREATE TABLE IF NOT EXISTS quizanswers (
                answerId INTEGER PRIMARY KEY AUTOINCREMENT,            
                questionId INTEGER,
                number INTEGER,
                content NVARCHAR(4000) NULL,
                createdOn DATETIME DEFAULT CURRENT_TIMESTAMP
            )`).run(`INSERT INTO game (hostUserId, quizSetId)
            VALUES (1, 1)
             `).run(`INSERT INTO quizset (createdByUserId, quizName, quizDescription)
             VALUES (1, 'Test', 'This is a test quiz')
            `).run(`INSERT INTO quizquestions (quizSetId, number, content, questionDuration, correctAnswerNumber)
                    VALUES (1, 1, 'What is 1 + 1?', 30, 2)
            `).run(`INSERT INTO quizquestions (quizSetId, number, content, questionDuration, correctAnswerNumber)
                VALUES (1, 2, 'What is e^0?', 20, 1)
            `).run(`INSERT INTO quizanswers (questionId, number, content)
            VALUES (1, 1, 'The asnwer is 1')
            `).run(`INSERT INTO quizanswers (questionId, number, content)
            VALUES (1, 2, 'The asnwer is 2')
            `).run(`INSERT INTO quizanswers (questionId, number, content)
            VALUES (2, 1, 'The asnwer is 1')
            `).run(`INSERT INTO quizanswers (questionId, number, content)
                VALUES (2, 2, 'The asnwer is 2')
            `);
        })

        console.log("The Database is initialized");
    },
    db: db
}