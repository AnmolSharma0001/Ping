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
        sendMessage(tx.value)
        tx.value='';
    }
})

// Sending

function sendMessage(mssg) {
    mssg.trim()
    if(mssg.length != 0){
        let msg = {
            user: n,
            message: mssg.trim()
        }
        appendMessage(msg)
        socket.emit('message', msg)
    }
}

function appendMessage(msg) {
    let ndiv = document.createElement("div");
    ndiv.innerHTML = `<p class="out-message"> <h4class="logd">${msg.user} : </h4>${msg.message} </p>`
    m_area[0].appendChild(ndiv)
    scrollToBottom
}

// Recieving
socket.on('message', (msg) => {
    let ndiv = document.createElement("div");
    ndiv.innerHTML = `<p class="in-message"> <h4class="logd">${msg.user} : </h4>${msg.message} </p>`
    m_area[0].appendChild(ndiv)
    scrollToBottom
})

function scrollToBottom(){
    messageArea.scrollTop = m_area[0].scrollHeight
}

function removeTextAreaWhiteSpace() {
    tx.value = myTxtArea.value.replace(/^\s*|\s*$/g,'');
}