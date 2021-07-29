const btns = document.querySelectorAll("button[class='button']")
const text = document.querySelector("input")
const del = document.querySelector("button[id='DEL']")
const ce = document.querySelector("button[id='CE']")
let eq = ""
let overwrite = false
const rx = /[\+\-\*\/]/

btns.forEach(btn => btn.addEventListener("click", e => {
    if ((!isNaN(e.toElement.innerHTML)) || (e.toElement.innerHTML == "." && !eq.includes("."))) { // if its a valid number
        if (overwrite) { // overwrite -> need to make another overwrite condition where you overwrite text.value and eq (essentially hitting CE button)
            text.value = e.toElement.innerHTML
            overwrite = false
        }
        else { // append
            text.value += e.toElement.innerHTML
        } 
        eq += e.toElement.innerHTML // number or decimal point is added onto equation
    }
    else if (e.toElement.innerHTML == "=") { // exception for = sign
        text.value = evaluate(eq)
        eq = text.value
        overwrite = true
    }
    else if (rx.test(e.toElement.innerHTML)) { // if there is 1 signs
        text.value = evaluate(eq)
        eq = text.value + e.toElement.innerHTML
        overwrite = true
    }
    console.log(overwrite)
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
    overwrite = false
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