export interface OpenIdProvider {
  name: string;
  displayName: string;
  logoSrc: string;
  configurationURL: string;
  clientID: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  endSessionEndpoint: string;
  endSessionRedirectKey: string;
}
