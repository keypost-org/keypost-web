import { register_start, register_finish, subtract } from "./app";
import axios from "axios";
import { Base64 } from "js-base64";
import { KeypostClient } from "./opaque";
import pkceChallenge from "pkce-challenge";

async function init_user_test() {
  try {
    const { data } = await axios.get("/static/user.json");
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

function init_registration() {
  const btn = document.querySelector("button[id='register-btn'");
  if (btn) {
    try {
      btn.addEventListener("click", function(e : Event) {
        e.preventDefault();
        const client = new KeypostClient();
        const pkce = pkceChallenge(128);
        let email = "jon@example.com";
        let psswd = "foobar";
        let challenge = pkce.code_challenge;
        let p = register_start(client, email, psswd, challenge);
        const el = document.querySelector("div[id='response']");
        if (el) {
          p.then((data) => {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$ start/init data=" + JSON.stringify(data));
            register_finish(client, email, data.id, data.o, Base64.btoa(pkce.code_verifier)).then((data) => {
              console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$ finish data=" + JSON.stringify(data));
              el.textContent = data.id + ", " + data.o;
            });
          });
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  }
}

function init() {
  init_tutorial();
  init_user_test();
  init_registration();
}

/*** Tutorial code for /custom.html ***/
function init_tutorial() {
  const form = document.querySelector("form");
  form?.addEventListener("submit", tutorialSubmitHandler);
}

function tutorialSubmitHandler(e : Event) {
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
