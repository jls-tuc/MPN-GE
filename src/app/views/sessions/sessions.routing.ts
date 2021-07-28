import { Routes } from "@angular/router";

import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ErrorComponent } from "./error/error.component";
import { Signin2Component } from "./signin2/signin2.component";
export const SessionsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "signin2",
        component: Signin2Component,
        data: { title: "Signin2" },
      },

      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        data: { title: "Forgot password" },
      },
      {
        path: "lockscreen",
        component: LockscreenComponent,
        data: { title: "Lockscreen" },
      },
      {
        path: "404",
        component: NotFoundComponent,
        data: { title: "Not Found" },
      },
      {
        path: "error",
        component: ErrorComponent,
        data: { title: "Error" },
      },
    ],
  },
];
