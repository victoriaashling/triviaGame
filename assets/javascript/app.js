var triviaQuestions = [
    {
        question: "What's my mother's middle name?",
        answers: ["Mary", "Ashling", "Maria", "Graham"],
        correct: "Mary",
        answerMessage: "My mother's middle name is Mary."
    },
    {
        question: "What is the small black dog's name?",
        answers: ["Thantos", "Smokey", "Ollie", "Lillie"],
        correct: "Smokey",
        answerMessage: "The small black dog's name is Smokey."
    },
    {
        question: "What color are the cat's eyes?",
        answers: ["Brown and Yellow", "Green and Yellow", "Brown and Blue", "Green and Blue"],
        correct: "Green and Blue",
        answerMessage: "The cat's eyes are green and blue."
    },
    {
        question: "What is mom currently knitting?",
        answers: ["socks", "a sweater", "a baby blanket", "a scarf"],
        correct: "a baby blanket",
        answerMessage: "Mom is currently knitting a baby blanket."
    },
    {
        question: "Which of Elizabeth Bennet's sisters elopes with the disastrously dashing Mr. Wickham in Pride and Prejudice?",
        answers: ["Lydia", "Jane", "Mary", "Kitty"],
        correct: "Lydia",
        answerMessage: "Lydia Bennet is the sister who runs off with Mr. Wickham."
    }
]


var currentQuestion;
var currentCorrect;
var currentMessage;

var timeDiv = $("#time-remaining");
var questionDiv = $("#question");
var answersDiv = $("#answers");
var restartButton = $("#restart");

var correctAnswers;
var incorrectAnswers;
var unanswered;

var count;
var timer;


function initializeGame() {
    restartButton.hide();
    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    unanswered = 0;
    resetCount();
    displayQuestion();
};

function resetCount() {
    count = 5;
    timer = setInterval(timerFunc, 1000);
    timeDiv.text("Time Remaining: " + count);
};

function displayQuestion() {
    var workingQ = triviaQuestions[currentQuestion];

    currentCorrect = workingQ.correct;
    currentMessage = workingQ.answerMessage;

    questionDiv.text(workingQ.question);
    answersDiv.empty();
    
    for (var i = 0; i < workingQ.answers.length; i++) {
        var a = $("<button>");
        a.addClass("answerChoice")
        a.attr("data-name", workingQ.answers[i]);
        a.text(workingQ.answers[i]);
        a.appendTo("#answers");
    }
    
    currentQuestion++;
};

function gameOver() {
    clearInterval(timer);
    
    timeDiv.empty();
    questionDiv.text("Game Over");
    answersDiv.html("Correct: " + correctAnswers + "<br>" + "Incorrect: " + incorrectAnswers + "<br>" + "Unanswered: " + unanswered);
    
    restartButton.show();
};

function timerFunc() {
    if (count > 1) {
        count--;
        timeDiv.text("Time Remaining: " + count);
    }
    else {
        unanswered++;
        questionDiv.text("Time's Up!");
        displayAnswer();
    }
};

function rightORwrong() {
    var userAnswer = $(this).attr("data-name");
    
    if (userAnswer == currentCorrect) {
        questionDiv.text("Correct!");
        correctAnswers++;
    }
    else {
        questionDiv.text("Wrong!");
        incorrectAnswers++;
    }

    displayAnswer();
};

function displayAnswer() {
    clearInterval(timer);
    
    timeDiv.empty();
    answersDiv.text(currentMessage);

    setTimeout(function() {
        
        if (currentQuestion < triviaQuestions.length) {
            displayQuestion();
            resetCount();
        }
        else {
            gameOver();
        }

    }, 3000);
};



initializeGame();

$(document).on("click", ".answerChoice", rightORwrong);
$(document).on("click", "#restart", initializeGame);

