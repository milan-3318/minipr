document.addEventListener("DOMContentLoaded", () => {
    // Simulate student name (replace with real data from session)
    const studentName = localStorage.getItem("studentName") || "Student";
    document.getElementById("studentName").textContent = studentName;

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("studentName");
        window.location.href = "index.html"; // Redirect to sign-in page
    });
});
