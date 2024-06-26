const socket = io();
const form = document.getElementById("send");
const messageInput = document.getElementById(`in`);
const messageContainer = document.querySelector(`.container`);
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

// Ask new user for his/her name and let the server know
const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

// If a new user joins, receive his/her name from the server
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

// If server sends a message, receive it
socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

// If a user leaves the chat, append the info to the container
socket.on("left", (name) => {
  append(`${name} left the chat`, "right");
});

// If the form gets submitted, send server the message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
  messageContainer.scrollTop = messageContainer.scrollHeight;
});

