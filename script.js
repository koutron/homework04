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

//Clear out the welcome screen
var beginBtn = document.getElementById('begin');
beginBtn.addEventListener('click', function () {
    document.getElementById('welcome').setAttribute('style', 'display: none');
    document.getElementById('begin').setAttribute('style', 'display: none');
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
        if (data[idx].ans[event.target.value].isCorrect === true) {
            alert('Correct!');
        } else {
            alert('WRONG!');
        }
        
        populateQandA(idx+1);

    });
}