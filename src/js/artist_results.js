import {loadJson} from "./artist";
import {divideIntoParts} from "./artist_quiz";
import {makeVisible} from "./main";

loadJson('./assets/json.json').catch(alert).then(data => {
    const infoArr = data.items;
    const cardArr = document.querySelectorAll('.artist-card') // arr with all category cards
    const artistsResults = document.querySelector('.artist-result__container')
    const arrayParts = [];
    divideIntoParts(infoArr, arrayParts);

    const btnHome = document.querySelector('.button-home-artist-res')
    const btnCategory = document.querySelector('.button-category-artist-res')

    btnCategory.addEventListener('click', () => {
        clearHTML(artistsResults)
    })

    btnHome.addEventListener('click', () => {
        clearHTML(artistsResults)
    })

    cardArr.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-btn-number')) {
                makeVisible('artists-results')
                let index = e.target.getAttribute('data-btn-number')
                arrayParts[index].forEach((card, i) => {
                    createResultCards(index, i)
                })

                const z = localStorage.getItem(`artist results ${index}`).split(',')
                const cards = document.querySelectorAll('.result-card')

                cards.forEach((card, i) =>
                    card.addEventListener('click', () => {
                        showInfo(arrayParts, index, i)
                    }))

                z.forEach((item, index) => {
                    if (item === 'true') {
                        cards[index].classList.remove('wrong-answer')
                    }
                })
            }
        })
    })

    function createResultCards(arrPartsInd, objInd) {
        const resultCard = document.createElement('div')
        resultCard.classList.add(`result-card`, 'wrong-answer')
        resultCard.style.backgroundImage = `url("./assets/images/img/${arrayParts[arrPartsInd][objInd].imageNum}.jpg")`
        artistsResults.append(resultCard)
    }
});

export function clearHTML(container) {
    container.innerHTML = '';
}

export function showInfo(arrayParts, arrPartsInd, objInd) {
    console.log(arrayParts[arrPartsInd][objInd].author)
    console.log(arrayParts[arrPartsInd][objInd].year)
    console.log(arrayParts[arrPartsInd][objInd].name)
}
