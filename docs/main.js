const startBtn=document.querySelector('.start');
const aboutBtn=document.querySelector('.a-bt');
const practiseBtn=document.querySelector('.p-bt');
const contactBtn=document.querySelector('.c-bt');
const popup=document.querySelector('.info');
const abt=document.querySelector('.abt');
const cbt=document.querySelector('.cbt');
const pbt=document.querySelector('.pbt');
const returnBtn=document.querySelector('.exit-btn');
const aboutRBtn=document.querySelector('.return-btn');
const cRbt=document.querySelector('.re-btn');
const pRbt=document.querySelector('.returnp-btn');
const main=document.querySelector('.main');
const contBtn=document.querySelector('.cont-btn');
const quiz=document.querySelector('.quiz');
const box=document.querySelector('.box');
const resultbox=document.querySelector('.result-box');
const tryAgain=document.querySelector('.try');
const home=document.querySelector('.home-btn');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

tryAgain.onclick = () => {
    // Shuffle the 'questions' array before resetting variables and displaying the first question
    questions = shuffleArray(questions);

    box.classList.add('active');
    nextBtn.classList.remove('active');
    resultbox.classList.remove('active');
    qCount = 0;
    qnum = 1;
    userscore = 0;
    showQuestion(qCount);
    questionCounter(qnum);
    headerScore();
}

let qCount=0;
let qnum=1;
let userscore=0;
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("pbt").style.top = "0";
    } else {
      document.getElementById("pbt").style.top = "-50px";
    }
  }

startBtn.onclick = () => {
    popup.classList.add('active');
    main.classList.add('active');
}

aboutBtn.onclick = () => {
    abt.classList.add('active');
    main.classList.add('active');
}
aboutRBtn.onclick = () => {
    abt.classList.remove('active');
    main.classList.remove('active');
}
contactBtn.onclick = () => {
    cbt.classList.add('active');
    main.classList.add('active');
}
practiseBtn.onclick = () => {
    pbt.classList.add('active');
    main.classList.add('active');
}
returnBtn.onclick = () => {
    popup.classList.remove('active');
    main.classList.remove('active');
}
cRbt.onclick = () => {
    cbt.classList.remove('active');
    main.classList.remove('active');
}
pRbt.onclick = () => {
    pbt.classList.remove('active');
    main.classList.remove('active');
}
contBtn.onclick = () => {
    quiz.classList.add('active');
    popup.classList.remove('active');
    main.classList.remove('active');
    box.classList.add('active');
    showQuestion(0);
    questionCounter(1);
    headerScore();
}


home.onclick = () => {
    quiz.classList.remove('active');
  nextBtn.classList.remove('active');
    resultbox.classList.remove('active');
    qCount=0;
 qnum=1;
userscore=0;
showQuestion(qCount);
questionCounter(qnum);
headerScore();
}


const nextBtn=document.querySelector('.next');
nextBtn.onclick = () => {
    if(qCount<questions.length-1){
         qCount++;
    showQuestion(qCount);
    qnum++;
    questionCounter(qnum);
    nextBtn.classList.remove('active');
    }
   else{
    showResult();
   }
}
const oList=document.querySelector('.opt-list');


function showQuestion(index){
    const quest=document.querySelector('.question');
    quest.textContent=`${questions[index].question}`;
    let opTag=`<div class="opt"><span>${questions[index].options[0]}</span></div>
    <div class="opt"><span>${questions[index].options[1]}</span></div>
    <div class="opt"><span>${questions[index].options[2]}</span></div>
    <div class="opt"><span>${questions[index].options[3]}</span></div>`;
    oList.innerHTML=opTag;
    const opt=document.querySelectorAll('.opt');
    for(let i=0;i<opt.length;i++){
        opt[i].setAttribute('onclick','optionSelected(this)');
    }
}
function optionSelected(answer){
    let userAnswer=answer.textContent;
    let correctAnswer=questions[qCount].answer;
    let allOpt=oList.children.length;
   if(userAnswer==correctAnswer){
   answer.classList.add('correct');
   userscore+=1;
   headerScore();
   }
   else{
    answer.classList.add('incorrect');
    for(let i=0;i<allOpt;i++){
        if(oList.children[i].textContent==correctAnswer){
            oList.children[i].setAttribute('class','opt correct');
        }
       }
   }
   for(let i=0;i<allOpt;i++){
    oList.children[i].classList.add('disabled');
   }
   nextBtn.classList.add('active');
}
function questionCounter(index){
    const total=document.querySelector('.total');
    total.textContent=`${index} of ${questions.length} Questions`;
}

function headerScore(){
    const score=document.querySelector('.score');
    score.textContent=`Score: ${userscore} / ${questions.length}`;
}

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var menuIcon = document.getElementById('menu-icon');

    sidebar.classList.toggle('active');

    if (sidebar.classList.contains('active')) {
        menuIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    }
}
function showResult(){
    box.classList.remove('active');
    resultbox.classList.add('active');
    const scoreText=document.querySelector('.score-text');
    scoreText.textContent=`Your Score ${userscore} out of ${questions.length}`;
    const remark = document.querySelector('.remark');
    if (userscore === questions.length) {
        remark.textContent = "Excellent! You nailed it!";
    } else if (userscore >= questions.length / 3) {
        remark.textContent = "Well done! You did good!";
    }else if (userscore >= questions.length / 2) {
        remark.textContent = "Can Try again!";
    }
    else {
        remark.textContent = "You need Practise.";}
    const circle=document.querySelector('.circular');
    
    const value=document.querySelector('.value');
    let startvalue=-1;
    let endvalue=(userscore/questions.length)*100;
    let speed=20;
    let progress=setInterval(() =>{
        startvalue++;
        value.textContent=`${startvalue}%`;
        circle.style.background=`conic-gradient(orange ${startvalue * 3.6}deg,rgba(255,255,255,.1) 0deg)`;
        if(startvalue==endvalue){
            clearInterval(progress);
        }
    },speed);

}
