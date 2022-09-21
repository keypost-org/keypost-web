import axios from "axios";
import { Base64 } from "js-base64";
import { KeypostClient } from "./opaque";

export async function register_start(client : KeypostClient, email : string, i : string, c : string) {
  const request = await client.registerInit(i);
  const { data } = await axios.post(
    "http://localhost:8000/register/start",
    {
      "e": email,
      "i": serialize(request.serialize()),
      "c": c
    },
    {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return data;
}

export async function register_finish(client : KeypostClient, email : string, id : number, o : string, v : string) {
  const serverResponse : Uint8Array = Base64.toUint8Array(o);
  const { record, export_key } = await client.registerFinish(Array.from(serverResponse), undefined, undefined);
  console.log("export_key=" + export_key); //TODO Needed? Store this to use later?
  // Looks like [server|client]_identity are optional: https://github.com/cloudflare/opaque-ts/blob/main/src/opaque_client.ts#L111-L113
  const { data } = await axios.post(
    "http://localhost:8000/register/finish",
    {
      "id": id,
      "e": email,
      "i": serialize(record.serialize()),
      "v": v
    },
    {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return data;
}

export async function login_start(client : KeypostClient, email : string, password : string) {
  const r = await client.loginInit(password);
  const { data } = await axios.post(
    "http://localhost:8000/login/start",
    {
      "e": email,
      "i": serialize(r.serialize())
    },
    {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return data;
}

export async function login_finish(client : KeypostClient, email : string, id : number, o : string) {
  const context = undefined; //"context is a public, shared string";
  const serverResponse : Uint8Array = Base64.toUint8Array(o);
  const { ke3, session_key: session_key_client } = await client.loginFinish(Array.from(serverResponse), undefined, undefined, context);
  console.log("$$$$$$$$$$$ session_key=" + session_key_client); // TODO Store the session key? How/Where?
  const { data } = await axios.post(
    "http://localhost:8000/login/finish",
    {
      "id": id,
      "e": email,
      "i": serialize(ke3.serialize())
    },
    {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return data;
}

function serialize(input : number[]) {
  return Base64.btoa(String.fromCharCode.apply(null, input)); // https://stackoverflow.com/a/12713326
}

/*** Tutorial code for /custom.html ***/
export function subtract(a : number, b : number) : number {
  return a - b;
}
