let email = document.getElementById("email");
let pass = document.getElementById("pass");

let Signup = document.querySelector(".sign-submit");
Signup.addEventListener("click", async function () {
  if (email.value.length == 0) {
    alert("Please enter your email!");
  } else if (pass.value.length == 0) {
    alert("Please enter your password!");
  } else if (pass.value.length < 8) {
    alert("password must be atleast 8 characters!");
  } else {
    let url = new URL("http://127.0.0.1:3000/users/signup");
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: pass.value,
      }),
    });
    result = await result.json();
    console.log(result);
    if (!result.access_token) {
      alert("error occured");
    } else {
      alert("registration successful");
      setTimeout(function () {
        window.open("login.html", "_self");
      }, 1000);
    }
  }
});