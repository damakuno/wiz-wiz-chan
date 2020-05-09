const model = require('../models/model.js');


class User {
    constructor(params) {
        this.userId = params.userId,
            this.firstname = params.firstname,
            this.lastname = params.lastname,
            this.username = params.username,
            this.email = params.email,
            this.password = params.password,
            this.gender = params.gender,
            this.createdOn = params.createdOn,
            this.country = params.country
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
        this.score = 0,
            this.answers = [],
            this.roomId = roomId //link to Game (with roomId)
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
        this.roomId = params.roomId,
            this.hostUserId = params.hostUserId,
            this.roomUserIds = params.roomUserIds, //should be an array
            this.quizSetId = params.quizSetId, // link to QuizSet
            this.createdOn = params.createdOn ?
                params.createdOn : Date.now()
    }

    load(id) {

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
        this.name = '';
        this.description = '';
        this.createdOn = null
        this.questions = [];
    }

    load(id) {

    }

    save() {

    }

    delete() {

    }
}

class QuizQuestions {
    constructor(params) {
        this.quizSetId = 0; //link to QuizSet
        this.questionId = 0;
        this.number = 0;
        this.content = '',
            this.correct_answer_index = 0;
        this.answers = [];
        //should be an array of answers, can just be strings
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
                        let question = rows[0];         
                        Object.assign(this, question);
                        // get answers
                        model.db.all('SELECT * FROM quizanswers WHERE questionId = ?', [id],
                        (err, rows) => {
                            if(err) {
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
    QuizQuestions: QuizQuestions
}