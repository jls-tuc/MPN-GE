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
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { NgApexchartsModule } from "ng-apexcharts";
import * as echarts from "echarts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SharedPipesModule } from "app/shared/pipes/shared-pipes.module";
import { RespPopUpComponent } from "./components/responsablesPlanilla/resp-pop-up/resp-pop-up.component";
import { PlanillaComponent } from "./components/planilla/planilla/planilla.component";
import { ResponsablesPComponent } from "./components/responsablesPlanilla/responsables-p/responsables-p.component";
import { PopUpCoorComponent } from "./components/coordinador/pop-up-coor/pop-up-coor.component";
import { VerPlanillaComponent } from "./components/planilla/ver-planilla/ver-planilla.component";

import { MapaComponent } from "./components/mapa/mapa.component";

import { DatacoordComponent } from './components/indicadores/datacoord/datacoord.component';
import { DatarefComponent } from './components/indicadores/dataref/dataref.component';
import { DatarespComponent } from './components/indicadores/dataresp/dataresp.component';
import { VerMiPlanillaComponent } from './components/planilla/ver-mi-planilla/ver-mi-planilla.component';
import { GraficaComponent } from './components/indicadores/grafica/grafica.component';
import { CardComponent } from './components/indicadores/grafica/card/card.component';
import { PiechartComponent } from './components/indicadores/grafica/piechart/piechart.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LocalidadesComponent } from './components/indicadores/grafica/localidades/localidades.component';

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
    NgCircleProgressModule.forRoot({
      // set defaults here
      "radius": 60,
      "space": -5,
      "outerStrokeWidth": 5,
      "outerStrokeColor": "#76C2AF",
      "innerStrokeColor": "#ffffff",
      "innerStrokeWidth": 5,
      "imageSrc": "assets/images/music.svg",
      "imageHeight": 105,
      "imageWidth": 105,
      "showImage": true,
      "showBackground": false

    }),
    RouterModule.forChild(EleccionesRoutes),
  ],
  declarations: [
    ReferentesComponent,
    PadronesComponent,
    ReferentePopupComponent,
    IndicadoresComponent,
    RespPopUpComponent,
    PlanillaComponent,
    ResponsablesPComponent,
    PopUpCoorComponent,
    VerPlanillaComponent,
    DatacoordComponent,
    DatarefComponent,
    DatarespComponent,
    VerMiPlanillaComponent,
    MapaComponent,
    GraficaComponent,
    CardComponent,
    PiechartComponent,
    LocalidadesComponent,

  ],
})
export class EleccionesModule { }
