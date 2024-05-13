let screenNumber = document.querySelector("p");
let number = screenNumber.innerText;
console.log(screenNumber);

const calc = document.querySelector("div");
// console.log(calc.innerHTML);
const single = ['/', '*', '-', '+', '.']
calc.addEventListener('click', event => {
    const maybeButton = event.target;
    const isButton = maybeButton.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }else{
        const clicked = maybeButton.innerText;
        if (clicked === "="){
            const lastChar = number.substring(number.length - 1);
            if (!single.includes(lastChar)){
                calculate(number);
            }
        }else if (clicked === "C"){
            updateScreen(0);
        }else if (clicked === "DEL"){
            if(number.length > 0 && number != 0){
                number = number.substring(0, number.length - 1);
                updateScreen(number);
            }
        }else if (single.includes(clicked)){
            const lastChar = number.substring(number.length - 1);
            if (single.includes(lastChar)){
                return;
            }else{
                updateScreen(number+clicked);
            }  
        }else{
            const lastChar = number.substring(number.length - 1);
            if (lastChar == "0"){
                updateScreen(clicked);
            }else{
                updateScreen(number+clicked);
            }
        }
    }
})

function updateScreen(newNumber){
    screenNumber.textContent  = newNumber;
    number = screenNumber.innerText;
}
const operations = ['/', '*', '-', '+'] 
function calculate(newNumber){
    let result = null;
    let screenSplit = newNumber.split(/(\d*\.*\d*)/).filter(Boolean);
    console.log(screenSplit);
    let lastOperation = null;
    let first_iteration = true;
    for (i of screenSplit){
        console.log('i: '+i);
        if (operations.includes(i)){
            lastOperation = i
            first_iteration = false;
        }else{
            if (first_iteration){
                result = parseFloat(i);
                first_iteration = false;
            }else{
                console.log(lastOperation);
                if (lastOperation == '/'){
                    result = result / parseFloat(i);
                } else if (lastOperation == '*'){
                    result = result * parseFloat(i);
                } else if (lastOperation == '+'){
                    result = result + parseFloat(i);
                } else if (lastOperation == '-'){
                    result = result - parseFloat(i);
                }
            }
        }
        // console.log(result);
    }
    updateScreen(result);
}