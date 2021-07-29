const btns = document.querySelectorAll("button[class='button']")
const text = document.querySelector("input")
const del = document.querySelector("button[id='DEL']")
const ce = document.querySelector("button[id='CE']")
let eq = ""
let lastClick = ""
const rx = /[\+\-\*\/=]/

btns.forEach(btn => btn.addEventListener("click", e => {
    if ((!isNaN(e.target.innerHTML)) || (e.target.innerHTML == "." && !eq.includes("."))) { // captures all numbers and period
        if (rx.test(lastClick)) { // when last click was an operator including =, overwrite
            text.value = e.target.innerHTML
            // if last one was "=", you want to replace the eq entirely with new value
            // otherwise, you want to append
            eq = (lastClick == "=") ? (e.target.innerHTML) : (eq + e.target.innerHTML)
        }
        else { // append
            text.value += e.target.innerHTML
            eq += e.target.innerHTML
        } 
        // number or decimal point is added onto equation
    }
    else if (rx.test(e.target.innerHTML)) { // captures all signs in rx group
        text.value = evaluate(eq)
        eq = (e.target.innerHTML == "=") ? (text.value) : (text.value + e.target.innerHTML)
    }
    lastClick = e.target.innerHTML
}))

del.addEventListener("click", () => {
    text.value = text.value.substr(0, text.value.length - 1)
    if (rx.test(eq.charAt(eq.length - 1))) {
        eq = eq.substr(0, eq.length - 2)
    }
    else {
        eq = eq.substr(0, eq.length - 1)
    }
})

ce.addEventListener("click", () => {
    text.value = ""
    eq = ""
})

function evaluate(y) {
    try {
        return (math.evaluate(y)).toString()
    }
    catch(err) {
        return "Syntax Error"
    }
}

// when someone presses a number, operator, then hits DEL => eq is still the number
// eq is not overwritten when it is Syntax Error or Infinity
// make it so that i can start off with . and it will show properly