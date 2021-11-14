import {makeVisible} from "./main";
import {setLocalStorage, checkVisitState, makeCategoryCard, loadJson, createBtnScore, goToQuizPage} from "./artist";


loadJson('./assets/json.json')
    .catch(alert)
    .then(data => {
        const infoArr = data.items;
        makeCategoryCard('arts-category__categories', 'arts', 1, infoArr, 10)
        const cardArr = document.querySelectorAll('.arts-card')
        const imgArr = document.querySelectorAll('.arts-card__img')
        checkVisitState(cardArr, imgArr)



        setLocalStorage(cardArr, 'visited')
        cardArr.forEach((card, index) => {
            card.addEventListener('click', () => {
                createBtnScore(cardArr, index)
            })
        })

        goToQuizPage(cardArr)
    });


