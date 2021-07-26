const btns = document.querySelectorAll("button[class='button']")
const text = document.querySelector("input")
const del = document.querySelector("button[id='DEL']")
const ce = document.querySelector("button[id='CE']")
let eq = ""
let flag = true
const rx = /[\+\-\*\/]/

btns.forEach(btn => btn.addEventListener("click", e => {
    if (!isNaN(e.toElement.innerHTML)) { // if its a valid number OR first decimal place
        if (flag) {
            text.value += e.toElement.innerHTML
        }
        else {
            text.value = e.toElement.innerHTML
            flag = true
        }
        eq += e.toElement.innerHTML
    }
    // exception for = sign
    else if (e.toElement.innerHTML == "=") {
        text.value = evaluate(eq)
        flag = false
    }
    else if (rx.test(text.value + e.toElement.innerHTML)) { // if there are 2 signs
        eq = text.value + e.toElement.innerHTML
        text.value = ""
    }
    else {
        eq += e.toElement.innerHTML
    }
}))

del.addEventListener("click", e => {
    text.value = text.value.substr(0, text.value.length - 1)
})

ce.addEventListener("click", e => {
    text.value = ""
})

function evaluate(y) {
    return (math.evaluate(y)).toString()
}