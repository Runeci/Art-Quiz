import {makeVisible} from "./main";
import {numberOfQuestions} from "./artist_quiz";

export async function loadJson(path) { // (1)
    let response = await fetch(path); // (2)
    if (response.status == 200) {
        return await response.json(); // (3)
    }
    throw new Error(response.status);
}


loadJson('./assets/json.json')
    .catch(alert)
    .then(data => {
        const infoArr = data.items;
        makeCategoryCard(infoArr, 10)
        const cardArr = document.querySelectorAll('.artist-card')
        const imgArr = document.querySelectorAll('.artist-card__img')
        checkVisitState(cardArr, imgArr)
        // addBtnToVisitedCard(cardArr, 'visited')
        setLocalStorage(cardArr, 'visited')
        cardArr.forEach((card, index) => {
            card.addEventListener('click', () => {
                createBtnScore(cardArr, index)
            })
        })

        goToQuizPage(cardArr)

    });


export function makeCategoryCard(arr, size) {
    const artistCategory = document.querySelector('.artist-category__categories')
    let arrays = [];
    while (arr.length > 0)
        arrays.push(arr.splice(0, size));

    arrays.forEach((arr, i) => {
        const artistCategoryCard = document.createElement('div')
        const artistQuestionAmount = document.createElement('div')
        const artistCategoryImg = document.createElement('div')

        artistCategoryCard.classList.add('artist-card')

        artistQuestionAmount.classList.add('artist-card__question')
        artistQuestionAmount.innerHTML = `${i + 1}`

        artistCategoryImg.classList.add('not-visited')
        artistCategoryImg.classList.add('artist-card__img')
        artistCategoryImg.style.backgroundImage = `url("./assets/images/img/${arr[0].imageNum}.jpg")`

        artistCategoryCard.appendChild(artistQuestionAmount)
        artistCategoryCard.appendChild(artistCategoryImg)
        artistCategory.appendChild(artistCategoryCard)
    })

}

function checkVisitState(cardArr, imgArr) {
    cardArr.forEach((card, index) => {
        card.addEventListener('click', () => {
            card.setAttribute('visited', 'true')
            imgArr[index].classList.remove('not-visited')
        })

        if (localStorage.getItem(`visited ${index}`) === 'true') {
            card.setAttribute('visited', 'true')
            imgArr[index].classList.remove('not-visited')
            // createBtnResults(card)
        }
    })
}

export function createBtnScore(cardArr, currCategoryCard) {
    const btn = document.createElement('button')
    btn.classList.add('card-btn', 'button')
    btn.setAttribute('data-btn-number', `${currCategoryCard}`)
    let score = localStorage.getItem(`card artist ${currCategoryCard}`) || 0;
    btn.innerHTML = `${score} / ${numberOfQuestions}`;
    cardArr[currCategoryCard].append(btn)
}

// function createBtnResults(card) {
//     const btn = document.createElement('button')
//     btn.classList.add('card-btn')
//     btn.classList.add('button')
//     console.log(card, 'card')
//     btn.innerHTML = `0 / ${numberOfQuestions}`
// }
//
// function addBtnToVisitedCard(cardArr, attr) {
//     cardArr.forEach((card) => {
//         card.addEventListener('click', () => {
//             if (card.getAttribute(attr) === 'true') {
//                 createBtnResults(card)
//             }
//         })
//     })
// }

function setLocalStorage(cardArr, attr) {
    cardArr.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (card.hasAttribute(attr)) {
                localStorage.setItem(`${attr} ${index}`, `${card.getAttribute(attr)}`)
            }
        })
    })
}

function goToQuizPage(cardArr) {
    cardArr.forEach((card, i) => {
        card.addEventListener('click', () => {
            makeVisible('artist-quiz')
        })
    })
}



