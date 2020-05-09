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
        this.quizSetId = params.quizSetId,
            this.createdByUserId = params.createdByUserId, // link to User
            this.name = params.name,
            this.description = params.description,
            this.createdOn = params.createdOn ?
                params.createdOn : Date.now()
        this.questions = params.questions ?
            params.questions : []
        //this should be an array of QuizQuestions
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
        this.quizSetId = params.quizSetId, //link to QuizSet
            this.questionId = params.questionId,
            this.number = params.number,
            this.content = params.content,
            this.correct_answer_index = params.correct_answer_index ?
                params.correct_answer_index : 0;
        this.answers = params.answers ?
            params.answers : []
        //should be an array of answers, can just be strings
        this.createdOn = params.createdOn ?
            params.createdOn : Date.now()
    }

    load(id) {
        
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