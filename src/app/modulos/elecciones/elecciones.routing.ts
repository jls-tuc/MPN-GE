import { Routes, RouterModule } from "@angular/router";
import { ReferentesComponent } from "./components/referentes/referentes.component";
import { PadronesComponent } from "./components/padrones/padrones.component";
import { IndicadoresComponent } from "./components/indicadores/indicadores.component";

export const EleccionesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "referentes",
        component: ReferentesComponent,
        data: { title: "Referentes", breadcrumb: "REFERENTES" },
      },
      {
        path: "padrones",
        component: PadronesComponent,
        data: { title: "Padrones", breadcrumb: "PADRONES" },
      },
      {
        path: "indicadores",
        component: IndicadoresComponent,
        data: { title: "Indicadores", breadcrumb: "INDICADORES" },
      },
    ],
  },
];
