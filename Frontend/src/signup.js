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
    let url = new URL("http://127.0.0.1:7000/auth/signup");
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
    
     

    let resultJson = await result.json();
    console.log(result);

    if (result.status !== 201) {
      alert("error occured");
    } else {
      alert("registration successful");
      setTimeout(function () {
        window.open("login.html", "_self");
      }, 1000);
    }
  }
});
