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
            console.log(data);
            Question.currentNumber = 1;
            Question.numberOfQuestions = data.quizSet.questions.length;
            setTimeout(() => {Question.next()}, 1000);
        }
    });
});

let Question = {
    currentNumber: 1,
    numberOfQuestions: 0,
    next: () => {
        let selector = `#card-${Question.currentNumber}`;
        if ($(selector)) {
            console.log(selector);
            $(`#card-${Question.currentNumber}`).fadeOut('slow', () => {
                Question.currentNumber += 1;
                $(`#card-${Question.currentNumber}`).fadeIn();
            });
        }
    }
}