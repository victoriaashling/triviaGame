var triviaQuestions = [
    {
        question: "Who is the youngest von Trapp child in The Sound of Music?",
        answers: ["Liesl", "Marta", "Gretl", "Louisa"],
        correct: "Gretl",
        answerMessage: "The youngest von Trapp child in Gretl."
    },
    {
        question: "Who does Jane Eyre fall in love with?",
        answers: ["Mr. Brocklehurst", "Mr. Rochester", "Mr. Collins", "Mr. Thornton"],
        correct: "Mr. Rochester",
        answerMessage: "Jane Eyre falls in love with Mr. Rochester."
    },
    {
        question: "In what key does Lina Lamont (Kathy Seldon) sing the titular song at the end of Singing in the Rain?",
        answers: ["A flat", "D sharp", "C", "E flat"],
        correct: "A flat",
        answerMessage: "Lina Lamont (Kathy Seldon) sings in A flat."
    },
    {
        question: "Which of Elizabeth Bennet's sisters elopes with the disastrously dashing Mr. Wickham in Pride and Prejudice?",
        answers: ["Lydia", "Jane", "Mary", "Kitty"],
        correct: "Lydia",
        answerMessage: "Lydia Bennet is the sister who runs off with Mr. Wickham."
    },
    {
        question: "Which man stars in The Court Jester?",
        answers: ["Gregory Peck", "Howard Keel", "Gene Kelly", "Danny Kaye"],
        correct: "Danny Kaye",
        answerMessage: "Danny Kaye stars in The Court Jester."
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

