let Game;

$(document).ready(function () {
    M.AutoInit()
    $('.carousel').carousel();
    $.ajax({
        url: '/games/1',
        type: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            Game = data;
            console.dir(Game);
            Question.currentNumber = 1;
            Question.numberOfQuestions = data.quizSet.questions.length;
            Question.start();
        }
    });
});

let Question = {
    currentNumber: 1,
    currentQuestion: null,
    numberOfQuestions: 0,
    timerTick: 0,
    next: () => {
        let selector = `#card-${Question.currentNumber}`;
        if ($(selector)) {
            console.log(selector);
            $(`#card-${Question.currentNumber}`).fadeOut('slow', () => {
                Question.currentNumber += 1;
                $(`#card-${Question.currentNumber}`).fadeIn();
                Question.currentQuestion = Game.quizSet.questions[Question.currentNumber - 1];
            });
        }
    },
    start: () => {
        Question.currentQuestion = Game.quizSet.questions[Question.currentNumber - 1];
        Question.timerTick = Question.currentQuestion.questionDuration;  
        $('.timer').text(Question.timerTick);
    }
}