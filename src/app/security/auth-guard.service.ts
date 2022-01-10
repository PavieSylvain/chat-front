
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {SettingsService} from "../configuration/settings-service.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authentication: AuthService, private router: Router, private settings: SettingsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const redirectUrl = this.settings.getConfigUrl;

    if (this.authentication.getToken()) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    ).then(r => {});

    return false;
  }
}
