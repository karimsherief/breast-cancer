const rmCheck = document.querySelector("input[type=checkbox]"),
  passwordInput = document.querySelector("input[name=password]"),
  emailInput = document.querySelector("input[name=email]"),
  submit = document.querySelector("button[type=submit]"),
  guest = document.querySelector(".guest");

if (localStorage.checkbox && localStorage.checkbox !== "") {
  rmCheck.setAttribute("checked", "checked");
  emailInput.value = localStorage.username;
  passwordInput.value = localStorage.password;
} else {
  rmCheck.removeAttribute("checked");
  emailInput.value = "";
  passwordInput.value = "";
}
guest.addEventListener("click", (e) => {
  e.preventDefault();
  emailInput.value = "guest@mail.com";
  passwordInput.value = "123456";
});
submit.addEventListener("click", () => {
  if (
    rmCheck.checked &&
    emailInput.value !== "" &&
    passwordInput.value !== ""
  ) {
    localStorage.username = emailInput.value;
    localStorage.password = passwordInput.value;
    localStorage.checkbox = rmCheck.value;
  } else {
    localStorage.username = "";
    localStorage.password = "";
    localStorage.checkbox = "";
  }
});
