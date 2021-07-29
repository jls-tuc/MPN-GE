import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { JwtAuthService } from "../services/auth/jwt-auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtAuth: JwtAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //  console.log("Esoty en el Guard", this.jwtAuth.isLoggedIn());
    if (this.jwtAuth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/sessions/signin2"], {
        queryParams: {
          return: state.url,
        },
      });
      return false;
    }
  }
}
