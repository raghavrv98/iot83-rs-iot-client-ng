import { Router } from '@angular/router';
import { OpenIdService } from '@app/auth/service/openid/openid.service';
import { TestIdService } from '@app/auth/service/testid/testid.service';
import { environment } from '@env/environment';
import { of } from 'rxjs';
import { AuthService, IdTokenPayload } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const activatedRoute = {
    queryParams: of({ code: '', state: '' }),
  };
  let router: Router;
  const http = {
    get: jest.fn(),
  };
  const idTokenPayload = {
    aud: '',
    iss: '',
    sub: '',
    exp: 999999999,
  } as IdTokenPayload;

  beforeEach(() => {
    sessionStorage.clear();
    service = new AuthService(
      /* eslint-disable @typescript-eslint/no-explicit-any */
      new OpenIdService(http as any),
      new TestIdService(),
      /* eslint-disable @typescript-eslint/no-explicit-any */
      activatedRoute as any,
      router
    );
  });

  it('should fetch openid authorization code', () => {
    const index = { zero: 0 };
    service.openid.getAuthorizationCode = jest.fn();
    service.fetchOpenIdAuthorizationCode(environment.openid.providers[index.zero].name);
    const providerName = sessionStorage.getItem('provider_name');
    expect(providerName).toEqual(environment.openid.providers[index.zero].name);
  });

  it('should sign out from the application', () => {
    service.openid.signOut = jest.fn();
    sessionStorage.setItem('provider_name', 'TestProvider');
    sessionStorage.setItem('id_token', 'TestTokenValue');
    service.signOut();
    const providerName = sessionStorage.getItem('provider_name');
    const idToken = sessionStorage.getItem('id_token');
    expect(providerName).toEqual(null);
    expect(idToken).toEqual(null);
  });

  it('should create session if id_token and refresh_token is valid', () => {
    JSON.parse = jest.fn(() => idTokenPayload);
    service.openid.getAuthorizationCode = jest.fn();
    const response = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_token: 'test.id.token',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      refresh_token: 'test-refresh-token',
    };
    service.processIdTokenResponse(response);
    const idToken = sessionStorage.getItem('id_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    expect(idToken).toEqual(response.id_token);
    expect(refreshToken).toEqual(response.refresh_token);
  });

  it('should not create session if id_token is blank', () => {
    const response = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_token: '',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      refresh_token: 'test-refresh-token',
    };
    service.processIdTokenResponse(response);
    const idToken = sessionStorage.getItem('id_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    expect(idToken).toEqual(null);
    expect(refreshToken).toEqual(null);
  });

  it('should not create session if refresh_token not in response', () => {
    const response = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_token: '',
    };
    service.processIdTokenResponse(response);
    const idToken = sessionStorage.getItem('id_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    expect(idToken).toEqual(null);
    expect(refreshToken).toEqual(null);
  });
});
