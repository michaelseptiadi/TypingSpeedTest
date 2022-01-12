const typingText = document.querySelector(".typing-text p")
inpField = document.querySelector(".wrapper .input-field")
mistakeTag = document.querySelector(".mistake span")
timeTag = document.querySelector(".time span b")
wpmTag = document.querySelector(".wpm span")
cpmTag = document.querySelector(".cpm span")
tryAgainBtn = document.querySelector("button")

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = (mistakes = isTyping = 0)

const randomParagraph = () => {
    // get random number and it will always less than the paragraph
    let randIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = ""
    //get random item from the paragraphs array, splitting all characters
    //of it, adding each character inside span and then adding this span inside paragraph
    paragraphs[randIndex].split("").forEach((span) => {
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag
    })
    typingText.querySelectorAll("span")[0].classList.add("active")
    document.addEventListener("keydown", () => inpField.focus())
    typingText.addEventListener("click", () => inpField.focus())
}

const initTyping = () => {
    const characters = typingText.querySelectorAll("span")
    let typedChar = inpField.value.split("")[charIndex]
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000)
            isTyping = true
        }

        if (typedChar == null) {
            charIndex--
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--
            }
            characters[charIndex].classList.remove("correct", "incorrect")
        } else {
            if (characters[charIndex].innerText === typedChar) {
                //if user typed character and shown character matched then add the correct class else increment the mistakes and add the incorrect class
                characters[charIndex].classList.add("correct")
            } else {
                mistakes++
                characters[charIndex].classList.add("incorrect")
            }
            charIndex++ //increment charIndex either user typed correct or incorrect character
        }
        characters.forEach((span) => span.classList.remove("active"))
        characters[charIndex].classList.add("active")

        let wpm = Math.round(((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60)
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
        mistakeTag.innerText = mistakes
        wpmTag.innerText = wpm
        cpmTag.innerText = charIndex - mistakes //cpm will not count mistakes
    } else {
        inpField.value = ""
        clearInterval(timer)
    }
}

const initTimer = () => {
    if (timeLeft > 0) {
        timeLeft--
        timeTag.innerText = timeLeft
    } else {
        clearInterval(timer)
    }
}

const resetGame = () => {
    randomParagraph()
    inpField.value = ""
    clearInterval(timer)
    timeLeft = maxTime
    charIndex = mistakes = isTyping = 0
    timeTag.innerText = timeLeft
    mistakeTag.innerText = mistakes
    wpmTag.innerText = 0
    cpmTag.innerText = 0
}
randomParagraph()
inpField.addEventListener("input", initTyping)
tryAgainBtn.addEventListener("click", resetGame)
