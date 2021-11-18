import {showModal} from "./artist_quiz";

const toggleButton = document.querySelector('.timer__switch')
const timerInput = document.querySelector('.timer__range')
export const timers = document.querySelectorAll('.timer')
const timerCheckbox = document.querySelector('.timer__switch input')

function checkState(){
    if (!localStorage.getItem('timer-period')) {
        timerInput.value = '5'
    } else {
        timerInput.value = `${localStorage.getItem('timer-period')}`
    }

    if (!localStorage.getItem('timer')) {
        timerCheckbox.setAttribute('data-switch', 'off')
    } else {
        const status = localStorage.getItem('timer')
        timerCheckbox.setAttribute('data-switch', `${status}`)
    }
}
checkState()


toggleButton.addEventListener('click', e => {
    if(e.target.getAttribute('data-switch') === 'off') {
        e.target.setAttribute('data-switch', 'on')
    } else {
        e.target.setAttribute('data-switch', 'off')
    }
})

timerInput.addEventListener('change', (e) => {
    timerStep = parseInt(e.target.value, 10);
})

export function runTimer() {
    if (timerCheckbox.getAttribute('data-switch') === 'on') {
        countdown()
    }
}

let timer;
export let timerStep = parseInt(timerInput.value, 10);

export function countdown(){
    timers.forEach(timer => {
        timer.innerHTML = timerStep
    })
    timerStep--;
    if (timerStep < 0){
        stopTimer()
    } else {
        timer = setTimeout(countdown, 1000);
    }
}

 export function stopTimer() {
    clearTimeout(timer);
    timerStep = parseInt(timerInput.value, 10);
    timers.forEach(timer => {
        timer.innerHTML = 'Time is over'
    })
}

window.addEventListener('beforeunload', () => {
    localStorage.setItem('timer', `${timerCheckbox.getAttribute('data-switch')}`);
    localStorage.setItem('timer-period', `${timerStep}`)
})
