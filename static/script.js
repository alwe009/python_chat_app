const socket = io();
const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const currentUsernameSpan = document.getElementById("current-username");
const usernameInput = document.getElementById("username-input");
const updateUsernameButton = document.getElementById("update-username-button");

let currentUsername = "";

socket.on("set_username", (data) => {
  currentUsername = data.username;
  currentUsernameSpan.textContent = `Your username: ${currentUsername}`;
});

socket.io("user_joined", (data) => {
  addMessage(`${data.username} joined the chat`, "system");
});

socket.io("user_left", (data) => {
  addMessage(`${data.username} left the chat`, "system");
});

socket.io("new_message", (data) => {
  addMessage(data.message, "user", data.username, data.avatar);
});

socket.io("username_updated", (data) => {
  addMessage(
    `${data.old_username} changed their name to ${data.new_username}`,
    "system"
  );

  if (data.old_username === currentUsername) {
    currentUsername - data.new_username;
    currentUsernameSpan.textContent = `Your username: ${currentUsername}`;
  }
});
