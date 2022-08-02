console.log("Nothing")

const socket = io()


let n;
do {
    n = prompt(`Please enter your name: `)
} while (!n)

let tx = document.querySelector("textarea");
let m_area = document.getElementsByClassName("message_area");
tx.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
        sendMessage(evt.target.value)
    }
})

// Sending

function sendMessage(mssg) {
    let msg = {
        user: n,
        message: mssg.trim()
    }

    appendMessage(msg)
    tx.value=""
    socket.emit('message', msg)
}

function appendMessage(msg) {
    let ndiv = document.createElement("div");
    ndiv.innerHTML = `<h4class="logd">${msg.user}</h4><p class="out-message"> ${msg.message} </p>`
    m_area[0].appendChild(ndiv)
    scrollToBottom
}

// Recieving
socket.on('message', (msg) => {
    let ndiv = document.createElement("div");
    ndiv.innerHTML = `<h4 class="logd">${msg.user}</h4><p class="in-message"> ${msg.message} </p>`
    m_area[0].appendChild(ndiv)
    scrollToBottom
})

function scrollToBottom(){
    messageArea.scrollTop = m_area[0].scrollHeight
}