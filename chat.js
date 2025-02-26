let userRole = "Student"; // Change to "Teacher" for teacher role

document.getElementById("userRole").textContent = `[Role: ${userRole}]`;

document.getElementById("sendBtn").addEventListener("click", function () {
    sendMessage();
});

document.getElementById("messageInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    let messageInput = document.getElementById("messageInput");
    let messageText = messageInput.value.trim();

    if (messageText === "") return;

    let chatBox = document.getElementById("chatBox");

    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    
    if (userRole === "Student") {
        messageDiv.classList.add("student-message");
    } else {
        messageDiv.classList.add("teacher-message");
    }

    messageDiv.textContent = messageText;
    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
    messageInput.value = "";
}
