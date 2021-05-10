import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem("patreontoken") || window.location.href.indexOf('https://scroll-io.stackblitz.io') === 0) {
      return true;
    }
    this.router.navigate(["/home"]);
    return false;
  }
}
