/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { OpenIdProvider } from '../../provider/openid/openid.provider';
import { TextEncoder } from 'text-decoding';

const redirectUri = location.origin;

const radix = 16;
const from = -2;
const dec2hex = (dec: number) => ('0' + dec.toString(radix)).substr(from);

@Injectable({
  providedIn: 'root',
})
export class OpenIdService {
  providersByName: Map<string, OpenIdProvider> = new Map<string, OpenIdProvider>();
  private provider: OpenIdProvider;
  private refreshToken = '';

  constructor(private http: HttpClient) {
    for (const provider of environment.openid
      .providers as Array<OpenIdProvider>) {
      this.register(provider.name, provider);
    }
  }

  register(providerName: string, provider: OpenIdProvider): void {
    this.providersByName.set(providerName, provider);
  }

  getAuthorizationCode(providerName: string): void {
    const provider = this.providersByName.get(providerName);
    if (provider) {
      this.provider = provider;
      void this.authorizationAddress(this.provider).then((address) => {
        window.location.assign(address);
      });
    }
  }

  validateAuthorizationState(state: string): boolean {
    const sessionState = window.sessionStorage.getItem('state');
    if (sessionState === undefined || sessionState === null) {
      return false;
    }
    if (state !== sessionState) {
      return false;
    }
    return true;
  }

  fetchIdToken(
    providerName: string,
    code: string
  ): Observable<{ id_token: string }> {
    const provider = this.providersByName.get(providerName);
    const queryParams = {
      client_id: provider.clientID,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code,
      code_verifier: window.sessionStorage.getItem('code_verifier'),
      refresh_token: this.refreshToken,
    };
    const document = httpBuildQuery(queryParams);
    const index = { zero: 0 };
    const href = window.location.href;
    history.pushState(null, '', href.split('?')[index.zero]);
    return this.http.post<{ id_token: string }>(
      provider.tokenEndpoint,
      document,
      {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }

  signOut(providerName: string): void {
    const provider = this.providersByName.get(providerName);
    const joinChar: string = this.joinQueryParams(provider.endSessionEndpoint);
    const queryParams = {
      client_id: provider.clientID,
      [provider.endSessionRedirectKey]: redirectUri,
    };
    const document = httpBuildQuery(queryParams);
    window.location.assign(provider.endSessionEndpoint + joinChar + document);
  }

  private authorizationAddress(provider: OpenIdProvider): Promise<string> {
    return this.authorizationQuery(provider).then((query) => {
      const joinChar: string = this.joinQueryParams(
        provider.authorizationEndpoint
      );
      return provider.authorizationEndpoint + joinChar + query;
    });
  }

  private joinQueryParams(endpoint: string) {
    let joinChar: string;
    if (endpoint.includes('?')) {
      joinChar = '&';
    } else {
      joinChar = '?';
    }
    return joinChar;
  }

  private authorizationQuery(provider: OpenIdProvider): Promise<string> {
    const stateLength = 10;
    const codeVerifierLength = 50;
    const state = getRandomString(stateLength);
    const codeVerifier = getRandomString(codeVerifierLength);
    sessionStorage.setItem('state', state);
    sessionStorage.setItem('code_verifier', codeVerifier);
    return computeChallenge(codeVerifier).then((challenge) => {
      const queryParams = {
        response_type: 'code',
        client_id: provider.clientID,
        redirect_uri: redirectUri,
        scope: 'profile openid offline_access',
        state,
        code_challenge: challenge,
        code_challenge_method: 'S256',
      };
      return httpBuildQuery(queryParams);
    });
  }
}

const getRandomString = (length: number) => {
  const num = {
    zero: 0,
    two: 2,
  };
  const uIntArray = new Uint8Array(Math.ceil(length / num.two));
  crypto.getRandomValues(uIntArray);
  const randomString = Array.from(uIntArray, dec2hex).join('');
  return randomString.slice(num.zero, length);
};

/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const computeChallenge = (str: string) => {
  const buffer = new TextEncoder().encode(str);
  return crypto.subtle.digest('SHA-256', buffer).then((arrayBuffer) => {
    const uIntArray = new Uint8Array(arrayBuffer);
    const hash = String.fromCharCode(...uIntArray);
    const b64u = stringToBase64Url(hash);
    return b64u;
  });
};

const stringToBase64Url = (str: string): string => {
  const b64 = btoa(str);
  return base64ToBase64Url(b64);
};

const base64ToBase64Url = (b64: string): string =>
  b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const httpBuildQuery = (
  obj: Record<string, string | number | boolean>
): string => {
  const queryParams = [];
  for (const [key, value] of Object.entries(obj)) {
    queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  }
  return queryParams.join('&');
};
