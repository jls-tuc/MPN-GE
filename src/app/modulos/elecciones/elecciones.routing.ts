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

import { MapaComponent } from "./components/mapa/mapa.component";

import { GraficaComponent } from "./components/indicadores/grafica/grafica.component";

import { LocalidadesComponent } from "./components/indicadores/grafica/localidades/localidades.component";
import { VerPlanillaEleccionComponent } from "./components/planilla/ver-planilla-eleccion/ver-planilla-eleccion.component";

import { Title } from "@angular/platform-browser";
import { PopupComponent } from "./components/cargar-voto/popup/popup/popup.component";
import { GrafActaEscrutinioComponent } from "./components/cargar-voto/GrafActaEscrutinio.component";
import { CargarActaEscrutinioComponent } from "./components/cargar-voto/CargarActaEscrutinio/CargarActaEscrutinio.component";
import { CargarChasquiComponent } from "./components/cargar-voto/cargarChasqui/cargarChasqui.component";
import { IntencionVotoComponent } from "./components/cargar-voto/graficos/intencionVoto/intencionVoto.component";

export const EleccionesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "referentes",
        component: ReferentesComponent,
        data: { title: "Referentes", breadcrumb: "REFERENTES" },
        runGuardsAndResolvers: "always",
      },
      {
        path: "referente",
        component: ReferentePopupComponent,
        data: { title: "Referente", breadcrumb: "REFERENTE" },
        runGuardsAndResolvers: "always",
      },
      {
        path: "padrones",
        component: PadronesComponent,
        data: { title: "Padrones", breadcrumb: "PADRONES" },
        runGuardsAndResolvers: "always",
      },
      {
        path: "indicadores",
        component: IndicadoresComponent,
        data: { title: "Indicadores", breadcrumb: "INDICADORES" },
        runGuardsAndResolvers: "always",
      },
      {
        path: "planilla",
        component: PlanillaComponent,
        data: { title: "Planillas", breadcrumb: "PLANILLAS" },
        runGuardsAndResolvers: "always",
      },
      {
        path: "verPlanillas",
        component: VerPlanillaComponent,
        data: { title: "Planillas", breadcrumb: "INFORMACION CARGADA" },
        runGuardsAndResolvers: "always",
      },
      {
        path: "verPlanilla",
        component: VerMiPlanillaComponent,
        data: { title: "Planilla", breadcrumb: "VER MI PLANILLA" },
        runGuardsAndResolvers: "always",
      },
      {
        path: "verPlanillaEleccion",
        component: VerPlanillaEleccionComponent,
        data: {
          title: "Planilla Eleccion",
          breadcrumb: "VER PLANILLA ELECCION",
        },
        runGuardsAndResolvers: "always",
      },
      {
        path: "coordinador",
        component: PopUpCoorComponent,
        data: { title: "Coordinador", breadcrumb: "COORDINADOR" },
        runGuardsAndResolvers: "always",
      },
      {
        path: "calculototal",
        component: DatacoordComponent,
        data: { title: "Estadisticas Totales", breadcrumb: "ESTADISTICAS" },
        runGuardsAndResolvers: "always",
      },
      {
        path: "calculototalref",
        component: DatarefComponent,
        data: {
          title: "Estadisticas Totales Referentes",
          breadcrumb: "ESTADISTICAS REFERENTES",
        },
        runGuardsAndResolvers: "always",
      },
      {
        path: "calculototalresp",
        component: DatarespComponent,
        data: {
          title: "Estadisticas Totales Responsables",
          breadcrumb: "ESTADISTICAS RESPONSABLES",
        },
        runGuardsAndResolvers: "always",
      },
      {
        path: "mapa",
        component: MapaComponent,
        data: {
          title: "Mapas de votates por escuelas/localidades",
          breadcrumb: "Mapa de calor",
        },
        runGuardsAndResolvers: "always",
      },
      {
        path: "graficaeleccion",
        component: GraficaComponent,
        data: {
          title: "Estadisticas Totales de la Eleccion",
          breadcrumb: "ESTADISTICAS ELECCION",
        },
        runGuardsAndResolvers: "always",
      },

      {
        path: "graficosEscrutinio",
        component: GrafActaEscrutinioComponent,
        data: {
          title:
            "Graficos del escrutinio, por localidad, establecimiento y mesa",
          breadcrumb: "Graficos Escrutinio",
        },
        runGuardsAndResolvers: "always",
      },
      {
        path: "cargarActa",
        component: CargarActaEscrutinioComponent,
        data: {
          title: "Acta de resultado definitivo por mesa",
          breadcrumb: "Carga de escrutinio definitivos.",
        },
        runGuardsAndResolvers: "always",
      },
      {
        path: "cargarChasqui",
        component: CargarChasquiComponent,
        data: {
          title: "Participación del electorado",
          breadcrumb: "Carga de chasqui enviados por las escuelas.",
        },
        runGuardsAndResolvers: "always",
      },
      {
        path: "indicadoresPart",
        component: IntencionVotoComponent,
        data: {
          title: "Participación del electorado",
          breadcrumb: "intencionVoto",
        },
        runGuardsAndResolvers: "always",
      },
      {
        path: "popupCargarVoto",
        component: PopupComponent,
        data: {
          title: "Cargar Orden",
          breadcrumb: "Cargar Orden",
        },
        runGuardsAndResolvers: "always",
      },
      {
        path: "localidades",
        component: LocalidadesComponent,
        data: {
          title: "Estadisticas por Localidad de la Eleccion",
          breadcrumb: "ESTADISTICAS ELECCION LOCALIDAD",
        },
        runGuardsAndResolvers: "always",
      },
    ],
  },
];
