import {
  // AKEExportKeyPair,
  // AuthClient,
  // AuthServer,
  Config,
  // CredentialFile,
  // ExpectedAuthResult,
  // KE1,
  // KE2,
  // KE3,
  OpaqueClient,
  OpaqueID,
  // OpaqueServer,
  // RegistrationClient,
  // RegistrationRecord,
  // RegistrationRequest,
  RegistrationResponse,
  // RegistrationServer,
  getOpaqueConfig,
} from "@cloudflare/opaque-ts";

export class KeypostClient {
  public client : OpaqueClient;
  private cfg : Config;

  constructor() {
    this.cfg = getOpaqueConfig(OpaqueID.OPAQUE_P256);
    this.client = new OpaqueClient(this.cfg);
  }

  // https://github.com/cloudflare/opaque-ts/blob/main/src/messages.ts#L94-L119
  async registerInit(password : string) {
    const request = await this.client.registerInit(password);
    if (request instanceof Error) {
      throw new Error(`client failed to register: ${request}`);
    }
    let serReq = request;//.serialize()
    return serReq;
  }

  // https://github.com/cloudflare/opaque-ts/blob/main/src/messages.ts#L94-L119
  async registerFinish(serverResponse : number[], server_identity : string, client_identity : string) {
    const deserRes = RegistrationResponse.deserialize(this.cfg, serverResponse);
    const request = await this.client.registerFinish(deserRes, server_identity, client_identity);
    if (request instanceof Error) {
      throw new Error(`client failed to registerFinish: ${request}`);
    }
    // const { record, export_key } = request;
    // const serRec = record.serialize();
    return request;
  }
}