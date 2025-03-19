// Переменные
const createAccountBtns =
    document.querySelectorAll(".to-register"),
  toLoginBtns = document.querySelectorAll(".to-login"),
  closeBtns = document.querySelectorAll(".btn-close"),
  loginForm = document.querySelector("#login"),
  layout = document.getElementById("layout"),
  registerForm = document.querySelector("#register"),
  toLogin = document.getElementById("to-login");

// Переход к формам со стартового экрана
// открытие формы регистрации
createAccountBtns.forEach((button) => {
  button.addEventListener("click", showRegisterForm);
});

function showRegisterForm() {
  loginForm.style.bottom = "-1000px";
  registerForm.style.bottom = "0px";
  setTimeout(() => {
    layout.classList.add("layout");
  }, 300);
}

// открытие формы авторизации
toLoginBtns.forEach((button) => {
  button.addEventListener("click", showLoginForm);
});

function showLoginForm() {
  registerForm.style.bottom = "-1000px";
  setTimeout(() => {
    loginForm.style.bottom = "0px";
  }, 300);
  setTimeout(() => {
    layout.classList.add("layout");
  }, 300);
}

// Закрытие форм
closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", closeForms);
});

function closeForms(e) {
  e.preventDefault();
  loginForm.style.bottom = "-1000px";
  registerForm.style.bottom = "-1000px";
  setTimeout(() => {
    layout.classList.remove("layout");
  }, 300);
}

// Валидация полей ввода
const errors = document.querySelectorAll(".error");
const btnSignIn = document.getElementById("signIn");
const btnSignUp = document.getElementById("signUp");
// обязательные поля
const requiredLogin = ["username", "password"];
const requiredRegister = [
  "username",
  "course",
  "password",
  "password-confirm",
];

btnSignIn.addEventListener("click", (e) =>
  validation(e, "login"),
);
btnSignUp.addEventListener("click", (e) =>
  validation(e, "register"),
);

function validation(e, formType) {
  e.preventDefault();

  let error = false;

  // скрываем текст ошибок
  errors.forEach((error) => {
    error.classList.add("hide");
  });

  //определяем активную форму
  const activeForm =
    formType === "login" ? loginForm : registerForm;
  const activeInputs = activeForm.querySelectorAll("input");

  activeInputs.forEach((input) => {
    let tempName = input.getAttribute("name");
    if (tempName !== null) {
      input.style.borderColor = "rgb(131, 179, 164)";

      const requiredFields =
        formType === "login"
          ? requiredLogin
          : requiredRegister;

      // проверка на обязательность заполнения поля
      if (
        input.value.length === 0 &&
        requiredFields.includes(tempName)
      ) {
        addError(input, "Required Field", tempName);
        error = true;
      }

      // проверка username
      if (tempName === "username") {
        let regExp = /([A-Za-z-\s])+/;
        let result = regExp.test(input.value);
        if (!result) {
          addError(
            input,
            "Invalid characters. Only letters, hyphen or whitespaces",
            tempName,
          );
          error = true;
        }

        if (input.value.length < 4) {
          addError(
            input,
            "Needs to be more characters",
            tempName,
          );
          error = true;
        }
      }

      // проверка пароля
      if (tempName === "password") {
        let regExp = /[A-Za-z0-9]+$/;
        let result = regExp.test(input.value);
        if (!result) {
          addError(
            input,
            "Only numbers and Letters",
            tempName,
          );
          error = true;
        }

        if (input.value.length < 4) {
          addError(
            input,
            "Needs to be more then 3 characters",
            tempName,
          );
          error = true;
        }
      }

      // сравнение паролей (только для формы регистрации)
      if (
        formType === "register" &&
        tempName === "password-confirm"
      ) {
        let pass = document.getElementById(
          "password-confirm-input",
        ).value;
        let prevInput = document.getElementById(
          "password-input-register",
        ).value;
        if (prevInput !== pass) {
          addError(
            input,
            "Passwords don't match",
            tempName,
          );
          error = true;
        }
      }
    }
  });

  if (!error) {
    openModal();
    activeInputs.forEach((input) => (input.value = ""));
  }
}

// функция добавление ошибки
function addError(element, message) {
  let parent = element.parentNode;
  let temp = parent.lastChild.previousElementSibling;

  temp.classList.remove("hide");
  temp.textContent = message;
  element.style.borderColor = "red";
}

// функция имитирующая успешную отправку на сервер (открывается модальное окно)
function openModal() {
  document.querySelector(".modal").classList.add("open");
  document
    .querySelector(".modal__layout")
    .classList.add("open");
}

// закрытие модального окна
function closeModal() {
  document.querySelector(".modal").classList.remove("open");
  document
    .querySelector(".modal__layout")
    .classList.remove("open");
  closeForms();
}

document
  .querySelector(".modal__btn")
  .addEventListener("click", closeModal);
