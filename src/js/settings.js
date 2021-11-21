const toggleButton = document.querySelector('.timer__switch')
const timerInput = document.querySelector('.timer__range')
const timerLabel = document.querySelector('.timer-label')
const timers = document.querySelectorAll('.timer')
const timerCheckbox = document.querySelector('.timer__switch input')

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
    timerLabel.innerHTML = `${timerStep}`
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
    let audio = new Audio('./assets/sounds/correct-answer-sound.mp3')
    audio.volume = parseInt(volumeValue, 10) / 100
    audio.play()
}

export function playWrongAudio() {
    let audio = new Audio('./assets/sounds/wrong-answer-sound.mp3')
    audio.volume = parseInt(volumeValue, 10) / 100
    audio.play()
}

export function playWinAudio() {
    let audio = new Audio('./assets/sounds/win.mp3')
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

const languageBtn = document.querySelector('.settings__language .toggle');

languageBtn.addEventListener('click', () => {
    body.classList.toggle('english');
    changeLanguage();
})

function changeLanguage() {

    if (body.classList.contains('english')) {
        document.querySelector('.artists-language').innerHTML = 'Artists'
        document.querySelector('.main__art-btn').innerHTML = 'Arts'
        document.querySelectorAll('.settings-language').forEach(i => i.innerHTML = 'Settings');
        document.querySelectorAll('.category-language').forEach(i => i.innerHTML = 'Categories');
        document.querySelectorAll('.button-home').forEach(btn => btn.innerHTML = 'Home');
        document.querySelectorAll('.question-language').forEach(i => i.innerHTML = 'Questions');
        document.querySelector('.artist-quiz__question').innerHTML = 'Who is the author?'
        document.querySelectorAll('.result-language').forEach(i => i.innerHTML = 'Results')
        document.querySelector('.arts-quiz__question .question').innerHTML = 'What art is of'
        document.querySelector('.modal-arts-inner-text').innerHTML = 'Right answer:'
        document.querySelectorAll('.continue-language').forEach(i => i.innerHTML = 'continue')
        document.querySelector('.volume__title').innerHTML = 'Volume'
        document.querySelector('.timer__title').innerHTML = 'Timer'
        document.querySelector('.theme__title').innerHTML = 'Light mode'
        document.querySelector('.language__title').innerHTML = 'English'
        document.querySelector('.author').innerHTML = 'Daryia Kastsianok'
    } else {
        document.querySelector('.artists-language').innerHTML = 'Художники'
        document.querySelector('.main__art-btn').innerHTML = 'Картины'
        document.querySelectorAll('.settings-language').forEach(i => i.innerHTML = 'Настройки');
        document.querySelectorAll('.category-language').forEach(i => i.innerHTML = 'Категории');
        document.querySelectorAll('.button-home').forEach(btn => btn.innerHTML = 'Домой');
        document.querySelectorAll('.question-language').forEach(i => i.innerHTML = 'Вопросы');
        document.querySelector('.artist-quiz__question').innerHTML = 'Кто автор картины?'
        document.querySelectorAll('.result-language').forEach(i => i.innerHTML = 'Результаты')
        document.querySelector('.arts-quiz__question .question').innerHTML = 'Какую картину написал(а)'
        document.querySelector('.modal-arts-inner-text').innerHTML = 'Правильный ответ:'
        document.querySelectorAll('.continue-language').forEach(i => i.innerHTML = 'продолжить')
        document.querySelector('.volume__title').innerHTML = 'Громкость'
        document.querySelector('.timer__title').innerHTML = 'Таймер'
        document.querySelector('.theme__title').innerHTML = 'Светлая тема'
        document.querySelector('.language__title').innerHTML = 'Английский язык'
        document.querySelector('.author').innerHTML = 'Дария Костенок'
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

    if (localStorage.getItem('english') === 'true') {
        body.classList.add('english')
        document.querySelector('.language__switch input').setAttribute('checked', 'checked')
        changeLanguage()
    }

}

checkState()


window.addEventListener('beforeunload', () => {
    localStorage.setItem('timer', `${timerCheckbox.getAttribute('data-switch')}`);
    localStorage.setItem('timer-period', `${timerStep}`);
    localStorage.setItem('volume', `${volumeValue}`);
    localStorage.setItem('theme-light', `${body.classList.contains('light')}`);
    localStorage.setItem('english', `${body.classList.contains('english')}`)
})
