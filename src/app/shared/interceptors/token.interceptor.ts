import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { JwtAuthService } from "../services/auth/jwt-auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private jwtAuth: JwtAuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string = this.jwtAuth.token || this.jwtAuth.getJwtToken();
    if (!token) {
      return next.handle(req);
    }
    const headers = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });
    //console.log(`headers`, headers);
    return next.handle(headers).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 300) {
          this.router.navigateByUrl("/sessions/signin2");
        }

        return throwError(err);
      })
    );
  }
}
