let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("namefield");
let roleField = document.getElementById("roleField");
let title = document.getElementById("title");

// Sign In & Sign Up
signinBtn.onclick = function () {
    nameField.style.maxHeight = "0";
    roleField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
};

signupBtn.onclick = function () {
    nameField.style.maxHeight = "60px";
    roleField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
};

// Sign Up Function
document.getElementById("signupBtn").addEventListener("click", async function () {
    let name = document.querySelector("#namefield input").value;
    let email = document.querySelector(".input-field:nth-child(2) input").value;
    let password = document.querySelector(".input-field:nth-child(3) input").value;
    let role = document.getElementById("role").value;

    if (!name || !email || !password || role === "") {
        alert("Please fill all fields and select a role!");
        return;
    }

    let userData = { name, email, password, role };

    try {
        let response = await fetch("http://localhost:8080/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        let result = await response.json();

        if (result.message === "Signup successful!") {
            alert("Signup Successful! Please complete your profile.");
            localStorage.setItem("userRole", role); // role for registration
            window.location.href = "registration.html";
        } else {
            alert(result.message || "Sign up failed. Try again!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Sign up failed. Try again!");
    }
});

// Sign In Function
document.getElementById("signinBtn").addEventListener("click", async function () {
    let email = document.querySelector(".input-field:nth-child(2) input").value;
    let password = document.querySelector(".input-field:nth-child(3) input").value;

    if (!email || !password) {
        alert("Please enter email and password!");
        return;
    }

    let loginData = { email, password };

    try {
        let response = await fetch("http://localhost:8080/api/users/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        let result = await response.json();

        if (result.message === "Login successful!") {
            alert("Login Successful!");

            // Redirect based to role
            if (result.role === "student") {
                window.location.href = "studentdashboard.html";
            } else if (result.role === "teacher") {
                window.location.href = "teacherdashboard.html";
            } else {
                alert("Unknown role! Redirecting to homepage.");
                window.location.href = "index.html";
            }
        } else {
            alert(result.message || "Sign in failed. Try again!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Sign in failed. Try again!");
    }
});
