import {createBtnScore, loadJson} from "./artist";
import {divideIntoParts, fulfillArrWithAnswers} from "./artist_quiz";
import {buttonCategoryArtistRes, makeVisible} from "./main";

loadJson('./assets/json.json')
    .catch(alert)
    .then(data => {
        const infoArr = data.items;
        const cardArr = document.querySelectorAll('.artist-card') // arr with all category cards
        const artistsResults = document.querySelector('.artist-result__container')
        const arrayParts = [];
        divideIntoParts(infoArr, arrayParts);

        const btn = document.querySelector('.button-home-artist-res')
        const btnCategory = document.querySelector('.button-category-artist-res')

        btnCategory.addEventListener('click', ()=> {
            console.log('clear')
            artistsResults.innerHTML = ''
        })

        btn.addEventListener('click', ()=> {
            console.log('clear')
            artistsResults.innerHTML = ''
        })

        cardArr.forEach((card) => {
            card.addEventListener('click', (e) => {
                if(e.target.hasAttribute('data-btn-number')) {
                    makeVisible('artists-results')
                    console.log('visible')
                    let index = e.target.getAttribute('data-btn-number')
                    arrayParts[index].forEach((card, i) => {
                        createResultCards(index, i)
                    })
                    const z = localStorage.getItem(`artist results ${index}`).split(',')
                    const all = document.querySelectorAll('.result-card')
                    z.forEach((item, index) => {
                        console.log(all[index])
                        if(item === 'true') {
                            all[index].classList.remove('wrong-answer')
                        }
                    })
                }
            })
        })

        function createResultCards(arrPartsInd, objInd) {
            const resultCard = document.createElement('div')
            resultCard.classList.add('result-card', 'wrong-answer')
            resultCard.style.backgroundImage = `url("./assets/images/img/${arrayParts[arrPartsInd][objInd].imageNum}.jpg")`
            artistsResults.append(resultCard)
        }

    });