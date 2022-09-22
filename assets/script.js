var startButton = document.querySelector("#start");
var highscore = localStorage.getItem("highscore");
var timeLeftDisplay = document.querySelector("#timeLeft");
var questionDisplay = document.querySelector("#question");
var HSList = document.querySelector(".highscoreList");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var resultDisplay = document.querySelector("#result");
var clearScore = document.querySelector(".clearScoreDiv");
var viewHS = document.querySelector("#highscore");
var questionCount = 1;
var scoreCount = 0;

function renderHS() {
    console.log(highscore);
    if (highscore == null) {
        highscore = [];
        console.log(highscore);
    } else {
    highscore = JSON.parse(localStorage.getItem("highscore"));
    }
  }

function question1(){
    resultDisplay.textContent = "";
    questionDisplay.textContent = "1. Commonly used data types DO NOT include";
    answer1.innerHTML = ('<button id="answerWrong1">1. String </button>');
    answer2.innerHTML = ('<button id="answerWrong2">2. Boolean </button>');
    answer3.innerHTML = ('<button id="answerCorrect">3. Alerts </button>');
    answer4.innerHTML = ('<button id="answerWrong3">4. Numbers </button>');
    startButton.remove();
}

function question2(){
    questionDisplay.textContent = "2. The condition in an if/else statement is enclosed within ______.";
    answer1.innerHTML = ('<button id="answerWrong1">1. Quotes </button>');
    answer2.innerHTML = ('<button id="answerCorrect">2. Curly Brackets </button>');
    answer3.innerHTML = ('<button id="answerWrong2">3. Parentheses </button>');
    answer4.innerHTML = ('<button id="answerWrong3">4. Square Brackets </button>');
}

function question3(){
    questionDisplay.textContent = "3. Arrays in JavaScript can be used to store ______.";
    answer1.innerHTML = ('<button id="answerWrong1">1. Numbers and Strings </button>');
    answer2.innerHTML = ('<button id="answerWrong2">2. Other Arrays </button>');
    answer3.innerHTML = ('<button id="answerWrong3">3. Booleans </button>');
    answer4.innerHTML = ('<button id="answerCorrect">4. All of the Above </button>');
}

function question4(){
    questionDisplay.textContent = "4. String values must be enclosed within ______ when being assigned to variables";
    answer1.innerHTML = ('<button id="answerWrong1">1. Commas </button>');
    answer2.innerHTML = ('<button id="answerWrong2">2. Curly Brackets </button>');
    answer3.innerHTML = ('<button id="answerCorrect">3. Quotes </button>');
    answer4.innerHTML = ('<button id="answerWrong3">4. Parentheses </button>');
}

function question5(){
    questionDisplay.textContent = "5. A very useful tool used during development and debugging for printing content to the debugger is";
    answer1.innerHTML = ('<button id="answerWrong1">1. JavaScript </button>');
    answer2.innerHTML = ('<button id="answerWrong2">2. Terminal/Bash </button>');
    answer3.innerHTML = ('<button id="answerWrong3">3. For Loops </button>');
    answer4.innerHTML = ('<button id="answerCorrect">4. console.log </button>');
}

function setTime() {
    var secondsLeft = 60;
    // Sets interval in variable
    document.querySelector("#answerWrong1").addEventListener("click", function(event){
        secondsLeft = secondsLeft - 10;
        alert("Incorrect! 10 seconds deducted. ");
        console.log(secondsLeft);
    });
    document.querySelector("#answerWrong2").addEventListener("click", function(event){
        secondsLeft = secondsLeft - 10;
        alert("Incorrect! 10 seconds deducted. ");
        console.log(secondsLeft);
    });
    document.querySelector("#answerWrong3").addEventListener("click", function(event){
        secondsLeft = secondsLeft - 10;
        alert("Incorrect! 10 seconds deducted. ");
        console.log(secondsLeft);
    });

    document.querySelector("#answerCorrect").addEventListener("click", function(event){
        event.preventDefault();
        alert("Correct!");
        questionCount++;
        scoreCount = scoreCount + secondsLeft;
        clearInterval(timerInterval);
        if (questionCount == 2){
            question2();
            setTime();
        }
        else if (questionCount == 3){
            question3();
            setTime();
        }
        else if (questionCount == 4){
            question4();
            setTime();
        }
        else if (questionCount == 5){
            question5();
            setTime();
        }
        else if (questionCount ==6){
            questionDisplay.textContent = "All Done!";
            resultDisplay.textContent = "Your Score is: " + scoreCount;
            answer1.innerHTML = ('<form> <label for="name">Name: </label> <input type="text" id="name"> <button id="submitBut">Submit</button> </form>');
            answer2.innerHTML = ('');
            answer3.innerHTML = ('');
            answer4.innerHTML = ('');
            document.getElementById("submitBut").addEventListener("click", function(event){
                event.preventDefault();
                renderHS();
                var newHS = document.getElementById("name").value + " - " + scoreCount;
                console.log(newHS);
                highscore.push(newHS);
                localStorage.setItem("highscore", JSON.stringify(highscore));

                for (let i = 0; i < highscore.length; i++) {
                    var hs = highscore[i];
                    var li = document.createElement("li");
                    li.textContent = hs;
                    li.setAttribute("data-index", i);
                    HSList.appendChild(li);
                }
                clearScore.innerHTML = ('<button id="deleteHS">Clear Highscore</button>');

                document.getElementById("deleteHS").addEventListener("click", function(event){
                    localStorage.setItem("highscore", "[]");
                    HSList.textContent = [];
                });
            });
            
        }
    });

    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeLeftDisplay.textContent = secondsLeft + " seconds remaining";

    if(secondsLeft <= 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        questionCount++;
        if (questionCount == 2){
            question2();
            setTime();
        }
        else if (questionCount == 3){
            question3();
            setTime();
        }
        else if (questionCount == 4){
            question4();
            setTime();
        }
        else if (questionCount == 5){
            question5();
            setTime();
        }
      }
    }
    , 1000);}

resultDisplay.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds! ";

questionDisplay.textContent = "Coding Quiz Challenge";

startButton.addEventListener("click", function(event){
    event.preventDefault();
    HSList.textContent = [];
    clearScore.innerHTML = ('');
    question1();
    setTime();
});

viewHS.addEventListener("click",function(event){
    event.preventDefault();
    answer1.innerHTML = ('');
    answer2.innerHTML = ('');
    answer3.innerHTML = ('');
    answer4.innerHTML = ('');
    renderHS();
    for (let i = 0; i < highscore.length; i++) {
        var hs = highscore[i];
        var li = document.createElement("li");
        li.textContent = hs;
        li.setAttribute("data-index", i);
        HSList.appendChild(li);
    }
    clearScore.innerHTML = ('<button id="deleteHS">Clear Highscore</button>');
    questionCount = 7;
    questionDisplay.textContent = "Please refresh the page to start quiz.";
    startButton.remove();
    document.getElementById("deleteHS").addEventListener("click", function(event){
        localStorage.setItem("highscore", "[]");
        HSList.textContent = [];
    });
});