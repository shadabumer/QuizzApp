

function Question (quesNo, question, answers, option) {
    this.quesNo = quesNo,
    this.question = question,
    this.answers = answers,
    this.option = option
};

var q1 = new Question(1, "Inside which HTML element do we put the JavaScript?", ['&lt scripting &gt', '&lt script &gt', '&lt js &gt', '&lt javascript &gt'], 1);
var q2 = new Question(2, "Where is the correct place to insert a JavaScript?", ['&lt head &gt section', '&lt body &gt section', 'both', 'none'], 2);
var q3 = new Question(3, "What is the correct syntax for referring to an external script called \"xxx.js\"?", ['&lt script href="xxx.js"&gt', '&lt script name="xxx.js"&gt', '&lt a href="xxx.js"&gt', '&lt script src="xxx.js"&gt'], 3);
var q4 = new Question(4, "What does HTML stand for?", ['Home Tool Markup Language', 'Hyper Text Markup Language', 'Hyper Link Markup Language', 'Home Text Markup Link'], 1);
var q5 = new Question(5, "Choose the correct HTML element for the largest heading:", ['&lt h1 &gt', '&lt heading &gt', '&lt h6 &gt', '&lt head &gt'], 0);

var questionSet = [q1, q2, q3, q4, q5];

const qNum = document.querySelector('#qnum');
const quesTitle = document.querySelector('.card-title');
let optionSection = document.querySelector('#option-section');
let next = document.querySelector('.btn');

function generateElement(num) {
    qNum.innerText = num + 1;
    quesTitle.innerText = questionSet[num].question;

    for(let option in questionSet[num].answers) {
        let checkTemplate = `<div class="custom-control custom-radio">
                                <input type="radio" id="customRadio${option+1}" name="customRadio" class="custom-control-input is-checked" value="${option}">
                                <label class="custom-control-label " for="customRadio${option+1}">${String(questionSet[num].answers[option])}</label>
                            </div>`
        optionSection.insertAdjacentHTML('beforeend', checkTemplate)
    }
    next.setAttribute('disabled', true);

    checked();  
}

function checked() {
    const isChecked  = document.querySelectorAll('.is-checked');
    isChecked.forEach(element => {
        element.addEventListener('change', function(e) {
            if(this.checked) {
                next.removeAttribute('disabled')
            } 
        })
    });  
}

var n = 1;
var userAnswers = [];

function calculateScore() {
    let values = document.querySelectorAll('.is-checked');
    for (let v of values) {
        if (v.checked) {
            userAnswers.push(v.value);
        }
    }
    console.log(userAnswers);
    let score = 0;
    
        for (var i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i] == questionSet[i].option)
                score++;
        }
        if (n > 4) {
            window.location.href = `./score.html?score=${score}`;
        }
    console.log(score);  
}
function nextElement() {
    calculateScore();
    optionSection.innerHTML = "";
    generateElement(n);
    n++;
}

generateElement(0);

next.addEventListener('click', nextElement);
