import { Routes } from "@angular/router";
import { TablaUsuariosComponent } from "./componentes/tablaUsuarios/tablaUsuarios.component";

export const AdminRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "usuarios",
        component: TablaUsuariosComponent,
        data: {
          title: "Listados de usuarios",
        },
      },
    ],
  },
];
