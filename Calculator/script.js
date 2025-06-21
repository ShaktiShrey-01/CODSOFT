let currentInput = '0';

let previousInput = '';

let operation = null;

let resetInput = false;

const resultElement = document.getElementById('result');

const historyElement = document.getElementById('history');

function appendNumber(number) {

    if (currentInput === '0' || resetInput) {

        currentInput = number;

        resetInput = false;

    } else {

        currentInput += number;

    }

    updateDisplay();

    animateButton(number);

}

function appendOperator(op) {

    if (operation !== null) calculate();

    previousInput = currentInput;

    operation = op;

    resetInput = true;

    updateHistory();

    animateButton(op);

}

function clearAll() {

    currentInput = '0';

    previousInput = '';

    operation = null;

    updateDisplay();

    historyElement.textContent = '';

    animateButton('AC');

}

function clearEntry() {

    currentInput = '0';

    updateDisplay();

    animateButton('CE');

}

function updateDisplay() {

    resultElement.textContent = currentInput;

    

    // Animation for display

    resultElement.style.transform = 'scale(1.1)';

    resultElement.style.color = getRandomColor();

    setTimeout(() => {

        resultElement.style.transform = 'scale(1)';

    }, 200);

}

function updateHistory() {

    if (operation) {

        historyElement.textContent = `${previousInput} ${operation}`;

    }

}

function calculate() {

    if (operation === null || resetInput) return;

    

    try {

        let result;

        const prev = parseFloat(previousInput);

        const current = parseFloat(currentInput);

        

        switch (operation) {

            case '+':

                result = prev + current;

                break;

            case '-':

                result = prev - current;

                break;

            case '*':

                result = prev * current;

                break;

            case '/':

                result = prev / current;

                break;

            case '%':

                result = prev % current;

                break;

            default:

                return;

        }

        

        historyElement.textContent = `${previousInput} ${operation} ${currentInput} =`;

        currentInput = result.toString();

        operation = null;

        resetInput = true;

        updateDisplay();

        createConfetti();

    } catch (error) {

        currentInput = 'Error';

        updateDisplay();

        setTimeout(clearAll, 1000);

    }

}

function animateButton(value) {

    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {

        if (button.textContent === value || 

            (value === 'AC' && button.textContent === 'AC') ||

            (value === 'CE' && button.textContent === 'CE') ||

            (value === '=' && button.textContent === '=')) {

            button.style.transform = 'scale(0.9)';

            button.style.backgroundColor = getRandomColor();

            setTimeout(() => {

                button.style.transform = '';

                setTimeout(() => {

                    if (button.classList.contains('operator-btn')) {

                        button.style.backgroundColor = '#ff9a9e';

                    } else if (button.classList.contains('clear-btn')) {

                        button.style.backgroundColor = '#a6c1ee';

                    } else if (button.classList.contains('equals-btn')) {

                        button.style.backgroundColor = '#fbc2eb';

                    } else if (button.classList.contains('number-btn')) {

                        button.style.backgroundColor = '#84fab0';

                    }

                }, 300);

            }, 200);

        }

    });

}

function getRandomColor() {

    const colors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a6c1ee', '#84fab0'];

    return colors[Math.floor(Math.random() * colors.length)];

}

function createConfetti() {

    for (let i = 0; i < 50; i++) {

        const confetti = document.createElement('div');

        confetti.className = 'confetti';

        confetti.style.left = Math.random() * 100 + 'vw';

        confetti.style.backgroundColor = getRandomColor();

        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';

        document.body.appendChild(confetti);

        

        setTimeout(() => {

            confetti.remove();

        }, 5000);

    }

}

// Keyboard support

document.addEventListener('keydown', (event) => {

    if (/[0-9.]/.test(event.key)) {

        appendNumber(event.key);

    } else if (/[+\-*/%]/.test(event.key)) {

        appendOperator(event.key);

    } else if (event.key === 'Enter' || event.key === '=') {

        calculate();

    } else if (event.key === 'Escape') {

        clearAll();

    } else if (event.key === 'Backspace') {

        clearEntry();

    }

});