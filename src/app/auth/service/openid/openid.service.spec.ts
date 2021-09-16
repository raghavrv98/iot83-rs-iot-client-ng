/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { environment } from '@env/environment';
import { of } from 'rxjs';
import { OpenIdService } from './openid.service';

describe('OpenidService', () => {
  let service: OpenIdService;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const httpResponse = { id_token: 'test-id-token' };
  const http = {
    get: jest.fn(),
    post: jest.fn(() => of(httpResponse)),
  };
  const index = { zero: 0 };

  const mockWindowLocation = () => {
    const location = new URL('https://www.example.com');
    (location as any).assign = jest.fn();
    delete (window as any).location;
    (window as any).location = location;
    return location;
  };

  beforeEach(() => {
    sessionStorage.clear();
    service = new OpenIdService(http as any);
  });

  it('should get authorization code and address', () => {
    const location = mockWindowLocation();
    service.getAuthorizationCode(environment.openid.providers[index.zero].name);
    const state = sessionStorage.getItem('state');
    const codeVerifier = sessionStorage.getItem('code_verifier');
    expect(state).toBeTruthy();
    expect(codeVerifier).toBeTruthy();
    expect(window.location.origin).toEqual(location.origin);
  });

  it('should validate state returned from autorization server', () => {
    const testStateValue = 'test_state';
    sessionStorage.setItem('state', testStateValue);
    const success = service.validateAuthorizationState(testStateValue);
    expect(success).toBe(true);
  });

  it('should be failed if state is not set in session', () => {
    const testStateValue = 'test_state';
    const success = service.validateAuthorizationState(testStateValue);
    expect(success).toBe(false);
  });

  it('should be failed if invalid state returned from autorization server', () => {
    const invalidStateValue = 'invalid_state';
    const sessionStateValue = 'valid_state';
    sessionStorage.setItem('state', sessionStateValue);
    const success = service.validateAuthorizationState(invalidStateValue);
    expect(success).toBe(false);
  });

  it('should fetch id token from autorization server', () => {
    const providerName = environment.openid.providers[index.zero].name;
    const code = 'test-code';
    history.pushState = jest.fn();
    const response = service.fetchIdToken(providerName, code);
    response.subscribe((data) =>
      expect(data.id_token).toEqual(httpResponse.id_token)
    );
  });

  it('should signout from authorization server', () => {
    const location = mockWindowLocation();
    const providerName = environment.openid.providers[index.zero].name;
    history.pushState = jest.fn();
    service.signOut(providerName);
    expect(window.location.origin).toEqual(location.origin);
  });
});
