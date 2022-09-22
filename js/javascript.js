class Calculator { 
    constructor(previousOperandTextElement,currentOperandTextElement) { 
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() { 
     this.currentOperand = '';
     this.previousOperand = '';
     this.operation = undefined;
    }
    delete () { 
     this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number) { 
        if(number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand + number;

    }
    chooseOperation(operation) { 
        if(this.currentOperand === '')return;
        if(this.previousOperand != '') { 
            this.compute();
        }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    }
    compute() { 
      let prev = parseFloat(this.previousOperand),
         current = parseFloat(this.currentOperand),
         computation;
         if(isNaN(prev) || isNaN(current)) return;
         switch(this.operation) { 
            case "+":
                computation = prev + current; break;
            case "-":
                computation = prev - current; break;
            case "/": 
                computation = prev / current; break;
            case "*":
               computation  = prev * current; break;
               default: return;

         }
         this.currentOperand = computation;
         this.operation = undefined;
         this.previousOperand = '';
    }
getDisplayNumber(number) { 
let stringNumber = number.toString(),
     integerDigits = parseInt(stringNumber.split('.')[0]),
    decimalDigits = stringNumber.split('.')[1],
    integerDisplay;
    if(isNaN(integerDigits)) { 
        integerDisplay = '';
    } else { 
        integerDisplay = integerDigits.toLocaleString('en',{
            maximumFractionDigits: 0
        })
    } 
    if(decimalDigits != null) { 
        return `${integerDisplay}.${decimalDigits}`
    } else { 
        return integerDisplay
    }
  
}
    
    updateDisplay() { 
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) { 
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber( this.previousOperand)} ${this.operation}`
        } else { 
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// ----------------------- Hold all Button -----------------------
let previousOperandTextElement = document.querySelector('[data-previous-operand]'),
currentOperandTextElement = document.querySelector('[data-current-operand]'),
numberButtons = document.querySelectorAll('[data-number]'),
operationButtons = document.querySelectorAll('[data-operation]'),
allClearButton = document.querySelector('[data-all-clear]'),
deleteButton = document.querySelector('[data-delete]'),
equalsButton = document.querySelector('[data-equal]');

let calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => { 
    button.addEventListener('click',() => { 
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => { 
    button.addEventListener('click',() => { 
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click',button => { 
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click',button => { 
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click',button => { 
    calculator.delete();
    calculator.updateDisplay();
})


// -------------- change color fo buttons -----------------
let liButton = document.querySelectorAll("ul li");
liButton.forEach( buttonLi => { 
   buttonLi.addEventListener('click',() => { 

    liButton.forEach((b) => b.classList.remove("active"))

    buttonLi.classList.add("active")

    numberButtons.forEach(button => { 
       button.style.color = buttonLi.dataset.color;
    });

    operationButtons.forEach(button => {button.style.color = buttonLi.dataset.color})
    equalsButton.style.color = buttonLi.dataset.color
    deleteButton.style.color = buttonLi.dataset.color
    allClearButton.style.color = buttonLi.dataset.color
   })
})

// -------------------- mood night ---------------------
let night = document.querySelector(".night"),
    sun = document.querySelector(".sun");

night.addEventListener('click',() => {
    document.querySelector("body").classList.add("dark");
    night.style.display = "none";
    sun.style.display = "block";
});

sun.addEventListener('click',() => {
    document.querySelector("body").classList.remove("dark");
    sun.style.display = "none";
    night.style.display = "block";
});