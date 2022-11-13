import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./shared/components/layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./shared/components/layouts/auth-layout/auth-layout.component";
import { AuthGuard } from "./shared/guards/auth.guard";

export const rootRouterConfig: Routes = [
  {
    path: "",
    redirectTo: "elecciones",
    pathMatch: "full",
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "sessions",
        loadChildren: () =>
          import("./views/sessions/sessions.module").then(
            (m) => m.SessionsModule
          ),
        data: { title: "Ingreso" },
      },
    ],
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "elecciones",
        loadChildren: () =>
          import("./modulos/elecciones/elecciones.module").then(
            (m) => m.EleccionesModule
          ),
        data: { title: "Elecciones" },
      },
      {
        path: "afiliacion",
        loadChildren: () =>
          import("./modulos/afiliacion/afiliacion.module").then(
            (m) => m.AfiliacionModule
          ),
        data: { title: "Menu Principal" },
      },
      {
        path: "admin",
        loadChildren: () =>
          import("./modulos/ADMIN/admin.module").then((m) => m.ADMINModule),
        data: { title: "Menu Principal" },
      },
    ],
  },
  {
    path: "**",
    redirectTo: "sessions/404",
  },
];
