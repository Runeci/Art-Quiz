import {loadJson} from "./artist";
import {divideIntoParts} from "./artist_quiz";
import {makeVisible} from "./main";

loadJson('./assets/json.json')
    .catch(alert)
    .then(data => {
        const infoArr = data.items;
        const cardArr = document.querySelectorAll('.artist-card') // arr with all category cards
        const artistsResults = document.querySelector('.artist-result__container')
        const arrayParts = [];
        divideIntoParts(infoArr, arrayParts);


        cardArr.forEach((card, i) => {
            card.addEventListener('click', (e) => {

                if(e.target.hasAttribute('data-btn-number')) {

                    makeVisible('artists-results')
                    let index = e.target.getAttribute('data-btn-number')
                    arrayParts[index].forEach((card, i) => {
                        createResultCards(index, i)

                    })
                    const z = localStorage.getItem(`artist results ${index}`).split(',')
                    const all = document.querySelectorAll('.result-card')
                    console.log(all)
                    z.forEach((item, index) => {
                        if(item === 'true') {
                            all[index].style.border = '3px solid green'
                        }
                    })

                }

            })
        })

        function createResultCards(arrPartsInd, objInd) {
            // const z = localStorage.getItem(`artist results ${arrPartsInd}`).split(',')
            // console.log(z)
            // z.forEach((item, index) => {
            //     if (item === 'true') {
            //         console.log('hi', index)
            //     }
            // })
            const resultCard = document.createElement('div')
            resultCard.classList.add('result-card')
            resultCard.style.backgroundImage = `url("./assets/images/img/${arrayParts[arrPartsInd][objInd].imageNum}.jpg")`
            artistsResults.append(resultCard)
        }


    });