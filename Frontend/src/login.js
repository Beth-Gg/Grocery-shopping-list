const { ConsoleLogger } = require("@nestjs/common");

let email = document.getElementById("emailField");
let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

let log_btn = document.querySelector(".log-in-submit");
log_btn.addEventListener("click", function () {
    if (isValidEmail()) {
        console.log("login called");
        const email = document.getElementById("emailField").value;
        const password = document.getElementById("passField").value;
        
        if (localStorage.getItem("access_token")) {
            window.location = "list.html";
        } else if (email == "admin" && password == "123445") {
            window.open("admin.html");
        } else {
            let url = new URL("http://localhost:7000/auth/login");
            fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.access_token) {
                        document.getElementById("invalid").innerText =
                            "invalid credentials";
                        return;
                    } else {
                        let access_token = data.access_token;
                        localStorage.setItem("access_token", `${access_token}`);
                        console.log(localStorage.getItem("access_token"));
                        window.open("list.html", "_blank");
                    }
                });
        }
    }
});

function parseJwt(token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

async function giveToken() {
    let access_token = localStorage.getItem("access_token");
    if (
        access_token &&
        access_token != "undefined" &&
        access_token != undefined
    ) {
        let currentTime = Date.now() / 1000;
        let accessTime = Number(parseJwt(access_token).exp);
        if (accessTime - currentTime < 1) {
            return true;
        }
    }
}

function isValidEmail() {
    return regexEmail.test(email.value);
}
