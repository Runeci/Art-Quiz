import {makeVisible} from "./main";
import {numberOfQuestions} from "./artist_quiz";

export async function loadJson(path) { // (1)
    let response = await fetch(path); // (2)
    if (response.status === 200) {
        return await response.json(); // (3)
    }
    throw new Error(response.status);
}

loadJson('./assets/json.json').catch(alert).then(data => {
    const infoArr = data.items;

    console.log(infoArr[0].en.author)
    makeCategoryCard('artist-category__categories', 'artist', 0, infoArr, 10)
    const cardArr = document.querySelectorAll('.artist-card')
    const imgArr = document.querySelectorAll('.artist-card__img')
    checkVisitState(cardArr, imgArr, 'artist')

    setLocalStorage(cardArr, 'visited', 'artist')
    cardArr.forEach((card, index) => {
        card.addEventListener('click', () => {
            createBtnScore(cardArr, index, 'artist')
        })
    })

    goToQuizPage(cardArr, 'artist-quiz')
});


export function makeCategoryCard(container, categoryName, categoryImgInd, arr, size) {
    const containerMain = document.querySelector(`.${container}`)
    let arrays = [];
    while (arr.length > 0)
        arrays.push(arr.splice(0, size));

    arrays.forEach((arr, i) => {
        const card = document.createElement('div')
        const questionAmount = document.createElement('div')
        const img = document.createElement('div')

        card.classList.add(`${categoryName}-card`)

        questionAmount.classList.add(`${categoryName}-card__question`)
        questionAmount.innerHTML = `${i + 1}`

        img.classList.add('not-visited')
        img.classList.add(`${categoryName}-card__img`)
        img.style.backgroundImage = `url("./assets/images/img/${arr[categoryImgInd].imageNum}.jpg")`

        card.appendChild(questionAmount)
        card.appendChild(img)
        containerMain.appendChild(card)
    })
}


export function checkVisitState(cardArr, imgArr, categoryName) {
    cardArr.forEach((card, index) => {
        card.addEventListener('click', () => {
            card.setAttribute('visited', 'true')
            imgArr[index].classList.remove('not-visited')
        })

        if (localStorage.getItem(`${categoryName} visited ${index}`) === 'true') {
            card.setAttribute('visited', 'true')
            imgArr[index].classList.remove('not-visited')
        }
    })
}

export function createBtnScore(cardArr, currCategoryCard, categoryName) {
    const btn = document.createElement('button')
    btn.classList.add(`card-btn-${categoryName}`)
    btn.setAttribute('data-btn-number', `${currCategoryCard}`)
    let score = localStorage.getItem(`card ${categoryName} ${currCategoryCard}`) || 0;
    btn.innerHTML = `${score} / ${numberOfQuestions}`;
    cardArr[currCategoryCard].append(btn)
}

export function setLocalStorage(cardArr, attr, categoryName) {
    cardArr.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (card.hasAttribute(attr)) {
                localStorage.setItem(`${categoryName} ${attr} ${index}`, `${card.getAttribute(attr)}`)
            }
        })
    })
}

export function goToQuizPage(cardArr, quizName) {
    cardArr.forEach((card) => {
        card.addEventListener('click', () => {
            makeVisible(`${quizName}`)
        })
    })
}



