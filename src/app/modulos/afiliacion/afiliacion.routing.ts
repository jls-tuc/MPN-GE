import { Routes } from "@angular/router";
import { TablaGruposComponent } from "./componentes/GrupoAfilia/Ver-Grupos/tabla-grupos.component";
import { ListadosComponent } from "./componentes/listados/listados.component";
import { TablaInfoJuntaComponent } from "./componentes/InfoJunta/tablaInfoJunta/tablaInfoJunta.component";
import { MenuPrincipalComponent } from "./componentes/menuPrincipal/menuPrincipal/menuPrincipal.component";
import { TablaPlanillasComponent } from "./componentes/planillasLotes/TablaPlanillas/TablaPlanillas.component";

export const AfiliacionRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "lotes",
        component: TablaGruposComponent,
        data: {
          title: "Andministración de  Lotes y Afiliciación",
        },
      },
      {
        path: "analitica",
        component: MenuPrincipalComponent,
        data: {
          title: "Datos Analiticos",
        },
      },

      {
        path: "junta",
        component: TablaInfoJuntaComponent,
        data: {
          title: "Juntas",
        },
      },
      {
        path: "listados",
        component: ListadosComponent,
        data: {
          title: "Listados de Empadronados",
          path: "junta",
          component: TablaInfoJuntaComponent,
          data: {
            title: "Planillas",
          },
        },
      },
      /* {
        path: "planillas",
        component: TablaPlanillasComponent,
        data: {
          title: "Planillas",
        },
      }, */
    ],
  },
];
