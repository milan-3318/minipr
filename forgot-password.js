document.getElementById("resetBtn").addEventListener("click", async function () {
    let email = document.getElementById("email").value;

    if (!email) {
        alert("Please enter your email!");
        return;
    }

    try {
        let response = await fetch("http://localhost:8080/api/users/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        let result = await response.text();
        alert(result);
        
        if (response.ok) {
            window.location.href = "index.html"; // Redirect back to sign-in page
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to reset password. Try again!");
    }
});
