const btns = document.querySelectorAll("button[class='button']")
const text = document.querySelector("input")
const del = document.querySelector("button[id='DEL']")
const ce = document.querySelector("button[id='CE']")
let eq = ""
let lastClick = ""
const rx = /[\+\-\*\/=]/
const rn = /[0-9\.]/

btns.forEach(btn => btn.addEventListener("click", e => {
    if (rn.test(e.target.innerHTML)) { // captures all numbers and period
        if (rx.test(lastClick)) { // when last click was an operator including =, overwrite
            text.value = e.target.innerHTML
            // if last one was "=", you want to replace the eq entirely with new value
            // otherwise, you want to append
            eq = (lastClick == "=") ? (e.target.innerHTML) : (eq + e.target.innerHTML)
        }
        else { // append
            if (e.target.innerHTML == "." && eq.includes(".")) return
            text.value += e.target.innerHTML
            eq += e.target.innerHTML
        } 
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

document.addEventListener("keydown", e => {
    if (rx.test(e.key) || rn.test(e.key)) {
        document.evaluate(`//button[text()="${e.key}"]`, document, null, XPathResult.ANY_TYPE, null).iterateNext().click();
    }
    else if (e.key == "Enter") {
        document.evaluate(`//button[text()="="]`, document, null, XPathResult.ANY_TYPE, null).iterateNext().click();
    }
    else if (e.key == "Clear") {
        document.evaluate(`//button[text()="CE"]`, document, null, XPathResult.ANY_TYPE, null).iterateNext().click();
    }
    else if (e.key == "Backspace") {
        document.evaluate(`//button[text()="DEL"]`, document, null, XPathResult.ANY_TYPE, null).iterateNext().click();
    }
})