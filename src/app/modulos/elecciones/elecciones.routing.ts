import { Routes } from "@angular/router";

import { RefereteComponent } from "./components/referentes/referete.component";

export const Eleccionesroutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "referente",
        component: RefereteComponent,
        data: { title: "Referente", breadcrumb: "REFERENTE" },
      },
    ],
  },
];
