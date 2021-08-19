import { Routes, RouterModule } from "@angular/router";
import { ReferentesComponent } from "./components/referentes/referentes.component";
import { PadronesComponent } from "./components/padrones/padrones.component";
import { IndicadoresComponent } from "./components/indicadores/indicadores.component";
import { ReferentePopupComponent } from "./components/referentes/popUp/referente-popup.component";
import { PlanillaComponent } from "./components/planilla/planilla/planilla.component";
import { PopUpCoorComponent } from "./components/coordinador/pop-up-coor/pop-up-coor.component";
import { VerPlanillaComponent } from "./components/planilla/ver-planilla/ver-planilla.component";
import { DatacoordComponent } from "./components/indicadores/datacoord/datacoord.component";
import { DatarefComponent } from "./components/indicadores/dataref/dataref.component";
import { DatarespComponent } from "./components/indicadores/dataresp/dataresp.component";
import { VerMiPlanillaComponent } from "./components/planilla/ver-mi-planilla/ver-mi-planilla.component";

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
        path: "verPlanillas",
        component: VerPlanillaComponent,
        data: { title: "Planillas", breadcrumb: "INFORMACION CARGADA" },
      },
      {
        path: "verPlanilla",
        component: VerMiPlanillaComponent,
        data: { title: "Planilla", breadcrumb: "VER MI PLANILLA" },
      },
      {
        path: "coordinador",
        component: PopUpCoorComponent,
        data: { title: "Coordinador", breadcrumb: "COORDINADOR" },
      },
      {
        path: "calculototal",
        component: DatacoordComponent,
        data: { title: "Estadisticas Totales", breadcrumb: "ESTADISTICAS" },
      },
      {
        path: "calculototalref",
        component: DatarefComponent,
        data: {
          title: "Estadisticas Totales Referentes",
          breadcrumb: "ESTADISTICAS REFERENTES",
        },
      },
      {
        path: "calculototalresp",
        component: DatarespComponent,
        data: {
          title: "Estadisticas Totales Responsables",
          breadcrumb: "ESTADISTICAS RESPONSABLES",
        },
      },
    ],
  },
];
