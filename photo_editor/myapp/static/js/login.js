const loginModal = document.querySelector(".login");
const signupModal = document.querySelector(".signup");

document.getElementById("signup-link").addEventListener("click", openSignup);

function openSignup() {
    loginModal.style.display = "none";
    signupModal.style.display = "block";
    document.getElementById("id_email").placeholder = "Email address";
    document.getElementById("id_password1").placeholder = "Enter password";
    document.getElementById("id_password2").placeholder = "Reenter password";
}

const login = document.getElementById("login")
if (login) {
    login.addEventListener("click", () => {
        signupModal.style.display = "none";
        loginModal.style.display = "block";
    })
}

document.addEventListener("DOMContentLoaded", () => {
    // Assign currentURL value to current window
    const currentURL = document.getElementById("current_url");
    currentURL.value = window.location.href;

    if (sessionStorage.getItem('redirected')){
        login.click();
        if (sessionStorage.getItem('redirected') === "register"){
            openSignup();
        }
        sessionStorage.removeItem('redirected');
    }
})

// Register new user
document.getElementById("register-user").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    try {
        const response = await fetch("register/", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            if (data.status === 200) {
                sessionStorage.setItem('redirected', 'login');
            } else {
                sessionStorage.setItem('redirected', 'register');
            }
            window.location.href = document.getElementById("current_url").value
        } else {
            throw new Error(response.status)
        }
    } catch(error) {
        console.error(`${error}: Unable to process request at this time`)
    }
})

// Remove errors when user clicks out of modal
document.getElementById("loginModal").addEventListener("hidden.bs.modal", () => {
    const messages = document.getElementById("messages");
    if (messages) {messages.remove()};
})

// Login functionality
document.getElementById("login-user").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    try {
        const response = await fetch("login/", {
            method: "POST",
            body: formData,
        })

        if (response.ok) {
            window.location.href = document.getElementById("current_url").value
        } else {
            console.error("error")
        }
    } catch(error) {
        console.error(`$(error) Login verification failed. Please try again.`)
    }
})
