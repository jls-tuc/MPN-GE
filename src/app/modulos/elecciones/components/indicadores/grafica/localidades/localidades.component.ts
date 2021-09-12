import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GraficaService } from 'app/modulos/elecciones/services/grafica.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import {
  ApexAxisChartSeries,
  ApexChart,

  ApexResponsive,
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
  public chartOptionsNqnV: any;
  public datos: any = [];
  public datosa: any = [];
  cargar: boolean = false;
  constructor(private cdr: ChangeDetectorRef,
    public authServ: JwtAuthService,
    public grafServ: GraficaService,) {

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.datos = this.grafServ.getvotosLocalidad().subscribe((res: any) => {
      this.cargar = false;
      let votoNqn = this.grafServ.getvotosLocalidadNqn();
      this.chartOptions = this.cargarOpciones(res);
      this.chartOptionsNqn = this.cargarOpcionesNqn(res);
      this.chartOptionsNqnV = this.cargarOpcionesVotaron(votoNqn);
      this.cargar = true;
      this.cdr.detectChanges();
      this.cdr.markForCheck();
    });

  }
  cargarOpcionesVotaron(datos: any) {
    return {
      series: [
        {
          name: "Habilitados para Votar en NEUQUEN CAPITAL",
          data: [216138],
        },
        {
          name: "Ya votaron",

          data: [datos]
        }
      ],
      chart: {
        type: "bar",
        height: 200
      },
      colors: ['#9C27B0', "#00D51E"],
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
        categories: ["HABILITADOS NQN CAP"]
      }
    }
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

          data: datos.votaronAdhNqn
        }
      ],
      chart: {
        type: "bar",
        height: 200
      },
      colors: ["#1a3a83", "#00D51E"],
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
        categories: ["ADHESION NQN CAP"]
      }
    }
  };
}