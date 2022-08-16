const chatWindow = document.getElementById("chat");
const chatSendBtn = chatWindow.children[2].firstElementChild.lastElementChild;
const chatInput = chatWindow.children[2].firstElementChild.firstElementChild;
const chatBody = chatWindow.children[1];
let messages = [];
function initChat() {
  let chatHidden = !!localStorage.getItem("chatHidden");
  if (!chatHidden) {
    openChat();
  }
  chatSendBtn.addEventListener("click", sendMessage);
  let message_json = localStorage.getItem("messages");
  if (message_json != null) {
    messages = JSON.parse(message_json);
  }
  renderMessages();
}
// function timeNow(i) {
//   var d = new Date(),
//     h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
//     m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
//   i.value = h + ":" + m;
// }
function sendMessage(e) {
  e.preventDefault();
  let message = {
    content: chatInput.value,
    time: new Date().toLocaleTimeString("en-US"),
  };
  messages.push(message);
  chatInput.value = "";
  renderMessages();
  saveMessages();
}

function saveMessages() {
  localStorage.setItem("messages", JSON.stringify(messages));
}
function renderMessages() {
  let html = `<ul>`;
  for (let i = Math.max(messages.length - 3, 0); i < messages.length; i++) {
    html += `<li> - ${messages[i].content}</li>`;
    html += `<li> ${messages[i].time}</li>`;
  }
  html += `</ul>`;
  chatBody.innerHTML = html;
}
function openChat() {
  chatWindow.classList.remove("hidden");
  //   chatHidden = false;
  localStorage.removeItem("chatHidden");
}
function closeChat() {
  chatWindow.classList.add("hidden");
  //   chatHidden = true;
  localStorage.setItem("chatHidden", true);
}
