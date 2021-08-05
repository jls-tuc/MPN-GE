import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReferentesComponent } from "./components/referentes/referentes.component";
import { EleccionesRoutes } from "./elecciones.routing";
import { SharedModule } from "app/shared/shared.module";
import { PadronesComponent } from "./components/padrones/padrones.component";
import { ReferentePopupComponent } from "./components/referentes/popUp/referente-popup.component";
import { SharedMaterialModule } from "app/shared/shared-material.module";
import { IndicadoresComponent } from "./components/indicadores/indicadores.component";
import { GraficasComponent } from "./components/graficas/graficas.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { NgApexchartsModule } from "ng-apexcharts";
import * as echarts from "echarts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SharedPipesModule } from "app/shared/pipes/shared-pipes.module";
import { RespPopUpComponent } from './components/responsablesPlanilla/resp-pop-up/resp-pop-up.component';
import { PlanillaComponent } from './components/planilla/planilla/planilla.component';
import { ResponsablesPComponent } from './components/responsablesPlanilla/responsables-p/responsables-p.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    CommonModule,
    FlexLayoutModule,
    ChartsModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    NgApexchartsModule,
    NgxDatatableModule,
    SharedPipesModule,
    RouterModule.forChild(EleccionesRoutes),
  ],
  declarations: [
    ReferentesComponent,
    PadronesComponent,
    ReferentePopupComponent,
    IndicadoresComponent,
    GraficasComponent,
    RespPopUpComponent,
    PlanillaComponent,
    ResponsablesPComponent,
  ],
})
export class EleccionesModule {}
