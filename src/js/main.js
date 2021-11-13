export const buttonArtist = document.querySelector(".artist-quiz");
export const buttonArt = document.querySelector(".picture-quiz");
export const buttonSettings = document.querySelector(".button-settings");
export const buttonBack = document.querySelectorAll(".button-back");
export const dataAttrArray = document.querySelectorAll("[data-visible]");
export const buttonHome = document.querySelectorAll('.button-home')
export const buttonCategoryArtist = document.querySelector('.button-category-artist')

buttonBack.forEach((button) => {
    button.addEventListener("click", () => {
        makeVisible("main");
    });
});

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
});

buttonArt.addEventListener("click", () => {
    makeVisible("arts-category");
});

buttonSettings.addEventListener("click", () => {
    makeVisible("settings");
});

buttonHome.forEach(button => {
    button.addEventListener('click', () => {
        makeVisible('main')
    })
})

buttonCategoryArtist.addEventListener('click', () => {
    makeVisible('artist-category')
})