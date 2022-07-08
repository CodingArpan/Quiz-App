const startquiz = document.querySelector('.startquiz');
const startbtn = startquiz.querySelector('.startbtn');
startbtn.addEventListener('click', () => {
    startquiz.style.display = 'none';
    document.querySelector('.quizquestion').style.display = 'block';
    generatequestion()

})

const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        answer: "4. all of the above",
    },
    {
        questionText:
            "String values must be enclosed within _____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes",
    },
    {
        questionText:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. //console.log",
        ],
        answer: "4. //console.log",
    },
    {
        questionText:
            "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break",
    },
];

let quesnum = 0;

let userans = [];
let timer;
let timerfunc = () => {
    let time = 10;
    document.querySelector('.timer').innerHTML = time;
    timer = setInterval(() => {
        // clearInterval(timer)
        time--;
        document.querySelector('.timer').innerHTML = time;
    }, 1000);
}

const collectans = (val) => {
    clearInterval(timer)

    userans.push(val)
    //console.log(userans)
    generatequestion()
}

const calculatemarks = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        const evaluate = questions[i].answer.includes(userans[i]);
        if (evaluate) { score++ }
    }
    return score;
}



let timeout

const generatequestion = () => {
    clearInterval(timeout)
    if (questions.length > quesnum) {
        let options = '';



        clearInterval(timer)
        timerfunc()


        for (const item of questions[quesnum].options) {
            //console.log(item)
            options += `<p class="option" data-ans=${item.replace('.', '')} onclick="collectans(this.dataset.ans)" >${item} </p>`
        }

        const newques = `
            <span>Question ${quesnum + 1} of 10</span>
            <h3>${questions[quesnum].questionText}</h3>
            ${options}`;
        document.querySelector('.question').innerHTML = newques
        quesnum += 1;

        timeout = setInterval(() => {

            //console.log('interval cleared')
            collectans(0);
        }, 10000);




    } else {
        clearInterval(timer)
        clearInterval(timeout)
        //console.log('end')
        const scoreboard = document.querySelector('.scoreboard');
        scoreboard.style.display = "block";
        document.querySelector('.quizquestion').style.display = 'none';
        scoreboard.querySelector('.num').innerHTML = calculatemarks();
        document.querySelector('.timer').innerHTML = '00';
    }

}


const submitscore = document.querySelector('.name');
submitscore.addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const score = {
        name: name,
        score: calculatemarks()
    }
    const data = JSON.parse(window.localStorage.getItem('quizscores'));
    if (data) {
        data.push(score)
        window.localStorage.setItem('quizscores', JSON.stringify(data));
    } else {
        window.localStorage.setItem('quizscores', JSON.stringify([score]));

    }
    const scoreboard = document.querySelector('.scoreboard');
    scoreboard.style.display = "none";
    document.querySelector('.startquiz').style.display = 'block';
})

document.querySelector('.highscore').addEventListener('click', () => {
    document.querySelector('.startquiz').style.display = 'none';
    document.querySelector('.quizquestion').style.display = 'none';
    document.querySelector('.scoreboard').style.display = 'none';
    document.querySelector('.highscoredetails').style.display = 'block';
    quesnum = 0;
    userans = [];
    timer = '';
    timeout = '';
    const data = JSON.parse(window.localStorage.getItem('quizscores'));
    let allscrors = ''
    if (data) {
        for (const user of data) {

            allscrors += `<p>User : ${user.name} / Score: ${user.score}</p>`

        }
    } else {
        allscrors = `<p>No data to Show</p>`
    }
    document.querySelector('.userdetails').innerHTML = allscrors;

})

document.querySelector('.back').addEventListener('click', () => {
    document.querySelector('.highscoredetails').style.display = 'none';
    document.querySelector('.startquiz').style.display = 'block';

})
document.querySelector('.cler').addEventListener('click', () => {
    document.querySelector('.highscoredetails').style.display = 'none';
    document.querySelector('.startquiz').style.display = 'block';
    window.localStorage.removeItem('quizscores');
})