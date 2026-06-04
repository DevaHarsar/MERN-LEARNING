const counterValue = document.getElementById('counter');

function incrementCounter() {
    counterValue.textContent = parseInt(counterValue.textContent) + 1;
}

function decrementCounter() {
    counterValue.textContent = parseInt(counterValue.textContent) - 1;
}

function resetCounter() {
    counterValue.textContent = 0;
}