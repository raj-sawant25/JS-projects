document.addEventListener('DOMContentLoaded', ()=>{

    const startBtn = document.getElementById("start-btn")
    const nextBtn = document.getElementById("next-btn")
    const restartBtn = document.getElementById("restart-btn")
    const questionCont = document.getElementById("question-container")
    const questionText = document.getElementById("question-text")
    const scoreDisplay = document.getElementById("score")
    const choiceList = document.getElementById("choices-list")
    const resultCont = document.getElementById("result-container")


    const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
    ];

    let CurrentQuestionIndex = 0
    let score = 0

    startBtn.addEventListener("click", startQuix)
    
    nextBtn.addEventListener("click", ()=>{
         CurrentQuestionIndex++
         if(CurrentQuestionIndex < questions.length){
            showQuestion()
         }else{
            showResult()
         }
    })

    restartBtn.addEventListener("click", ()=>{
        score = 0
        CurrentQuestionIndex=0
        startQuix()
    })

    function startQuix(){
        startBtn.classList.add('hidden')
        resultCont.classList.add('hidden')
        questionCont.classList.remove('hidden')

        showQuestion()
    }

    function showQuestion(){
        nextBtn.classList.add('hidden')
        questionText.textContent = questions[CurrentQuestionIndex].question
        choiceList.innerHTML = ""
        questions[CurrentQuestionIndex].choices.forEach((choice) => {
            const list  = document.createElement('li')
            list.textContent = choice

            list.addEventListener('click', (e)=>selectAnswer(choice,e.target))
            choiceList.appendChild(list)
        })
    }


    function selectAnswer(choice, selectedAnswer){
        const correctAns = questions[CurrentQuestionIndex].answer

        if(choice === correctAns){
            score++
            selectedAnswer.style.backgroundColor = "green"
        }else{
            selectedAnswer.style.backgroundColor = "red"
        }

        Array.from(choiceList.children).forEach(li => {
        li.style.pointerEvents = "none"
        })

        nextBtn.classList.remove('hidden')
    }

    function showResult(){
        questionCont.classList.add('hidden')
        resultCont.classList.remove('hidden')
        scoreDisplay.textContent = `Score - ${score}/${questions.length}`
    }

})