import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OpenIdService } from '@app/auth/service/openid/openid.service';
import { TestIdService } from '@app/auth/service/testid/testid.service';
import { environment } from '@env/environment';
import { of as observableOf } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

const redirectUri = location.origin + '/';
export interface IdTokenPayload {
  aud: string;
  iss: string;
  sub: string;
  exp: number;
}
const secInMillis = 1000;
const secondsSinceEpoch = (): number => Math.round(new Date().getTime() / secInMillis);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private providerName = '';
  private idToken = '';
  private idTokenPayload: IdTokenPayload | null = null;

  constructor(
    public openid: OpenIdService,
    public testid: TestIdService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.activatedRoute.queryParams
      .pipe(this.filter(), this.switchMap())
      .subscribe((response) => {
        this.processIdTokenResponse(response);
        void router.navigate(['/home']);
      });
  }

  fetchOpenIdAuthorizationCode(providerName: string): void {
    this.providerName = providerName;
    sessionStorage.setItem('provider_name', providerName);
    this.openid.getAuthorizationCode(providerName);
  }

  fetchTestIdToken(providerName: string): void {
    this.providerName = providerName;
    window.sessionStorage.setItem('provider_name', this.providerName);
    this.testid.fetchIdToken().subscribe((response) => {
      this.processIdTokenResponse(response);
      void this.router.navigate(['/home']);
    });
  }

  signOut(): void {
    this.providerName = sessionStorage.getItem('provider_name');
    if (this.providerName === '') {
      return;
    }
    sessionStorage.removeItem('provider_name');
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('refresh_token');
    this.idTokenPayload = null;
    this.idToken = '';
    if (this.providerName === 'tidp') {
      this.testid.signOut();
    } else {
      this.openid.signOut(this.providerName);
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  processIdTokenResponse(response: { id_token: string }): void {
    this.idToken = response.id_token;
    if (this.idToken === '' || !('refresh_token' in response)) {
      return;
    }
    this.parseIdTokenPayload();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const refreshToken = response['refresh_token'];
    sessionStorage.setItem('id_token', this.idToken);
    sessionStorage.setItem('refresh_token', refreshToken);
    this.setSessionTimeout();
  }

  private setSessionTimeout() {
    const time = {
      seconds: 60,
      milliseconds: 1000,
    };
    if (environment.e2e) {
      const secondsToExpiration = this.idTokenPayload.exp - secondsSinceEpoch();
      setTimeout(() => {
        if (this.providerName !== '') {
          this.openid.getAuthorizationCode(this.providerName);
        }
      }, (secondsToExpiration - time.seconds) * time.milliseconds);
    }
  }

  private parseIdTokenPayload() {
    const time = {
      hours: 10,
      minutes: 60,
      seconds: 60,
    };
    if (environment.e2e) {
      this.idTokenPayload = {
        iss: 'https://example.tidp.com/',
        sub: 'tidp|60d22eb315bb780069fff80a',
        aud: 'AKWiMO7Gwg5YlJMsser3CuZWeMxjapDw',
        exp: secondsSinceEpoch() + time.hours * time.minutes * time.seconds,
      };
    } else {
      const limit = 3;
      const index = { one: 1, };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.idTokenPayload = JSON.parse(
        atob(this.idToken.split('.', limit)[index.one])
      );
    }
  }

  private filter() {
    return filter(
      (params: Params) =>
        window.location.origin + window.location.pathname === redirectUri &&
        'code' in params &&
        'state' in params &&
        this.openid.validateAuthorizationState(params.state)
    );
  }

  private switchMap() {
    return switchMap((params: Params) => {
      this.providerName = sessionStorage.getItem('provider_name') || '';
      if (this.providerName === '') {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        return observableOf({ id_token: '' });
      }
      return this.openid.fetchIdToken(this.providerName, params.code);
    });
  }
}
