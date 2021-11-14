import {makeCategoryCard, checkVisitState, createBtnScore, goToQuizPage, setLocalStorage} from "./artist";
import {loadJson} from "./artist";

loadJson('./assets/json.json')
    .catch(alert)
    .then(data => {
        const infoArr = data.items;
        makeCategoryCard('arts-category__categories', 'arts', 1, infoArr, 10)
        const cardArr = document.querySelectorAll('.arts-card')
        const imgArr = document.querySelectorAll('.arts-card__img')

        checkVisitState(cardArr, imgArr, 'arts')

        setLocalStorage(cardArr, 'visited', 'arts')

        cardArr.forEach((card, index) => {
            card.addEventListener('click', () => {
                createBtnScore(cardArr, index, 'arts')
            })
        })

        goToQuizPage(cardArr, 'arts-quiz')
    });


