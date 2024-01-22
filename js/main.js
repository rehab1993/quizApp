
const startBtn = document.getElementById('startBtn');
let score = 0
startBtn.addEventListener('click',function(){

    const category = document.getElementById('category').value;
    const difficulty = Array.from(document.getElementsByName('difficulty')).find((elem)=>{return elem.checked}).value
    let numberOfQuestions = document.getElementById('numberOfQuestions').value;

 
  
    console.log(category);
    console.log(difficulty);
    console.log(numberOfQuestions);
    

     getData(numberOfQuestions,category,difficulty);
   
     if(numberOfQuestions > 0){
        $('#alert1').fadeOut(0)
        $('#setting').fadeOut(0)
        $('#quiz').fadeIn(200)
       

     }else{
        $('#alert1').fadeIn(0)
     }


})

let questions =[]
async function getData(query1,query2,query3){
    const result = await fetch(`https://opentdb.com/api.php?amount=${query1}&category=${query2}&difficulty=${query3}&type=multiple`)
    const data = await result.json();
     questions =  data.results;
    // return questions ;
    console.log(questions)
    console.log(questions.length);
    // if(questions.length> 0){
    //     $('#alert1').fadeOut(0)
    //     $('#setting').fadeOut(0)
    //     $('#quiz').fadeIn(200)
       

    //  }else{
    //     $('#alert1').fadeIn(0)
    //  }
  
     showDta()
   
  
}
let currentQuestion = 0;
let correctAnswer

function showDta(){
    // console.log(questions)

    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('totalNumberOfQuestions').innerHTML = questions.length;
    document.getElementById('question').innerHTML = questions[currentQuestion].question;
    correctAnswer = questions[currentQuestion].correct_answer
    console.log(correctAnswer);
    let answers = questions[currentQuestion].incorrect_answers;
    randomNo = Math.ceil(Math.random() * answers.length)
    answers.splice(randomNo,0,correctAnswer) 
    console.log(answers);

    let cartona = ``;
    for(let i =0 ;i<answers.length;i++){
        cartona+=` <label for="" class="form-check-label">
        <input type="radio" class="form-check-input" name="Answer" value="${answers[i]}"> ${answers[i]}
       </label><br>`

    }
    document.getElementById('rowAnswer').innerHTML = cartona;
    document.getElementById('next').addEventListener('click',function(){
        getUserAnswer()
    })
}



function getUserAnswer(){
    let UserAnswer = Array.from(document.getElementsByName('Answer')).find((ele)=>ele.checked)?.value;
    console.log(UserAnswer);
    if(UserAnswer != undefined){
        $('#alert').fadeOut(0);
        checkAnswer();
        currentQuestion++;
        if(currentQuestion < numberOfQuestions){
            showDta()
            
        }else{
            $('#quiz').fadeOut(0);
            $('#finish').fadeIn(550);
            document.getElementById('score').innerHTML = score


        }
       

    }else{
        $('#alert').fadeIn(0)

    }

    function checkAnswer(){
        if(UserAnswer==correctAnswer){
            $('#Correct').fadeIn(200).fadeOut(200);
            score++
           
        }else{
            $('#inCorrect').fadeIn(200).fadeOut(200)

        }
    }
    

}


