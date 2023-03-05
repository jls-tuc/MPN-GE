import { Injectable, OnDestroy } from "@angular/core";
import { SessionStoreService } from "../session-store.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay, finalize, switchMap } from "rxjs/operators";
import { UserModel } from "../../models/user.model";
import {
  of,
  BehaviorSubject,
  throwError,
  Observable,
  Subscription,
} from "rxjs";
import { environment } from "environments/environment";
import Swal from "sweetalert2";
import { AuthModel } from "./auth.model";
import { json } from "ngx-custom-validators/src/app/json/validator";
const apiURL = environment.apiURL;
// ================= only for demo purpose ===========

// ================= you will get those data from server =======
interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable({
  providedIn: "root",
})
export class JwtAuthService implements OnDestroy {
  private unsubscribe: Subscription[] = [];
  private isLoadingSubject: BehaviorSubject<boolean>;
  public datosUsr: any;
  token;
  user: UserModel;
  isAuthenticated: Boolean;
  currentUserSubject: BehaviorSubject<UserModel>;
  currentUser$: Observable<UserModel>;
  signingIn: Boolean;
  isLoading$: Observable<boolean>;
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
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
    this.route.queryParams.subscribe(
      (params) => (this.return = params["return"] || "/")
    );
  }

  public signin(formUs): Observable<UserModel> {
    this.isLoadingSubject.next(true);
    this.signingIn = true;
    return this.http.post(`${apiURL}/auth/login`, formUs).pipe(
      delay(1000),
      map((auth: AuthModel) => {
        this.setAuthFromSessionStorage(auth);
        return auth;
        this.signingIn = false;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `${err.error.msg}`,
          showConfirmButton: false,
          timer: 3500,
        });
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  public signout() {
    window.sessionStorage.removeItem(this.JWT_TOKEN);
    this.ls.clear();
    this.router.navigate(["sessions/signin2"], {
      queryParams: {},
    });
  }
  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  renewJwtToken(id): Observable<UserModel> {
    console.log(`Entro a Renew Token`, id);
    let url = `${apiURL}/auth/renewToken`;
    return this.http.post(url, id, { responseType: "json" }).pipe(
      delay(1000),
      map((auth: AuthModel) => {
        this.setAuthFromSessionStorage(auth);
        return auth;
        this.signingIn = false;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `${err.error.msg}`,
          showConfirmButton: false,
          timer: 3500,
        });
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  getJwtToken(): any {
    return this.ls.getItem(this.JWT_TOKEN);
  }
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
  getUserByToken(): Observable<UserModel> {
    const auth = this.getAuthFromSessionStorage();
    if (!auth) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.UserByToken(auth).pipe(
      map((user: UserModel) => {
        if (user) {
          user = this.getUserDetails();
          this.currentUserSubject = new BehaviorSubject<UserModel>(user);
        } else {
          this.signout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  setAuthFromSessionStorage(auth: AuthModel): boolean {
    if (auth && auth.token) {
      this.token = auth.token;
      this.ls.setItem(this.JWT_TOKEN, auth.token);
      sessionStorage.setItem("FOTO", auth.foto);
      this.user = this.getUserDetails(auth.token);

      return true;
    }
    return false;
  }

  public getAuthFromSessionStorage(): any {
    try {
      const authData = window.sessionStorage.getItem(this.JWT_TOKEN);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  private getFotoFromSessionStorage(): any {
    try {
      const authData = window.sessionStorage.getItem("foto");
      return authData;
    } catch (error) {
      return undefined;
    }
  }

  UserByToken(token): Observable<UserModel> {
    const user = token;

    if (!user) {
      return of(undefined);
    }

    return of(user);
  }
  private getUserDetails(dataToken?: any): any {
    const token = this.getAuthFromSessionStorage();
    const foto = this.getFotoFromSessionStorage();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload);
      payload["foto"] = foto;
      return payload;
    } else {
      return null;
    }
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
