const display1El = document.querySelector('.display-1');
const display2El = document.querySelector('.display-2');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector('.equal');
const clearAllEl = document.querySelector('.all-clear');
const clearLastEl = document.querySelector('.last-entity-clear');

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersEl.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !haveDot) haveDot = true;
        else if (e.target.innerText === '.' && haveDot) return;
        if (display2El.innerText.length <= 18) {
            dis2Num += e.target.innerText;
            display2El.innerText = dis2Num;
        }

    })
})

operationEl.forEach((operation) => {
    operation.addEventListener('click', (e) => {
        if (!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        } else result = parseFloat(dis2Num);
        clearVar(operationName);
        lastOperation = operationName;
    })
})

const clearVar = (name = '') => {
    dis1Num += dis2Num + ' ' + name + ' ';
    display1El.innerText = dis1Num;
    display2El.innerText = '';
    dis2Num = '';
}

const mathOperation = () => {
    if (lastOperation === 'x') result = parseFloat(result) * parseFloat(dis2Num);
    else if (lastOperation === '+') result = parseFloat(result) + parseFloat(dis2Num);
    else if (lastOperation === '-') result = parseFloat(result) - parseFloat(dis2Num);
    else if (lastOperation === '/') result = parseFloat(result) / parseFloat(dis2Num);
    else if (lastOperation === '%') result = parseFloat(result) % parseFloat(dis2Num);
}

equalEl.addEventListener('click', () => {
    if (!dis2Num || !dis1Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    // tempResultEl.innerText = '';
    dis2Num = result;
    dis1Num = '';
    if (display2El.innerText.length > 18) {
        alert("Output is too long");
        display2El.innerText = 0;
    }
})

clearAllEl.addEventListener('click', () => {
    dis1Num = dis2Num = display1El.innerText = display2El.innerText = result = '';
})

clearLastEl.addEventListener('click', () => {
    display2El.innerText = dis2Num = '';
})

window.addEventListener('keydown', (e) => {
    if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '.')
        clickButton(e.key);
    else if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '%')
        clickOperation(e.key);
    else if (e.key === 'x')
        clickOperation('x');
    else if (e.key === 'Enter' || e.key === '=')
        clickEqual();
})

const clickButton = key => {
    numbersEl.forEach((button) => {
        if (display2El.innerText.length > 18)
            return;
        if (button.innerText === key)
            button.click();
    })
}

const clickOperation = key => {
    operationEl.forEach((operation) => {
        if (operation.innerHTML === key) operation.click();
    })
}

const clickEqual = () => {
    equalEl.click();
    if (display2El.innerText.length > 18) {
        alert("Output is too long");
        display2El.innerText = 0;
    }
}
