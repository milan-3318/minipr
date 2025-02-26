document.getElementById("specialty").addEventListener("change", function () {
    let specificFieldDiv = document.getElementById("specificFieldInput");
    if (this.value === "specific-field") {
        specificFieldDiv.style.display = "flex"; // Show input field
    } else {
        specificFieldDiv.style.display = "none"; // Hide input field
    }
});

document.getElementById("submitBtn").addEventListener("click", async function () {
    let fullName = document.getElementById("fullName").value;
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value;
    let specialty = document.getElementById("specialty").value;
    let address = document.getElementById("address").value;
    let role = localStorage.getItem("userRole"); //  role from localStorage

    if (!fullName || !age || !phone || !specialty || !address) {
        alert("Please fill all fields!");
        return;
    }

    let userDetails = { fullName, age, phone, specialty, address, role };

    try {
        let response = await fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userDetails)
        });

        let result = await response.text();
        alert(result);

        if (response.ok) {
            // Redirect based  role
            if (role === "student") {
                window.location.href = "student-dashboard.html";
            } else if (role === "teacher") {
                window.location.href = "teacher-dashboard.html";
            } else {
                alert("Unknown role! Redirecting to homepage.");
                window.location.href = "index.html";
            }
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Registration failed. Try again!");
    }
});
