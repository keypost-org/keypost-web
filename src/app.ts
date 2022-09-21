import axios from "axios";
import { Base64 } from "js-base64";
import { KeypostClient } from "./opaque";

export async function register_start(client : KeypostClient, email : string, i : string, c : string) {
  const request = await client.registerInit(i);
  const request_b64 = Base64.btoa(String.fromCharCode.apply(null, request.serialize())); // https://stackoverflow.com/a/12713326

  const { data } = await axios.post(
    "http://localhost:8000/register/start",
    {
      "e": email,
      "i": request_b64,
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
  const { record, export_key } = await client.registerFinish(Array.from(serverResponse), "server_identity_OPTIONAL", "client_identity_OPTIONAL");
  console.log("export_key=" + export_key);
  // Looks like [server|client]_identity are optional: https://github.com/cloudflare/opaque-ts/blob/main/src/opaque_client.ts#L111-L113
  const record_b64 = Base64.btoa(String.fromCharCode.apply(null, record.serialize())); // https://stackoverflow.com/a/12713326
  const { data } = await axios.post(
    "http://localhost:8000/register/finish",
    {
      "id": id,
      "e": email,
      "i": record_b64,
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

/*** Tutorial code for /custom.html ***/
export function subtract(a : number, b : number) : number {
  return a - b;
}
