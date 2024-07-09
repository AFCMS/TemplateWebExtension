//browser.runtime.onInstalled.addListener(() => {
//    console.log("Extension installed");
//    alert("Extension installed");
//});

console.log("Hello from the content script!");

document.body.style.border = "5px solid red";

const socket = new WebSocket("ws://localhost:8085");
socket.onmessage = (event) => {
    console.log(event.data);
    alert("Message from server: " + event.data);
};
