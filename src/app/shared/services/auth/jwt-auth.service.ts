import { Injectable } from "@angular/core";
import { SessionStoreService } from "../session-store.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
import { UserModel } from "../../models/user.model";
import { of, BehaviorSubject, throwError, Observable } from "rxjs";
import { environment } from "environments/environment";
const apiURL = environment.apiURL;
// ================= only for demo purpose ===========

// ================= you will get those data from server =======

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  user: UserModel;
  isAuthenticated: Boolean;
  //user$ = new BehaviorSubject<UserModel>(this.user);
  currentUserSubject: BehaviorSubject<UserModel>;
  signingIn: Boolean;
  return: string;
  JWT_TOKEN: string = "Token";
  APP_USER: string = "APP-USER";

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }
  constructor(
    private ls: SessionStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.route.queryParams.subscribe(
      (params) => (this.return = params["return"] || "/")
    );
  }

  public signin(formUs) {
    this.signingIn = true;
    return this.http.post(`${apiURL}/auth/login`, formUs).pipe(
      delay(1000),
      map((res: any) => {
        // console.log("res", res);
        this.setUserAndToken(res.token, res.ok, res.foto);
        this.signingIn = false;
        return res;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );

    // FOLLOWING CODE SENDS SIGNIN REQUEST TO SERVER

    // this.signingIn = true;
    // return this.http.post(`${environment.apiURL}/auth/local`, { username, password })
    //   .pipe(
    //     map((res: any) => {
    //       this.setUserAndToken(res.token, res.user, !!res);
    //       this.signingIn = false;
    //       return res;
    //     }),
    //     catchError((error) => {
    //       return throwError(error);
    //     })
    //   );
  }

  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    /* return of(DEMO_USER).pipe(
      map((profile: User) => {
        this.setUserAndToken(this.getJwtToken(), true);
        this.signingIn = false;
        return profile;
      }),
      catchError((error) => {
        return of(error);
      })
    ); */
    /*
      The following code get user data and jwt token is assigned to
      Request header using token.interceptor
      This checks if the existing token is valid when app is reloaded
    */
    // return this.http.get(`${environment.apiURL}/api/users/profile`)
    //   .pipe(
    //     map((profile: User) => {
    //       this.setUserAndToken(this.getJwtToken(), profile, true);
    //       return profile;
    //     }),
    //     catchError((error) => {
    //       this.signout();
    //       return of(error);
    //     })
    //   );
  }

  public getUserDetails(dataToken: any): any {
    const token = dataToken;
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload);
      return payload;
    } else {
      return null;
    }
  }

  public signout() {
    this.setUserAndToken(null, false, null);
    this.ls.clear();
    this.router.navigateByUrl("sessions/signin2");
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken(): any {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: String, isAuthenticated: Boolean, foto: string) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = this.getUserDetails(token);
    sessionStorage.setItem("FOTO", foto);
    //console.log("user", this.user);
    this.currentUserSubject = new BehaviorSubject<UserModel>(this.user);

    /* this.user = user;
    this.user$.next(user); */
    this.ls.setItem(this.JWT_TOKEN, token);
    //this.ls.setItem(this.APP_USER, user);
  }
}
