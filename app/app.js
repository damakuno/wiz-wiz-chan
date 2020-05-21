const model = require('../models/model.js');


class User {
    constructor(params) {
        this.userId = params.userId;
        this.firstname = params.firstname;
        this.lastname = params.lastname;
        this.username = params.username;
        this.email = params.email;
        this.password = params.password;
        this.gender = params.gender;
        this.createdOn = params.createdOn;
        this.country = params.country;
    }
    save() {
        //something like db.users.save(this.whatever)
    }
    delete() {
        // something like db.users.delete(this.userId);
    }
}

class RoomUser extends User {
    constructor(params, roomId) {
        super(params);
        this.score = 0;
        this.answers = [];
        this.roomId = 0;
    }
    addScore() {
        this.score += 1
    }
    appendAnswer(answer) {
        this.answers.push(answer);
    }

    save() {
        //write code to save this info back into db
    }
}

class Game {
    constructor(params) {
        this.roomId = 0;
        this.hostUserId = 0;
        this.roomUserIds = [];
        this.quizSetId = 0;
        this.quizSet = null;
        this.createdOn = null;        
    }

    load(id) {
        return new Promise((res, rej) => {
            model.db.all('SELECT * FROM game WHERE roomId = ?', [id],
                (err, rows) => {
                    if (err) {
                        rej(err);
                    }
                    if (rows[0]) {
                        Object.assign(this, rows[0]);
                        let qs = new QuizSet();
                        qs.load(this.quizSetId).then(val => {
                            this.quizSet = val;
                            res(this);
                        }).catch(err => {
                            rej(err);
                        });
                    }
                }
            );
        });
    }

    save() {
        // write code to save in database
    }

    delete() {
        // write code to delete in database (note: might need to delete related items in other tables too)
    }
}

class QuizSet {
    constructor(params) {
        this.quizSetId = 0;
        this.createdByUserId = 0; // link to User
        this.quizName = '';
        this.quizDescription = '';
        this.createdOn = null
        this.questions = [];
    }
    load(id) {
        return new Promise((res, rej) => {
            model.db.all('SELECT * FROM quizset WHERE quizSetId = ?', [id],
                (err, rows) => {
                    if (err) {
                        rej(err);
                    }
                    if (rows[0]) {
                        Object.assign(this, rows[0]);
                        model.db.all('SELECT questionId FROM quizquestions WHERE quizSetId = ?', [id],
                            (err, rows) => {
                                if (err) {
                                    rej(err);
                                }
                                let promises = [];
                                rows.forEach(row => {
                                    let qq = new QuizQuestion()
                                    promises.push(qq.load(row.questionId));
                                });

                                Promise.all(promises).then((values) => {
                                    values.forEach(value => {
                                        this.questions.push(value);
                                    });
                                    res(this);
                                }).catch(err => console.log(err));
                            });

                    }
                });
        });
    }

    save() {

    }

    delete() {

    }
}

class QuizQuestion {
    constructor(params) {
        this.quizSetId = 0; //link to QuizSet
        this.questionId = 0;
        this.number = 0;
        this.content = '',
            this.correct_answer_index = 0;
        this.answers = [];
        //should be an array of answers, can just be strings        
        this.questionDuration = 0;
        this.createdOn = null;
    }
    load(id) {
        return new Promise((res, rej) => {
            model.db.all('SELECT * FROM quizquestions WHERE questionId = ?', [id],
                (err, rows) => {
                    if (err) {
                        rej(err);
                    }
                    if (rows[0]) {
                        Object.assign(this, rows[0]);
                        // get answers
                        model.db.all('SELECT * FROM quizanswers WHERE questionId = ?', [id],
                            (err, rows) => {
                                if (err) {
                                    rej(err);
                                }
                                this.answers = rows;
                                res(this);
                            });
                    }
                }
            );
        });
    }

    save() {

    }

    delete() {

    }
}


module.exports = {
    Game: Game,
    User: User,
    RoomUser: RoomUser,
    QuizSet: QuizSet,
    QuizQuestion: QuizQuestion
}