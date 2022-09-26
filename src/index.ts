import { login_start, login_finish, register_start, register_finish } from "./app";
import axios from "axios";
import { Base64 } from "js-base64";
import { KeypostClient } from "./opaque";
import pkceChallenge from "pkce-challenge";

// https://getbootstrap.com/docs/5.2/getting-started/webpack/
import "./scss/styles.scss";
import { Toast } from "bootstrap";

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
        const email = document.querySelector("input[name='register-email']") as HTMLInputElement;
        const psswd = document.querySelector("input[name='register-password']") as HTMLInputElement;
        let challenge = pkce.code_challenge;
        let p = register_start(client, email.value, psswd.value, challenge);
        const el = document.querySelector("div[id='response']");
        if (el) {
          p.then((data) => {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$ register_start/init data=" + JSON.stringify(data));
            register_finish(client, email.value, data.id, data.o, Base64.btoa(pkce.code_verifier)).then((data) => {
              console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$ register_finish data=" + JSON.stringify(data));
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

function init_login() {
  const btn = document.querySelector("button[id='login-btn'");
  if (btn) {
    try {
      btn.addEventListener("click", function(e : Event) {
        e.preventDefault();
        const client = new KeypostClient();
        const email = document.querySelector("input[name='login-email']") as HTMLInputElement;
        const psswd = document.querySelector("input[name='login-password']") as HTMLInputElement;
        let p = login_start(client, email.value, psswd.value);
        const el = document.querySelector("div[id='response']");
        if (el) {
          p.then((data) => {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$ login_start/init data=" + JSON.stringify(data));
            login_finish(client, email.value, data.id, data.o).then((data) => {
              console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$ login_finish data=" + JSON.stringify(data));
              el.textContent = data.id + ", " + data.o;
            });
          });
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        show_error(error.toJSON() + "");
      } else {
        show_error(error + "");
      }
    }
  }
}

// https://getbootstrap.com/docs/5.2/components/toasts/
function show_error(msg : string) {
  console.log("ERROR: " + msg); // TODO Update html element text
  const toastLiveExample = document.getElementById("liveToast");
  if (toastLiveExample) {
    const toast = new Toast(toastLiveExample);
    toast.show();
  }
}

function init() {
  init_user_test();
  init_registration();
  init_login();
}

init();
