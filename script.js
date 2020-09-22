//defining variables
var startButton = document.getElementById("begin");
var scoreDiv = document.getElementById("score-increase");
var score = 0;
var question = document.querySelector("#question-option")
var currentQuestion = 0;
var answerButton = document.querySelector(".answerButton");
var beginTime = 60;
var saveButton = document.getElementById("saveScore");
var username = document.getElementById("username");
var recentScore = JSON.parse(window.localStorage.getItem("recentScore")) || [];
var newList = document.querySelector("#newList");

//creating array of questions
var questions = [
{
    question : "Which of the following is not a Javascript data type?",
    choiceA : "Booleans",
    choiceB : "Strings",
    choiceC : "Numbers",
    choiceD : "DOM",
    correct : "DOM"
},
{
    question : "Which of the following is not an HTML tag?",
    choiceA : "H1",
    choiceB : "Hide",
    choiceC : "Div",
    choiceD : "Section",
    correct : "Hide",
},
{
    question : "Which is used to identify a CSS Id?",
    choiceA : "$",
    choiceB : "*",
    choiceC : "#",
    choiceD : "!",
    correct : "#",
},
{
    question : "What is the current HTML version?",
    choiceA : "27",
    choiceB : "5",
    choiceC : "1.5",
    choiceD : "1.000",
    correct : "5",
},
{
    question : "What is the .concat method used for?",
    choiceA : "inserting a picture of a cat",
    choiceB : "splitting strings",
    choiceC : "adding text to a selected element",
    choiceD : "used to join two or more arrays",
    correct : "used to join two or more arrays",
},
{
    question : "Which operator is used to select an ID in JQuery?",
    choiceA : "&",
    choiceB : "||",
    choiceC : "$",
    choiceD : "~",
    correct: "$",
},
{
    question : "How does one correctly call a Javascript function?",
    choiceA : "functionName();",
    choiceB : "[functionName];",
    choiceC : "!functionName;",
    choiceD : "{functionName[begin]};",
    correct : "functionName();",
}, ]

//function to run quiz
function startQuiz() {
    $("#center").addClass("hide"); 
    $("#button-div").removeClass("hide"); 
    getQuestion();
    timer();
}

startButton.addEventListener("click", startQuiz);

//function to get question
function getQuestion() {
    if (currentQuestion <= questions.length-1) {
        $("#question-option").html(questions[currentQuestion].question);
        $("#choiceA").text(questions[currentQuestion].choiceA);
        $("#choiceB").text(questions[currentQuestion].choiceB);
        $("#choiceC").text(questions[currentQuestion].choiceC);
        $("#choiceD").text(questions[currentQuestion].choiceD);
    } else {
        gameOver();
    }
}

//allows click events to be updated dynamically with jQuery
$(document).on("click", ".answerButton", checkAnswer);

function checkAnswer() {
    var userChoice = $(this)[0].children[0].innerHTML;
    if (userChoice === questions[currentQuestion].correct) {
        score++;
        $("#score-increase").html(score);
    } else {
        beginTime-=10;
    }
    currentQuestion++;
    getQuestion();
}

//create a timer that counts down from 60 
function timer() {
    var startTimer = setInterval(function(){
        beginTime--;
        if (beginTime >= 0) {
            document.getElementById("timer").textContent = beginTime;
        } else {
            document.getElementById("timer").textContent = 0;
        }
        if (beginTime <= 0) {
            clearInterval(startTimer); };
        if (beginTime <= 0) {
            gameOver();
        }
    }, 1000); 
}

//function when game is finished for highscores
function gameOver() {
    $("#quiz").addClass("hide");
    $("#highscore").removeClass("hide");
    let finalScore = score;
    
    $("#finalScore").html(finalScore);
}

//saving score on the button click, hiding and unhiding highscore screens
$("#saveScore").on("click", function() {
    event.preventDefault();
    $("#highscore").addClass("hide");
    $("#high").removeClass("hide");
    saveScore();
});

//saving the score to local storage in an object, sorting score big - small
function saveScore() {
    let user = $("#username").val();

    var scoreList = {
        score2: score,
        user: user 
    }
    console.log(scoreList);
    recentScore.push(scoreList);
    recentScore.sort( (a, b) => b.score2 - a.score2);
    window.localStorage.setItem("recentScore", JSON.stringify(recentScore));
    window.location.href = "#high";
    
}

/*create array of scores then adding them
as list items to high score list*/
    newList.innerHTML = recentScore.map( scoreList => {
        return `<li>${scoreList.user}-${scoreList.score2}</li>`;
    }).join("");
    





