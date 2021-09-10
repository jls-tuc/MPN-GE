import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GraficaService } from 'app/modulos/elecciones/services/grafica.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};
@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.scss']
})
export class LocalidadesComponent implements OnInit, AfterViewInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: any;
  public chartOptionsNqn: any;
  public datos: any = [];
  public datosa: any = [];
  constructor(private cdr: ChangeDetectorRef,
    public authServ: JwtAuthService,
    public grafServ: GraficaService,) {

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.datos = this.grafServ.getvotosLocalidad().subscribe((res: any) => {
      console.log(`Los datos que llegan son: constructor`, this.grafServ.dataLocalidad)
      this.chartOptions = this.cargarOpciones(res);
      this.chartOptionsNqn = this.cargarOpcionesNqn(res);
      this.cdr.detectChanges();
      this.cdr.markForCheck();
    });

  }

  cargarOpciones(datos: any) {

    return {
      series: [
        {
          name: "Cantidad Voto Adhesión",
          data: datos.votosAdh,
        },
        {
          name: "Ya votaron",

          data: datos.votaronAdh
        }
      ],
      chart: {
        type: "bar",
        height: 5000
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: datos.labels
      }
    }
  };
  cargarOpcionesNqn(datos: any) {

    return {
      series: [
        {
          name: "Cantidad Voto Adhesión",
          data: datos.votosAdhNqn,
        },
        {
          name: "Ya votaron",

          data: [8900]
        }
      ],
      chart: {
        type: "bar",
        height: 200
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: datos.labelsNqn
      }
    }
  };
}