import { Component } from '@angular/core';
import { environment } from '@env/environment';
import { OpenIdProvider } from './provider/openid/openid.provider';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  providersByName: Map<string, OpenIdProvider> = new Map<string, OpenIdProvider>();
  constructor(public auth: AuthService) {
    this.providersByName = auth.openid.providersByName;
  }

  signIn(providerName: string): void {
    if (environment.e2e) {
      this.auth.fetchTestIdToken(providerName);
    } else {
      this.auth.fetchOpenIdAuthorizationCode(providerName);
    }
  }

  signOut(): void {
    this.auth.signOut();
  }
}
