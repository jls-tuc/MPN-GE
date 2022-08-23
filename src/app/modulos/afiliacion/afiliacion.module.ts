import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AfiliacionRoutes } from "./afiliacion.routing";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { SharedMaterialModule } from "app/shared/shared-material.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormGrupoPopupComponent } from "./componentes/GrupoAfilia/FormGrupo-popup/FromGru-popopup.component";
import { PopUpFormAfiliaComponent } from "./componentes/GrupoAfilia/Ver-Grupos/pop-up-form-afilia/formPopUpafilia.component";
import { TablaGruposComponent } from "./componentes/GrupoAfilia/Ver-Grupos/tabla-grupos.component";
import { PlanillasAfiliacionComponent } from "./componentes/GrupoAfilia/Ver-Grupos/planillas-afiliacion/planillas-afiliacion.component";
import { MenuPrincipalComponent } from "./componentes/menuPrincipal/menuPrincipal/menuPrincipal.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxEchartsModule } from "ngx-echarts";
import * as echarts from "echarts";
import { MatDialogModule } from "@angular/material/dialog";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { InfoCnePopUpComponent } from "./componentes/GrupoAfilia/InfoCne-popup/infoCnePopUp/infoCnePopUp.component";
import { DirectivesModuleModule } from "app/directives/DirectivesModule/DirectivesModule.module";
import { TablaPlanillasComponent } from "./componentes/planillasLotes/TablaPlanillas/TablaPlanillas.component";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { VerInfoPopUpComponent } from "./componentes/planillasLotes/verInfoPopUp/verInfoPopUp.component";
import { ListadosComponent } from "./componentes/listados/listados.component";
import { PopUpLocalidadesComponent } from "./componentes/listados/pop-up-localidades/pop-up-localidades.component";
import { PopUpEmpadronadosComponent } from "./componentes/listados/pop-up-localidades/pop-up-empadronados/pop-up-empadronados.component";
import { ExportarExcelComponent } from "./componentes/listados/exportar-excel/exportar-excel.component";
import { TablaInfoJuntaComponent } from "./componentes/InfoJunta/tablaInfoJunta/tablaInfoJunta.component";
import { PopUpInfoJuntaComponent } from "./componentes/InfoJunta/popUpInfoJunta/popUpInfoJunta.component";

@NgModule({
  imports: [
    DirectivesModuleModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    TranslateModule,
    NgxDatatableModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    NgApexchartsModule,
    MatDialogModule,
    MatCardModule,
    RouterModule.forChild(AfiliacionRoutes),
  ],
  declarations: [
    FormGrupoPopupComponent,
    TablaGruposComponent,
    PopUpFormAfiliaComponent,
    PlanillasAfiliacionComponent,
    MenuPrincipalComponent,
    InfoCnePopUpComponent,
    VerInfoPopUpComponent,
    TablaPlanillasComponent,
    ListadosComponent,
    PopUpLocalidadesComponent,
    PopUpEmpadronadosComponent,
    ExportarExcelComponent,
    TablaInfoJuntaComponent,
    PopUpInfoJuntaComponent,
  ],
})
export class AfiliacionModule {}
