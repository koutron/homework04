var data = [
    {
        ques: "The practice of bee keeping dates back at least _____ years.", ans: [{ option: "1000", isCorrect: false }, { option: "2500", isCorrect: false }, { option: "3000", isCorrect: false }, { option: "4500", isCorrect: true }]
    },
    {
        ques: "Approximately _____ of the food we eat is the result of honey bee pollination?", ans: [{ option: "1/2", isCorrect: false }, { option: "1/3", isCorrect: true }, { option: "1/4", isCorrect: false }, { option: "1/5", isCorrect: false }]
    },
    {
        ques: "A productive queen can lay up to _____ eggs per day?", ans: [{ option: "500", isCorrect: false }, { option: "1000", isCorrect: false }, { option: "2000", isCorrect: false }, { option: "2500", isCorrect: true }]
    },
    {
        ques: "A single bee will produce only about _____ of a teaspoon of honey in its lifetime?", ans: [{ option: "1/2", isCorrect: false }, { option: "1/6", isCorrect: false }, { option: "1/12", isCorrect: true }, { option: "1/16", isCorrect: false }]
    }
]


//For timer.  Putting it in the global space as other functions will need to access the secondsLeft variable.
var secondsLeft = 100;




//Clear out the welcome screen
var beginBtn = document.getElementById('beginBtn');
beginBtn.addEventListener('click', function () {
    document.getElementById('welcome').setAttribute('style', 'display: none');
    document.getElementById('beginBtn').setAttribute('style', 'display: none');
    //Kickoff the process
    var timeEl = document.getElementById("timer");
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            gameOver();
        }

    }, 1000);
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
        

        var tableDataInitials = document.createElement("td");
        tableDataInitials.textContent = initials;
        newRow.append(tableDataInitials);
        
        localStorage.setItem("highScore", secondsLeft);
        localStorage.setItem("initials", initials);
        
    });
}

//highScore();
