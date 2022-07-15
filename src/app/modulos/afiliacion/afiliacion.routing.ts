import { Routes } from "@angular/router";

import { AltaLoteComponent } from "./componentes/GrupoAfilia/alta-lote/alta-lote.component";
import { TablaGruposComponent } from "./componentes/GrupoAfilia/Ver-Grupos/tabla-grupos.component";
import { TablaInfoJuntaComponent } from "./componentes/InfoJunta/tablaInfoJunta/tablaInfoJunta.component";
import { MenuPrincipalComponent } from "./componentes/menuPrincipal/menuPrincipal/menuPrincipal.component";
import { TablaPlanillasComponent } from "./componentes/planillasLotes/TablaPlanillas/TablaPlanillas.component";

export const AfiliacionRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "analitica",
        component: MenuPrincipalComponent,
        data: {
          title: "Datos Analiticos",
        },
      },
      {
        path: "lote",
        component: AltaLoteComponent,
        data: {
          title: "Crear Lote de Afiliación",
        },
      },
      {
        path: "lotes",
        component: TablaGruposComponent,
        data: {
          title: "Crear Afiliciación",
        },
      },
      {
        path: "planillas",
        component: TablaPlanillasComponent,
        data: {
          title: "Planillas",
        },
      },
      {
        path: "junta",
        component: TablaInfoJuntaComponent,
        data: {
          title: "Planillas",
        },
      },
    ],
  },
];
