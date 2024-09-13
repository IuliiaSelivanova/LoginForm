// Валидация полей ввода
const inputs = document.querySelectorAll("input");
const errors = document.querySelectorAll('.error');
const btnSignIn = document.getElementById("signIn");
const btnSignUp = document.getElementById("signUp");
const required = ["email", "password", "name", "passwordRepeat"];

btnSignIn.addEventListener("click", validation);
btnSignUp.addEventListener("click", validation);
function validation(e) {
  let data = {};
  e.preventDefault();
  errors.forEach(function(item) {
    item.classList.add("hide");
  })
  let error = false;
  inputs.forEach(function (el) {
    let tempName = el.getAttribute("name");
    if (tempName != null) {
      el.style.borderColor = "rgb(131, 179, 164)";
      if (el.value.length == 0 && required.includes(tempName)) {
        addError(el, "Required Field", tempName);
        error = true;
      }
      if (tempName == "name") {
        let exp = /([A-Za-z-\s])+/;   //Поскольку форма на английском, проверка на латинские буквы, а не на кириллицу
        let result = exp.test(el.value);
        if (!result){
          addError(el, "Invalid characters. Only letters, hyphen or whitespaces", tempName);
          error = true;
        }
        if (el.value.length < 4) {
          addError(el, "Needs to be more characters", tempName);
          error = true;
        }
      }
      if (tempName == "email") {
        let exp = /([A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z0-9]+)\w+/;
        let result = exp.test(el.value);
        if (!result){
          addError(el, "Invalid Email", tempName);
          error = true;
        }
      }
      if (tempName == "password") {
        let exp = /[A-Za-z0-9]+$/;
        let result = exp.test(el.value);
        if (!result){
          addError(el, "Only numbers and Letters", tempName);
          error = true;
        }
        if (el.value.length < 4) {
          addError(el, "Needs to be more then 3 characters", tempName);
          error = true;
        }
      }
      let pass = document.getElementById('password2').value;
      console.log(pass)
      if (tempName == "passwordRepeat") {
        if (el.value != pass) {
          console.log(pass)
          addError(el, "Passwords don't match", tempName);
          error = true;
        }
      }
      
      data[tempName] = el.value;
    }
  })
  if (!error) {
    document.querySelector(".form_signin_main").submit();
  }
}

function addError(el, mes) {
  let temp = el.nextElementSibling;
  temp.classList.remove("hide");
  temp.textContent = mes;
  el.style.borderColor = "red";
  el.focus();
}