var data = [
    {
        ques: "What is Kouros's favorite color?", ans: [{ option: "blue", isCorrect: false }, { option: "green", isCorrect: false }, { option: "red", isCorrect: false }, { option: "black", isCorrect: true }]
    },
    {
        ques: "What is Kouros's favorite website?", ans: [{ option: "Google", isCorrect: false }, { option: "Yahoo", isCorrect: false }, { option: "Microsoft", isCorrect: false }, { option: "Bing", isCorrect: true }]
    },
    {
        ques: "What is Kouros's favorite food?", ans: [{ option: "Burgers", isCorrect: true }, { option: "Tacos", isCorrect: false }, { option: "Pizza", isCorrect: false }, { option: "Sushi", isCorrect: false }]
    }
]

//Timer Functionality.  Putting it in the global space as other functions will need to access the secondsLeft variable.
var secondsLeft = 100;
var timeEl = document.getElementById("timer");
var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
        gameOver();
    }

}, 1000);


//Clear out the welcome screen
var beginBtn = document.getElementById('beginBtn');
beginBtn.addEventListener('click', function () {
    document.getElementById('welcome').setAttribute('style', 'display: none');
    document.getElementById('beginBtn').setAttribute('style', 'display: none');
    //Kickoff the process
    populateQandA(0);

});

function populateQandA(idx) {
    document.getElementById("question").textContent = data[idx].ques;
    document.getElementById("a0").textContent = data[idx].ans[0].option;
    document.getElementById("a1").textContent = data[idx].ans[1].option;
    document.getElementById("a2").textContent = data[idx].ans[2].option;
    document.getElementById("a3").textContent = data[idx].ans[3].option;
    isAnswerCorrect(idx);
}

function isAnswerCorrect(idx) {
    console.log("isAnswerCorrect idx is", idx);
    var answersList = document.getElementById("answersList");
    answersList.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.matches("button")) {
            if (data[idx].ans[event.target.value].isCorrect === true) {
                alert('Correct!');
            } else {
                alert('WRONG!');
                secondsLeft = secondsLeft - 10;
            }
        }
        if (idx == data.length - 1) {
            gameOver();
        } else {
            populateQandA(idx + 1);
        }
    });
}

function gameOver() {
    clearInterval(timerInterval);
    document.getElementById("question").setAttribute('style', 'display: none');
    document.getElementById("answersList").setAttribute('style', 'display: none');
    document.getElementById("timer").setAttribute('style', 'display: none');
    document.getElementById("gameover").textContent = "Game Over!  your score is " + secondsLeft;
    highScore();
}

function highScore() {
    var initialsForm = document.getElementById("initialsForm");
    var highScoreTable = document.getElementById("highscore");

    initialsForm.setAttribute('style', 'display: block');

    var locStorHighScore = localStorage.getItem("highScore");
    var locStorInitials = localStorage.getItem("initials");

    var tableDataHighScore = document.createElement("td");
    tableDataHighScore.textContent = locStorHighScore;
    document.getElementById("tableData").append(tableDataHighScore);

    var tableDataInitials = document.createElement("td");
    tableDataInitials.textContent = locStorInitials;
    document.getElementById("tableData").append(tableDataInitials);



    document.getElementById("submitBtn").addEventListener('click', function (event) {
        event.preventDefault();
        initialsForm.setAttribute('style', 'display: none');
        highScoreTable.setAttribute('style', 'display: table');

        var initials = document.getElementById("initials").value;
        var tableData = document.getElementById("tableData");

        var newRow = document.createElement("tr");
        document.getElementById("highscore").append(newRow);
        var tableDataHighScore = document.createElement("td");
        tableDataHighScore.textContent = secondsLeft;
        newRow.append(tableDataHighScore);
        localStorage.setItem("highScore", secondsLeft);

        var tableDataInitials = document.createElement("td");
        tableDataInitials.textContent = initials;
        newRow.append(tableDataInitials);
        localStorage.setItem("initials", initials);
    });
}

//highScore();
