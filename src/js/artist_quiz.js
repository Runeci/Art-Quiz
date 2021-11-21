import {createBtnScore, loadJson} from "./artist";
import {
    buttonCategoryArtistQuiz,
    buttonsCategoryHome,
    makeVisible,
    removeClass
} from "./main";
import {
    timerStep,
    stopTimer,
    runTimer,
    playCorrectAudio,
    playWrongAudio, playWinAudio, body
} from "./settings";

export const numberOfQuestions = 10;


loadJson('./assets/json.json').catch(alert).then(data => {
    const infoArr = data.items;
    const cardArr = document.querySelectorAll('.artist-card')
    const btnNext = document.querySelector('.artist-quiz__next')
    const quizAnswersContainer = document.querySelector('.artist-quiz__answers')
    const quizAnswerContainersArr = document.querySelectorAll('.artist-quiz__answer')
    const modalContent = document.querySelector('.modal-inner-text') // modal with right answer
    const quizQuestionsNumArr = document.querySelectorAll('.artist-quiz__question-number')
    const modalNext = document.getElementById("myModal");
    const modalResults = document.querySelector('.modal-results');
    const modalResultsScore = document.querySelector('.modal-results__score');
    const btnResult = document.querySelector('.modal-results__next')
    const arrayParts = [];
    let arrWithResults = [];
    let correctAnswer; //correct answer
    let score = 0; // total score
    let currImgNum = 0; // current number of img
    let currCategoryNum; // current category card number
    let numberOfAnsweredQuestions = 0;

    divideIntoParts(infoArr, arrayParts);


    cardArr.forEach((card, index) => {
        if (localStorage.getItem(`artist visited ${index}`) === 'true') {
            createBtnScore(cardArr, index, 'artist')
        }
        card.addEventListener('click', () => {
            currCategoryNum = index;
            setFirstQuizImg(arrayParts, index);
            getAnswers(arrayParts, currCategoryNum, currImgNum);
            runTimer();
            localStorage.setItem(`card artist ${index}`, '0');
            setDefaultValues();
        })
    })

    btnNext.addEventListener('click', () => {
        setNumberOfCurrentImg();
        getAnswers(arrayParts, currCategoryNum, currImgNum);
        setImg(arrayParts, currCategoryNum, currImgNum)
        removeClass(quizAnswerContainersArr, 'correct')
        removeClass(quizAnswerContainersArr, 'wrong')
        hideModal(modalNext)

        localStorage.setItem(`card artist ${currCategoryNum}`, `${score}`) //set score
        localStorage.setItem(`artist results ${currCategoryNum}`, `${arrWithResults}`)

        quizAnswersContainer.classList.remove('disabled')
        numberOfAnsweredQuestions++
        showResult(numberOfAnsweredQuestions, modalResults, modalResultsScore, score)

        runTimer()

        if (localStorage.getItem(`artist visited ${currCategoryNum}`) === 'true') {
            createBtnScore(cardArr, currCategoryNum, 'artist')
        }

        if (numberOfAnsweredQuestions === numberOfQuestions) {
            stopTimer()
        }
    })

    quizAnswersContainer.addEventListener('click', e => { // get total score
        if (e.target.innerHTML === correctAnswer) {
            score++
            arrWithResults.push('true')
            quizQuestionsNumArr[currImgNum].classList.add('correct')
        } else {
            arrWithResults.push('false')
            quizQuestionsNumArr[currImgNum].classList.add('wrong')
        }
    })

    function setDefaultValues() {
        hideModal(modalResults)
        removeClass(quizQuestionsNumArr, 'correct')
        removeClass(quizQuestionsNumArr, 'wrong')
        score = 0;
        numberOfAnsweredQuestions = 0;
        currImgNum = 0;
        arrWithResults = [];
    }

    function setNumberOfCurrentImg() {
        currImgNum++
        if (currImgNum === numberOfQuestions) {
            currImgNum = 0;
        }
    }


    function setFirstQuizImg(arr, index) {
        const img = document.querySelector('.artist-quiz__img');
        img.style.backgroundImage = `url("./assets/images/img/${arr[index][0].imageNum}.jpg")`
    }

    function setImg(arr, index, num) {
        const img = document.querySelector('.artist-quiz__img');
        img.style.backgroundImage = `url("./assets/images/img/${arr[index][num].imageNum}.jpg")`
    }

    function getAnswers(partArr, arrNumber, imageNum) {
        const maxIndex = infoArr.length - 1;
        const numberOfAnswers = 4;
        if(body.classList.contains('english')) {
            correctAnswer = partArr[arrNumber][imageNum].en.author;
        } else {
            correctAnswer = partArr[arrNumber][imageNum].author;
        }

        let answersArr = [correctAnswer];
        for (let i = 0; i < numberOfAnswers - 1; i++) {
            let answer;
            if(body.classList.contains('english')) {
                 answer = infoArr[getRandomNum(0, maxIndex)].en.author
            } else {
                answer = infoArr[getRandomNum(0, maxIndex)].author
            }
            if (answer !== correctAnswer) {
                answersArr.push(answer);
            } else {
                if(body.classList.contains('english')) {
                    answersArr.push(infoArr[getRandomNum(0, maxIndex)].en.author)
                } else {
                    answersArr.push(infoArr[getRandomNum(0, maxIndex)].author)
                }
            }
        }
        shuffle(answersArr);
        quizAnswerContainersArr.forEach((container, index) => {
            container.innerHTML = `${answersArr[index]}`
        })
        checkAnswer()
    }


    function checkAnswer() {
        quizAnswerContainersArr.forEach(cont => {
            cont.addEventListener('click', () => {
                if (cont.innerHTML === correctAnswer) {
                    cont.classList.add('correct')
                    playCorrectAudio()
                    stopTimer()
                } else {
                    cont.classList.add('wrong')
                    playWrongAudio()
                    stopTimer()
                }
                modalContent.textContent = `правильный ответ: ${correctAnswer}`
                if(body.classList.contains('english')) {
                    modalContent.textContent = `right answer: ${correctAnswer}`
                }
                quizAnswersContainer.classList.add('disabled')
                showModal(modalNext)
            })
        })
    }

    const timerArtist = document.querySelector('.artist-quiz .timer')

    setInterval(() => {
        answerAfterTimerEnd(timerArtist)
    }, 1000)

    function answerAfterTimerEnd() {
        if (timerStep === 0) {
            arrWithResults.push('false')
            playWrongAudio()
            quizAnswerContainersArr.forEach(cont => {
                if (cont.innerHTML === correctAnswer) {
                    cont.classList.add('correct')
                    stopTimer()
                }
                quizQuestionsNumArr[currImgNum].classList.add('wrong')
                modalContent.textContent = `правильный ответ: ${correctAnswer}`
                if(body.classList.contains('english')) {
                    modalContent.textContent = `right answer: ${correctAnswer}`
                }
                quizAnswersContainer.classList.add('disabled')
                showModal(modalNext)
            })
        }
    }


    btnResult.addEventListener('click', () => {
        makeVisible('artist-category')
        localStorage.setItem(`artist results ${currCategoryNum}`, `${arrWithResults}`)
        setDefaultValues()
        createBtnScore(cardArr, currCategoryNum, 'artist')
        stopTimer()
    })

    buttonCategoryArtistQuiz.addEventListener('click', () => {
        fulfillArrWithAnswers(arrWithResults)
        localStorage.setItem(`artist results ${currCategoryNum}`, `${arrWithResults}`)
        createBtnScore(cardArr, currCategoryNum, 'artist')
        setDefaultValues();
        stopTimer()
    })

    buttonsCategoryHome.forEach(btn => {
        btn.addEventListener('click', () => {
            fulfillArrWithAnswers(arrWithResults)
            localStorage.setItem(`artist results ${currCategoryNum}`, `${arrWithResults}`)
            createBtnScore(cardArr, currCategoryNum, 'artist')
            setDefaultValues();
            stopTimer()
        })
    })
});


export function divideIntoParts(arr, newArr) {
    const copyArr = [].concat(arr)
    while (copyArr.length > 0)
        newArr.push(copyArr.splice(0, 10));
}

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function getRandomNum(min, max) {
    let randomNum
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}

export function hideModal(modal) {
    modal.style.top = "-100%";
}

export function showModal(modal) {
    modal.style.top = "0";
}

export function fulfillArrWithAnswers(resArr) {
    if (resArr.length < numberOfQuestions) {
        for (let i = resArr.length; i < numberOfQuestions; i++) {
            resArr.push('false')
        }
    }
}

export function showResult(answeredQuestions, modal, modalScore, totalScore) {
    if (answeredQuestions === numberOfQuestions) {
        playWinAudio()
        showModal(modal)
        modalScore.innerHTML = `${totalScore} / ${numberOfQuestions}`
    }
}


