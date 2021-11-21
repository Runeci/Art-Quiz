import {loadJson} from "./artist";
import {divideIntoParts} from "./artist_quiz";
import {buttonCategoryArtsRes, makeVisible} from "./main";
import {clearHTML, showInfo} from "./artist_results";
import {stopTimer} from "./settings";


loadJson('./assets/json.json').catch(alert).then(data => {
    const infoArr = data.items;
    const cardArr = document.querySelectorAll('.arts-card') // arr with all category cards
    const artsResults = document.querySelector('.arts-result__container')
    const arrayParts = [];
    divideIntoParts(infoArr, arrayParts);

    const btnHome = document.querySelector('.button-home-arts-res')
    const btnCategory = document.querySelector('.button-category-arts-res')

    btnCategory.addEventListener('click', () => {
        clearHTML(artsResults)
    })

    btnHome.addEventListener('click', () => {
        clearHTML(artsResults)
    })

    cardArr.forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-btn-number')) {
                makeVisible('arts-results')
                stopTimer()
                let index = e.target.getAttribute('data-btn-number')
                arrayParts[index].forEach((card, i) => {
                    createResultCards(index, i)
                })
                const arrResultCards = localStorage.getItem(`arts results ${index}`).split(',')
                const cards = document.querySelectorAll('.result-card')

                const resultModal = document.querySelector('.arts-result__modal')
                const resultAuthor = document.querySelector('.arts-result__author')
                const resultName = document.querySelector('.arts-result__name')
                const resultYear = document.querySelector('.arts-result__year')
                const overlay = document.querySelector('.arts-overlay')


                cards.forEach((card, i) =>
                    card.addEventListener('click', () => {
                        showInfo(arrayParts, index, i, resultAuthor, resultYear, resultName)
                        overlay.style.display = 'block';
                        resultModal.style.top = '50%';
                    }))

                overlay.addEventListener('click', () => {
                    resultModal.style.top = '-100%';
                    overlay.style.display = 'none';
                })

                arrResultCards.forEach((item, index) => {
                    if (item === 'true') {
                        cards[index].classList.remove('wrong-answer')
                    }
                })
            }
        })
    })

    buttonCategoryArtsRes.addEventListener('click', () => {
        makeVisible('arts-category')
    })

    function createResultCards(arrPartsInd, objInd) {
        const resultCard = document.createElement('div')
        resultCard.classList.add('result-card', 'wrong-answer')
        resultCard.style.backgroundImage = `url("./assets/images/img/${arrayParts[arrPartsInd][objInd].imageNum}.jpg")`
        artsResults.append(resultCard)
    }

});