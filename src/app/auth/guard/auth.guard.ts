import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const idToken = sessionStorage.getItem('id_token');
    const signedIn = idToken === '' || idToken === null ? false : true;
    const index = { zero: 0 };
    const url = state.url.replace(/\//g, '').split('?')[index.zero];
    return this.validateAndNavigate(url, signedIn);
  }

  private validateAndNavigate = (url: string, signedIn: boolean): boolean => {
    if (['', 'login'].includes(url)) {
      if (signedIn) {
        void this.router.navigate(['home']);
      } else {
        return true;
      }
    }
    if (!signedIn) {
      void this.router.navigate(['login']);
    }
    return true;
  };
}
