
const socket = io();

let user;

const chatBox = document.getElementById("chatBox");

Swal.fire({
    title: "Identificate",
    input: 'text',
    text: 'Ingrese un usuario para ientificarse en el chat',
    inputValidator: (value) => {
        return !value && 'ncesitas escribir un nombre para ingresar'
    },
    allowOutsideClick: false,
}).then(result => {
    user = result.value;
    console.log(user);
})

chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if(chatBox.value.trim().length > 0){
            // trim nos permite sacar los espacios en blanco al principio y al final de un string
            // si el mensaje tiene mas de cero caracteres lo enivamos al servidor
            socket.emit("message", {user:user, message:chatBox.value});
            chatBox.value = '';
        }
    }
})

// listener de mensajes

socket.on("messagesLogs", (data) => {
    let log = document.getElementById("messagesLogs");
    let mensajes = '';
    data.forEach(mensaje => {
        mensajes = mensajes + `${mensaje.user} dice: ${mensaje.message}`
    });
    log.innerHTML = mensajes;
});