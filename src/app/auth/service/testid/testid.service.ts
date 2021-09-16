import { Injectable } from '@angular/core';
import { TestIdProvider } from '@app/auth/provider/testid/testid.provider';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';

const redirectUri = location.origin;

@Injectable({
  providedIn: 'root',
})
export class TestIdService {
  provider: TestIdProvider | null;
  tidp = false;

  constructor() {
    this.provider = environment.testid.provider;
    if (environment.e2e) {
      this.tidp = true;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  fetchIdToken(): Observable<{ id_token: string }> {
    return of({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_token: 'test.id-payload.token',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      refresh_token: 'test-refresh-token',
    });
  }

  signOut(): void {
    window.location.assign(redirectUri);
  }
}
