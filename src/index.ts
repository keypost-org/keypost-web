import { subtract } from "./app";
const axios = require('axios');

async function init_user_test() {
  try {
    const { data } = await axios.get('/static/user.json');
    let username = data.username;
    const el = document.querySelector("span[id='keypost_username']");
    if (el) {
      el.textContent = username;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
  }
}

function init() {
  init_tutorial();
  init_user_test();
}

/*** Tutorial code for /custom.html ***/
function init_tutorial() {
  const form = document.querySelector("form");
  form?.addEventListener("submit", submitHandler);
}

function submitHandler(e: Event) {
  e.preventDefault();
  const num1 = document.querySelector("input[name='firstnumber']") as HTMLInputElement;
  const num2 = document.querySelector("input[name='secondnumber']") as HTMLInputElement;
  const result = subtract(Number(num1.value), Number(num2.value));
  const resultElement = document.querySelector("p");
  if (resultElement) {
    resultElement.textContent = result.toString();
  }
}

init();
