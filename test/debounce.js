const input = document.querySelector("input")
const defaultText = document.getElementById("default")
const debounceText = document.getElementById("debounce")
const throttleText = document.getElementById("throttle")


//debounce waits until the action is done to fire the function
const updateDebounceText = debounce(() =>{
    incrementCount(debounceText)
})


//Throttle delays the action by seconds to fire the function.
const updateThrottleText = throttle(() =>{
    incrementCount(throttleText)
}, 100)

// input.addEventListener("input", e => {
//     defaultText.textContent = e.target.value
//     updateThrottleText(e.target.value)
//     updateDebounceText(e.target.value)
// })

function debounce(cb, delay = 1000){
    let timeout

    //debounce waits one second before it the function fires

    return(...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}


function throttle(cb, delay = 1000){
    let shouldWait = false
    let waitingArgs

    const timeoutFunc = () => {
        if (waitingArgs == null){
            shouldWait = false
        }
        else {
            cb(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunc, delay)
        }
    }

    return (...args) => {
        if(shouldWait) {
            waitingArgs = args
            return
        }

        cb(...args)
        shouldWait = true
        setTimeout(timeoutFunc, delay)
    }
}

document.addEventListener("mouseover", e =>{
incrementCount(defaultText)
updateDebounceText()
updateThrottleText()
})

function incrementCount(element){
    element.textContent = (parseInt(element.innerText || 0) + 1)
}