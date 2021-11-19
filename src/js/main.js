import {stopTimer, timerStep} from "./settings";

export const wrapper = document.querySelector('.wrapper ')
export const buttonArtist = document.querySelector(".main__artist-btn");
export const buttonArt = document.querySelector(".main__art-btn");
export const buttonSettings = document.querySelector(".main__settings-btn");
export const dataAttrArray = document.querySelectorAll("[data-visible]");

export const buttonHomeArr = document.querySelectorAll('.button-home')

export const buttonCategoryArtistQuiz = document.querySelector('.button-category-artist')
export const buttonsCategoryHome = document.querySelectorAll('.button-home-artist')
export const buttonCategoryArtistRes = document.querySelector('.button-category-artist-res')

export const buttonCategoryArtsQuiz = document.querySelector('.button-category-arts')
export const buttonsCategoryHomeArts = document.querySelectorAll('.button-home-arts')
export const buttonCategoryArtsRes = document.querySelector('.button-category-arts-res')



export function makeVisible(id) {
    dataAttrArray.forEach((component) => {
        if (component.id === id) {
            component.classList.add("visible");
            component.classList.remove("invisible");
        } else {
            component.classList.add("invisible");
            component.classList.remove("visible");
        }
    });
}

export function removeClass(arr, className) {
    arr.forEach(item => item.classList.remove(className))
}

buttonArtist.addEventListener("click", () => {
    makeVisible("artist-category");
    wrapper.style.backgroundImage = 'none'
});

buttonArt.addEventListener("click", () => {
    makeVisible("arts-category");
    wrapper.style.backgroundImage = 'none'
});

buttonSettings.addEventListener("click", () => {
    makeVisible("settings");
    wrapper.style.backgroundImage = 'none'
});

buttonHomeArr.forEach(button => {
    button.addEventListener('click', () => {
        wrapper.style.backgroundImage = 'url("./assets/images/main-img.jpg")'
        makeVisible('main')
        stopTimer()
    })
})

buttonCategoryArtistQuiz.addEventListener('click', () => {
    makeVisible('artist-category')
})

buttonCategoryArtistRes.addEventListener('click', () => {
    makeVisible('artist-category')
})


buttonCategoryArtsQuiz.addEventListener('click', () => {
    makeVisible('arts-category')
})