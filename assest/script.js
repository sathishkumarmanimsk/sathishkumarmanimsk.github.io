document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || {};

    // Registration Logic
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const newUsername = document.getElementById("newUsername");
            const newPassword = document.getElementById("newPassword");
            const registerMessage = document.getElementById("registerMessage");

            this.classList.add("was-validated");

            if (!newUsername.value.trim() || newUsername.value.includes(" ")) return;
            if (newPassword.value.length < 6) return;

            if (users[newUsername.value]) {
                registerMessage.classList.add("text-danger");
                registerMessage.innerText = "Username already exists!";
                return;
            }

            users[newUsername.value] = newPassword.value;
            localStorage.setItem("users", JSON.stringify(users));
            registerMessage.classList.add("text-success");
            registerMessage.innerText = "Registration successful! Redirecting...";

            setTimeout(() => window.location.href = "login.html", 2000);
        });
    }

    // Login Logic
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const username = document.getElementById("username");
            const password = document.getElementById("password");
            const message = document.getElementById("message");

            this.classList.add("was-validated");

            if (!username.value.trim() || !password.value.trim()) return;

            if (users[username.value] && users[username.value] === password.value) {
                sessionStorage.setItem("loggedInUser", username.value);
                message.classList.add("text-success");
                message.innerText = "Login successful! Redirecting...";
                setTimeout(() => window.location.href = "budgetplanner.html", 2000);
            } else {
                message.classList.add("text-danger");
                message.innerText = "Invalid username or password!";
            }
        });
    }

    // Profile Page Session Handling
    if (document.getElementById("profileUsername")) {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        if (!loggedInUser) window.location.href = "login.html";
        document.getElementById("profileUsername").innerText = loggedInUser;
    }
});

function logout() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
