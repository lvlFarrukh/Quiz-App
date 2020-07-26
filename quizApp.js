var title, max_time, tQ, tQuestions = [];


function setQ(elm){
    // console.log('working')
    var div = document.getElementById('setQ-div')
    // console.log(div)
    div.style.display = "block";
    elm.style.display = 'none';
}

function getvals() {
    var val_div = document.getElementById('setQ-div');
    window.title = val_div.childNodes[3].value;
    window.tQ = parseInt(val_div.childNodes[5].value);
    window.max_time = parseInt(val_div.childNodes[7].value);
    setQuestion();
}

function setQuestion() {
    document.getElementById('setQ-div').style.display = "none";
    document.getElementById('takeQuestion').style.display = "block";    
}

function questions(question, options, correctOptions, answer) {
    this.question = question,
    this.options = options,
    this.answer = undefined
    this.correctOptions = correctOptions
    this.status = function(){
        if (this.answer == this.correctOptions){
            return 1;
        }
        else {
            return 0;
        }
    }
}

function addQuestion() {
    var q = document.getElementById('takeQuestion');
    if (tQuestions.length != tQ){
        tQuestions.push(new questions(q.childNodes[3].value, [q.childNodes[5].value, q.childNodes[7].value, q.childNodes[9].value, q.childNodes[11].value], q.childNodes[13].value)); 
        console.log(tQuestions);
        for (let i = 0; i < q.childNodes.length; i++) {
            q.childNodes[i].value = '';
        }

        if (tQuestions.length == tQ){
            document.getElementById('setQ-div').style.display = 'none';
            var title_div = document.getElementById('sec-title');
            title_div.childNodes[1].innerHTML = title;
            title_div.childNodes[3].innerHTML = 'Total Question: '+tQ;
            title_div.style.display = "block";
            var btn = document.getElementById('starterBtn');
            btn.setAttribute('onclick', 'startQuiz()');
            btn.innerHTML = 'Start Quiz';
            btn.style.display = "block";
            document.getElementById('takeQuestion').style.display = "none";
        }
    }

}
// function setQuestions() {
//     
//     for (let i = 0; i < tQ; i++) {
//         tQuestions[i] = new questions('What is my name', ['farrukh','farru','farr','fa'], 'farrukh'); 
//     }
//     document.getElementById('setQ-div').style.display = 'none';
//     var title_div = document.getElementById('sec-title');
//     title_div.childNodes[1].innerHTML = title;
//     title_div.childNodes[3].innerHTML = 'Total Question: '+tQ;
//     title_div.style.display = "block";
//     var btn = document.getElementById('starterBtn');
//     btn.setAttribute('onclick', 'startQuiz()');
//     btn.innerHTML = 'Start Quiz';
//     btn.style.display = "block";
// }

function startQuiz() {
    console.log(tQ)
    // window.location.href = 'quizQuestions.html';
    document.getElementById('sec-title').style.display = 'none';
    document.getElementById('starterBtn').style.display = 'none';
    document.getElementById('timer-div').style.display = 'block';
    document.getElementById('section-questions').style.display = 'block';

    m = max_time-1;
    // console.log(max_time);
    min.innerHTML = max_time-1;
    
    interval = setInterval(timer, 1000);
    showQuestions();
}
 
// console.log(tQuestions);
var time = document.getElementById('timer-div');
// var max_time = 15;

var sec = time.childNodes[1].childNodes[5];
var min = time.childNodes[1].childNodes[3];
var hour = time.childNodes[1].childNodes[1];
// console.log(min)
var interval;

var s = 59, m = 59, h = 0; 
// console.log(max_time);
sec.innerHTML = 59;


// Timer Function that show time in navbar
function timer() {
    s--;
    sec.innerHTML = s;
    if (m!=0 && s == 0){
        m--;
        min.innerHTML = m;
        s = 60;
    }
    else if (m == 0 && s == 0){
        if (h != 0){
            h--;
            sec.innerHTML = '00';
            min.innerHTML = min;
            // hour.innerHTML = min;
            sec = 0;
        }
        else {
            
            alert('Time up');
            // window.location.href = 'quizApp.html';
            showGrades();
        }
    }
}


// function that show question and options
var seq = document.getElementById('qNo');
var ques = document.getElementById('question').childNodes[3];
var options = document.getElementById('options');
var pBtn = document.getElementById('pBtn');
var nBtn = document.getElementById('nBtn');
var sqNo = 0;

// console.log(tQuestions.length)

function showQuestions() {
    sqNo++;
    if (sqNo <= tQuestions.length){
        seq.innerHTML = sqNo;
        ques.innerHTML = tQuestions[sqNo-1].question;

        options.innerHTML = '';
        // console.log(options.childNodes)
        for (let i = 0; i < 4; i++) {
            var inp = document.createElement('input');
                inp.setAttribute('type', 'radio');
                inp.setAttribute('name', 'opts');
                inp.setAttribute('id', tQuestions[sqNo-1].options[i]);
                inp.setAttribute('onclick', 'checkAnswer(this)')   
                if (tQuestions[sqNo-1].options[i] == tQuestions[sqNo-1].answer){
                    inp.checked = true;
                    // console.log(inp);
                }
            
            var optText = document.createElement('p');
                optText.appendChild(document.createTextNode(tQuestions[sqNo-1].options[i]));

            options.appendChild(inp);
            options.appendChild(optText); 
            options.appendChild(document.createElement('br'));

        }

        if (sqNo == 1)
            pBtn.disabled = true;
        else
            pBtn.disabled = false;
        
        nBtn.disabled = true;
        
    }
}


function checkAnswer(elm) {
    if (sqNo != tQuestions.length)
        nBtn.disabled = false;
    
    if (sqNo == tQuestions.length) {
        nBtn.setAttribute("onclick", 'showGrades()');
        nBtn.innerHTML = 'Finish';
        nBtn.disabled = false;
    }
    // console.log(sqNo)
    tQuestions[sqNo-1].answer = elm.getAttribute('id');
}

function previousQ() {
    sqNo -= 2 ;
    // console.log(tQuestions[sqNo].answer)
    showQuestions();
}

function tCAnswer() {
    var total = 0
    for (let i = 0; i < tQuestions.length; i++) {
        if (tQuestions[i].answer == tQuestions[i].correctOptions) {
            total += 1
        }
    }
    return total;
}

function showGrades() {
    sec.innerHTML = '00';
    min.innerHTML = '00';
    clearInterval(interval);
    document.getElementById('section-questions').style.display = "none";
    var wdiv = document.getElementById('showGrades');
    wdiv.childNodes[1].innerHTML = title;
    wdiv.childNodes[3].innerHTML = 'Total Correct Answer: '+tCAnswer()+' out of '+tQuestions.length;
    wdiv.childNodes[5].innerHTML = "Percentage: "+(((tCAnswer()/tQuestions.length)*100).toFixed(2));
    wdiv.style.display = "block";
}
