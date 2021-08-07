import { Routes, RouterModule } from "@angular/router";
import { ReferentesComponent } from "./components/referentes/referentes.component";
import { PadronesComponent } from "./components/padrones/padrones.component";
import { IndicadoresComponent } from "./components/indicadores/indicadores.component";
import { ReferentePopupComponent } from "./components/referentes/popUp/referente-popup.component";
import { PlanillaComponent } from "./components/planilla/planilla/planilla.component";
import { PopUpCoorComponent } from "./components/coordinador/pop-up-coor/pop-up-coor.component";

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
        path: "referente",
        component: ReferentePopupComponent,
        data: { title: "Referente", breadcrumb: "REFERENTE" },
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
      {
        path: "planilla",
        component: PlanillaComponent,
        data: { title: "Planillas", breadcrumb: "PLANILLAS" },
      },
      {
        path: "coordinador",
        component: PopUpCoorComponent,
        data: { title: "Coordinador", breadcrumb: "COORDINADOR" },
      },
    ],
  },
];
