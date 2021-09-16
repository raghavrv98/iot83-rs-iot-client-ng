import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OpenIdService } from '@app/auth/service/openid/openid.service';
import { TestIdService } from '@app/auth/service/testid/testid.service';
import {
  fireEvent,
  render,
  RenderComponentOptions,
  screen,
  waitFor,
} from '@testing-library/angular';
import {
  createMock,
  createMockWithValues,
} from '@testing-library/angular/jest-utils';
import { AuthComponent } from './auth.component';
import { OpenIdProvider } from './provider/openid/openid.provider';
import { AuthService } from './service/auth/auth.service';

const mockOpenIdService = createMock(OpenIdService);
const mockTestIdService = createMock(TestIdService);
const mockAuthService = createMockWithValues(AuthService, {
  openid: mockOpenIdService,
  testid: mockTestIdService,
});

const providersByName: Map<string, OpenIdProvider> = new Map<string, OpenIdProvider>();
const provider = {
  name: 'Test_Provider',
  displayName: 'TestProvider',
  logoSrc: 'assets/images/testLogo.png',
  clientID: 'dummyclientid',
  authorizationEndpoint: 'https://dummy.testprovider.com/authorize',
  tokenEndpoint: 'https://dummy.testprovider.com/oauth/token',
  endSessionEndpoint: 'https://dummy.testprovider.com/v2/logout',
  endSessionRedirectKey: 'returnTo',
} as OpenIdProvider;

providersByName.set(provider.name, provider);
const loginButton = 'Sign In with ' + provider.displayName;
const renderOptions = {
  declarations: [],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    { provide: AuthService, useValue: mockAuthService },
    { provide: OpenIdService, useValue: mockOpenIdService },
    { provide: TestIdService, useValue: mockTestIdService },
  ],
  componentProperties: { providersByName },
} as RenderComponentOptions<AuthComponent>;

describe('Auth Component', () => {
  it('should show all text contents', async () => {
    const title = 'RAYCHEM Supervisor';
    const tagLinePart1 = 'Welcome to the future of';
    const tagLinePart2 = 'Connection & Protection';
    await render(AuthComponent, renderOptions);
    return waitFor(() => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: tagLinePart1 })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: tagLinePart2 })
      ).toBeInTheDocument();
    });
  });

  it('should have login button', async () => {
    await render(AuthComponent, renderOptions);
    return waitFor(() => {
      expect(screen.getByText(loginButton)).toBeInTheDocument();
    });
  });

  it('check signIn button clicked ', async () => {
    await render(AuthComponent, renderOptions);
    const signIn = screen.getByText(loginButton);
    expect(fireEvent.click(signIn)).toBeTruthy();
  });
});
