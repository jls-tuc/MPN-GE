import { Routes, RouterModule } from "@angular/router";
import { ReferentesComponent } from "./components/referentes/referentes.component";

export const EleccionesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "referentes",
        component: ReferentesComponent,
        data: { title: "Referentes", breadcrumb: "REFERENTES" },
      },
    ],
  },
];
