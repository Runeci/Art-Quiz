import {loadJson, createBtnScore} from "./artist";
import {
    divideIntoParts,
    fulfillArrWithAnswers,
    getRandomNum,
    hideModal,
    numberOfQuestions,
    showModal, showResult,
    shuffle
} from "./artist_quiz";
import {buttonCategoryArtsQuiz, buttonsCategoryHomeArts, makeVisible, removeClass} from "./main";
import {playCorrectAudio, playWrongAudio, runTimer, stopTimer, timerStep} from "./settings";

loadJson('./assets/json.json').catch(alert).then(data => {
    const infoArr = data.items;
    const cardArr = document.querySelectorAll('.arts-card')
    const btnNext = document.querySelector('.arts-quiz__next')
    const quizAnswersContainer = document.querySelector('.arts-quiz__answers')
    const quizAnswerContainersArr = document.querySelectorAll('.arts-quiz__answer')
    const quizQuestionsNumArr = document.querySelectorAll('.arts-quiz__question-number')
    const modalNext = document.querySelector('.arts-modal')
    const modalResults = document.querySelector('.modal-results-arts');
    const modalResultsScore = document.querySelector('.modal-results-arts__score');
    const btnResult = document.querySelector('.modal-results-arts__next')
    const arrayParts = [];
    let arrWithResults = [];
    let correctAnswer; //correct answer
    let score = 0; // total score
    let currImgNum = 0; // current number of img
    let currCategoryNum; // current category card number
    let numberOfAnsweredQuestions = 0;

    divideIntoParts(infoArr, arrayParts)

    cardArr.forEach((card, index) => {
        if (localStorage.getItem(`arts visited ${index}`) === 'true') {
            createBtnScore(cardArr, index, 'arts')
        }
        card.addEventListener('click', () => {
            currCategoryNum = index;
            setFirstQuizQuestion(arrayParts, index);
            getAnswers(arrayParts, currCategoryNum, currImgNum);
            runTimer();
            localStorage.setItem(`card arts ${index}`, '0');
            setDefaultValues();
        })
    })

    btnNext.addEventListener('click', () => {
        setNumberOfCurrentImg();
        getAnswers(arrayParts, currCategoryNum, currImgNum);
        setQuestion(arrayParts, currCategoryNum, currImgNum)
        removeClass(quizAnswerContainersArr, 'correct')
        removeClass(quizAnswerContainersArr, 'wrong')
        hideModal(modalNext)

        localStorage.setItem(`card arts ${currCategoryNum}`, `${score}`) //set score
        localStorage.setItem(`arts results ${currCategoryNum}`, `${arrWithResults}`)

        quizAnswersContainer.classList.remove('disabled')
        numberOfAnsweredQuestions++


        showResult(numberOfAnsweredQuestions, modalResults, modalResultsScore, score)

        runTimer()

        if (localStorage.getItem(`arts visited ${currCategoryNum}`) === 'true') {
            createBtnScore(cardArr, currCategoryNum, 'arts')
        }

        if (numberOfAnsweredQuestions === numberOfQuestions) {
            stopTimer()
        }
    })

    quizAnswersContainer.addEventListener('click', e => { // get total score
        if (e.target.style.backgroundImage === correctAnswer) {
            score++
            arrWithResults.push('true')
            quizQuestionsNumArr[currImgNum].classList.add('correct')
        } else {
            arrWithResults.push('false')
            quizQuestionsNumArr[currImgNum].classList.add('wrong')
        }
    })

    btnResult.addEventListener('click', () => {
        makeVisible('arts-category')
        localStorage.setItem(`arts results ${currCategoryNum}`, `${arrWithResults}`);
        createBtnScore(cardArr, currCategoryNum, 'arts')
        setDefaultValues()
        stopTimer()
    })


    function setDefaultValues() {
        score = 0;
        numberOfAnsweredQuestions = 0;
        currImgNum = 0;
        arrWithResults = [];
        hideModal(modalResults)
        removeClass(quizQuestionsNumArr, 'correct')
        removeClass(quizQuestionsNumArr, 'wrong')
    }

    function setNumberOfCurrentImg() {
        currImgNum++
        if (currImgNum === numberOfQuestions) {
            currImgNum = 0;
        }
    }

    function setFirstQuizQuestion(arr, index) {
        const question = document.querySelector('.arts-quiz__question')
        question.innerHTML = `Какую картину написал(а) ${arr[index][0].author}?`
    }

    function setQuestion(arr, index, num) {
        const question = document.querySelector('.arts-quiz__question')
        question.innerHTML = `Какую картину написал(а) ${arr[index][num].author}?`
        console.log(arr[index][num].author)
    }

    function getAnswers(partArr, arrNumber, imageNum) {
        const maxIndex = infoArr.length - 1;
        const numberOfAnswers = 4;
        correctAnswer = `url("./assets/images/img/${partArr[arrNumber][imageNum].imageNum}.jpg")`
        let answersArr = [correctAnswer];
        for (let i = 0; i < numberOfAnswers - 1; i++) {
            let answer = `url("./assets/images/img/${infoArr[getRandomNum(0, maxIndex)].imageNum}.jpg")`
            answer !== correctAnswer ? answersArr.push(answer) : `url("./assets/images/img/${infoArr[getRandomNum(0, maxIndex)].imageNum}.jpg")`;
        }
        shuffle(answersArr);
        quizAnswerContainersArr.forEach((container, index) => {
            container.style.backgroundImage = `${answersArr[index]}`
        })
        checkAnswer()
    }

    function checkAnswer() {
        quizAnswerContainersArr.forEach(cont => {
            cont.addEventListener('click', () => {
                if (cont.style.backgroundImage === correctAnswer) {
                    cont.classList.add('correct')
                    playCorrectAudio()
                    stopTimer()
                } else {
                    cont.classList.add('wrong')
                    playWrongAudio()
                    stopTimer()
                }
                const rightAnswer = document.querySelector('.arts-right-answer')
                rightAnswer.style.backgroundImage = correctAnswer
                quizAnswersContainer.classList.add('disabled')
                showModal(modalNext)
            })
        })
    }

    const timerArts = document.querySelector('.arts-quiz .timer')

    setInterval(() => {
        answerAfterTimerEnd(timerArts)
    }, 1000)

    function answerAfterTimerEnd() {
        if (timerStep === 0) {
            arrWithResults.push('false')
            quizAnswerContainersArr.forEach(cont => {
                if (cont.style.backgroundImage === correctAnswer) {
                    console.log('right')
                    cont.classList.add('correct')
                    stopTimer()
                }
                quizQuestionsNumArr[currImgNum].classList.add('wrong')
                const rightAnswer = document.querySelector('.arts-right-answer')
                rightAnswer.style.backgroundImage = correctAnswer
                quizAnswersContainer.classList.add('disabled')
                showModal(modalNext)
            })
        }
    }

    buttonCategoryArtsQuiz.addEventListener('click', () => {
        fulfillArrWithAnswers(arrWithResults)
        localStorage.setItem(`arts results ${currCategoryNum}`, `${arrWithResults}`)
        createBtnScore(cardArr, currCategoryNum, 'arts')
        setDefaultValues();
        stopTimer()

    })

    buttonsCategoryHomeArts.addEventListener('click', () => {
        fulfillArrWithAnswers(arrWithResults)
        localStorage.setItem(`arts results ${currCategoryNum}`, `${arrWithResults}`)
        createBtnScore(cardArr, currCategoryNum, 'arts')
        setDefaultValues();
        stopTimer()
    })
});