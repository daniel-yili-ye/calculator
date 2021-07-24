const btns = document.querySelectorAll("button[class='button']")
const text = document.querySelector("input")
const del = document.querySelector("button[id='DEL']")
const ce = document.querySelector("button[id='CE']")
let eq = ""

btns.forEach(btn => btn.addEventListener("click", e => {
    if (!isNaN(e.toElement.innerHTML)) {
        text.value += e.toElement.innerHTML
    }
    else if (e.toElement.innerHTML == "=") {
        evaluate(eq)
    }
    else {
        eq += text.value + e.toElement.innerHTML
    }
}))

del.addEventListener("click", e => {
    text.value = text.value.substr(0, text.value.length - 1)
})

ce.addEventListener("click", e => {
    text.value = ""
})

function evaluate(y) {
    console.log(y)
}