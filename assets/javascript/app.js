var triviaQuestions = [
    {
        question: "Who is the youngest von Trapp child in <em>The Sound of Music</em>?",
        answers: ["Liesl", "Marta", "Gretl", "Louisa"],
        correct: "Gretl",
        answerMessage: "The youngest von Trapp child in Gretl."
    },
    {
        question: "In what key does Lina Lamont (Kathy Seldon) sing the titular song at the end of <em>Singing in the Rain</em>?",
        answers: ["A flat", "D sharp", "C", "E flat"],
        correct: "A flat",
        answerMessage: "Lina Lamont (Kathy Seldon) sings in A flat."
    },
    {
        question: "Which man stars in <em>The Court Jester</em>?",
        answers: ["Gregory Peck", "Howard Keel", "Gene Kelly", "Danny Kaye"],
        correct: "Danny Kaye",
        answerMessage: "Danny Kaye stars in <em>The Court Jester</em>."
    },
    {
        question: "In <em>Kismet</em>, Marcina wants to plant what kind of flower in her garden?",
        answers: ["Hyacinths", "Lillies", "Orange Blossoms", "Roses"],
        correct: "Hyacinths",
        answerMessage: "Marcina wants to plant Hyacinths (or perhaps Oleander)."
    },
    {
        question: "Which famous jazz musician makes a cameo appearance in <em>Hello, Dolly!</em>?",
        answers: ["Sidney Bechet", "Louis Armstrong", "Benny Goodman", "Duke Ellington"],
        correct: "Louis Armstrong",
        answerMessage: "Louis Armstrong appears in the titular song of <em>Hello, Dolly!</em>"
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

    questionDiv.html(workingQ.question);
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

