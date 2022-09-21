import {
  // AKEExportKeyPair,
  // AuthClient,
  // AuthServer,
  Config,
  // CredentialFile,
  // ExpectedAuthResult,
  //   KE1,
  KE2,
  //   KE3,
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
    return request;
  }

  // https://github.com/cloudflare/opaque-ts/blob/main/src/messages.ts#L94-L119
  async registerFinish(serverResponse : number[], server_identity : any, client_identity : any) {
    const deserRes = RegistrationResponse.deserialize(this.cfg, serverResponse);
    const request = await this.client.registerFinish(deserRes, server_identity, client_identity);
    if (request instanceof Error) {
      throw new Error(`client failed to registerFinish: ${request}`);
    }
    return request;
  }

  async loginInit(password : string) {
    const ke1 = await this.client.authInit(password);
    if (ke1 instanceof Error) {
      throw new Error(`client failed to authInit: ${ke1}`);
    }
    return ke1;
  }

  async loginFinish(serverResponse : number[], server_identity : any, client_identity : any, context : any) {
    const deser_ke2 = KE2.deserialize(this.cfg, serverResponse);
    const finClient = await this.client.authFinish(deser_ke2, server_identity, client_identity, context);
    if (finClient instanceof Error) {
      throw new Error(`client failed to authFinish: ${finClient}`); // FIXME Error: client failed to authFinish: Error: handshake error
    }
    return finClient;
  }
}