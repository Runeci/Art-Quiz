const toggleButton = document.querySelector('.timer__switch')
const timerInput = document.querySelector('.timer__range')
const timerLabel = document.querySelector('.timer-label')
const timers = document.querySelectorAll('.timer')
const timerCheckbox = document.querySelector('.timer__switch input')

// const volumeContainer = document.querySelector('.settings__volume')
const volumeInput = document.querySelector('.volume-input')
const volumeLabel = document.querySelector('.volume-label')
let volumeValue;


// TIMER
toggleButton.addEventListener('click', e => {
    if (e.target.getAttribute('data-switch') === 'off') {
        e.target.setAttribute('data-switch', 'on')
    } else {
        e.target.setAttribute('data-switch', 'off')
    }
})

timerInput.addEventListener('change', (e) => {
    timerStep = parseInt(e.target.value, 10);
    timerLabel.innerHTML = `${timerStep} с`
})

export function runTimer() {
    if (timerCheckbox.getAttribute('data-switch') === 'on') {
        countdown()
    }
}

let timer;
export let timerStep = parseInt(timerInput.value, 10);

export function countdown() {
    timers.forEach(timer => {
        timer.innerHTML = timerStep
    })
    timerStep--;
    if (timerStep < 0) {
        stopTimer()
    } else {
        timer = setTimeout(countdown, 1000);
    }
}

export function stopTimer() {
    clearTimeout(timer);
    timerStep = parseInt(timerInput.value, 10);
    timers.forEach(timer => {
        timer.innerHTML = ' '
    })
}

//MUSIC

export function playCorrectAudio() {
    let audio = new Audio('./../assets/sounds/correct-answer-sound.mp3')
    audio.volume = parseInt(volumeValue, 10) / 100
    audio.play()
}

export function playWrongAudio() {
    let audio = new Audio('./../assets/sounds/wrong-answer-sound.mp3')
    audio.volume = parseInt(volumeValue, 10) / 100
    audio.play()
}

export function playWinAudio() {
    let audio = new Audio('./../assets/sounds/win.mp3')
    audio.volume = parseInt(volumeValue, 10) / 100
    audio.play()
}

volumeInput.addEventListener('change', (e) => {
    volumeLabel.innerHTML = e.target.value;
    volumeValue = e.target.value;
})

//LIGHT MODE

const themeBtn = document.querySelector('.settings__theme .toggle')
export const body = document.querySelector('body');

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light')
})

//LANGUAGE

function changeLanguage() {
    if (body.classList.contains('english')) {
        document.querySelector('.main__artist-btn').innerHTML = 'Artists'
        document.querySelector('.main__art-btn').innerHTML = 'Arts'
        document.querySelector('.main__settings-btn span').innerHTML = 'Settings'
        document.querySelector('.artist-category__logo h2').innerHTML = 'Artists'
        document.querySelector('.main__artist-btn').innerHTML = 'Categories'

        document.querySelectorAll('.button-home').forEach(btn => btn.innerHTML = 'Home')

        document.querySelector('.artist-quiz__logo h2').innerHTML = 'Questions'
        document.querySelector('.button-category-artist').innerHTML = 'Categories'


        document.querySelector('.modal-results__next').innerHTML = 'continue'
        document.querySelector('.artist-quiz__next').innerHTML = 'continue'

        document.querySelector('.artist-quiz__question').innerHTML = 'Who is the author?'
        document.querySelector('.artist-result__logo h2').innerHTML = 'Results'
        document.querySelector('.button-category-artist-res').innerHTML = 'Categories'


        document.querySelector('.arts-category__logo h2').innerHTML = 'Categories'
        document.querySelector('.arts-quiz__logo h2').innerHTML = 'Questions'
        document.querySelector('.button-category-arts').innerHTML = 'Categories'
        document.querySelector('.modal-results-arts__next').innerHTML = 'continue'
        document.querySelector('.arts-quiz__question .question').innerHTML = 'What art is of'


        document.querySelector('.modal-arts-inner-text').innerHTML = 'Right answer:'
        document.querySelector('.arts-quiz__next').innerHTML = 'continue'
        document.querySelector('.arts-result__logo h2').innerHTML = 'Results'
        document.querySelector('.button-category-arts-res').innerHTML = 'Categories'

        document.querySelector('.settings__logo h2').innerHTML = 'Settings'
        document.querySelector('.button-category-arts-res').innerHTML = 'Categories'

        document.querySelector('.volume__title').innerHTML = 'Volume'
        document.querySelector('.timer__title').innerHTML = 'Timer'
        document.querySelector('.theme__title').innerHTML = 'Light mode'

        document.querySelector('.author').innerHTML = 'Daryia Kastsianok'

    }
}
changeLanguage()
//LOCAL STORAGE

function checkState() {
    if (!localStorage.getItem('timer-period')) {
        timerInput.value = '5'
        timerLabel.innerHTML = '5'
    } else {
        timerInput.value = `${localStorage.getItem('timer-period')}`
        timerLabel.innerHTML = `${localStorage.getItem('timer-period')} с`
    }

    if (!localStorage.getItem('timer')) {
        timerCheckbox.setAttribute('data-switch', 'off')
    } else {
        const status = localStorage.getItem('timer')
        timerCheckbox.setAttribute('data-switch', `${status}`)
        if (localStorage.getItem('timer') === 'on') {
            timerCheckbox.setAttribute('checked', 'checked')
        }
    }

    if (!localStorage.getItem('volume')) {
        volumeValue = 0.5
        volumeInput.value = 0.5 * 100
        volumeLabel.innerHTML = `${volumeValue}`
    } else {
        volumeValue = localStorage.getItem('volume')
        volumeInput.value = volumeValue
        volumeLabel.innerHTML = `${volumeValue}`
    }

    if (localStorage.getItem('theme-light') === 'true') {
        body.classList.add('light')
        document.querySelector('.theme__switch input').setAttribute('checked', 'checked')
    }
}

checkState()


window.addEventListener('beforeunload', () => {
    localStorage.setItem('timer', `${timerCheckbox.getAttribute('data-switch')}`);
    localStorage.setItem('timer-period', `${timerStep}`)
    localStorage.setItem('volume', `${volumeValue}`)
    localStorage.setItem('theme-light', `${body.classList.contains('light')}`)
})
