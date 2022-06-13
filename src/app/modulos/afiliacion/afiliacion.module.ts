import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AltaLoteComponent } from "./componentes/GrupoAfilia/alta-lote/alta-lote.component";
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
import { SoloNumerosDirective } from "app/directives/solo-numeros.directive";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { InfoCnePopUpComponent } from "./componentes/GrupoAfilia/InfoCne-popup/infoCnePopUp/infoCnePopUp.component";
import { DirectivesModuleModule } from "app/directives/DirectivesModule/DirectivesModule.module";

@NgModule({
  imports: [
    DirectivesModuleModule,
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
    AltaLoteComponent,
    FormGrupoPopupComponent,
    TablaGruposComponent,
    PopUpFormAfiliaComponent,
    PlanillasAfiliacionComponent,
    MenuPrincipalComponent,
    InfoCnePopUpComponent,
  ],
})
export class AfiliacionModule {}
