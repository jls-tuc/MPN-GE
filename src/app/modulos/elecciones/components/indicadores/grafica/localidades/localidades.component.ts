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
  public chartOptionsNqnP: any;
  public chartOptionsNqnVP: any;
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
      console.log(`res`, res)
      this.chartOptions = this.cargarOpciones(res);
      this.chartOptionsNqn = this.cargarOpcionesNqn(res);
      this.chartOptionsNqnV = this.cargarOpcionesVotaron(res);
      this.chartOptionsNqnP = this.cargarOpcionesNqnP(res);
      this.chartOptionsNqnVP = this.cargarOpcionesVotaronP(res);
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

          data: [datos.totalVotaronNqn]
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

        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 0,
        offsetY: 0,
        labels: {
          colors: undefined,
          useSeriesColors: false
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
        itemMargin: {
          horizontal: 5,
          vertical: 0
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        },
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
  cargarOpcionesNqn(datos: any) {

    return {
      series: [
        {
          name: "Cantidad Voto Adhesión",
          data: datos.votosAdhNqn,
        },
        {
          name: "Ya votaron",

          data: [datos.totalVotaron]
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

        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 0,
        offsetY: 0,
        labels: {
          colors: undefined,
          useSeriesColors: false
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
        itemMargin: {
          horizontal: 5,
          vertical: 0
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        },
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
  cargarOpcionesVotaronP(datos: any) {
    return {
      series: [datos.totalVotaronNqn, 216138 - datos.totalVotaronNqn],
      chart: {
        width: 380,
        type: "pie"
      },
      dataLabels: {
        enabled: true,

        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 0,
        offsetY: 0,
        labels: {
          colors: undefined,
          useSeriesColors: false
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
        itemMargin: {
          horizontal: 5,
          vertical: 0
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        },
      },
      labels: ["Ya Votaron", "Habilitados en Nqn Cap"],
      colors: ["#00D51E", '#9C27B0'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  }
  cargarOpcionesNqnP(datos: any) {

    return {
      series: [datos.totalVotaron, datos.votosAdhNqn[0] - datos.totalVotaron],
      chart: {
        width: 380,
        type: "pie"
      },
      dataLabels: {
        enabled: true,

        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      labels: ["Ya Votaron", "Voto Adhesion Nqn Cap"],
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 0,
        offsetY: 0,
        labels: {
          colors: undefined,
          useSeriesColors: false
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
        itemMargin: {
          horizontal: 5,
          vertical: 0
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        },
      },
      colors: ["#00D51E", "#1a3a83"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  cargarOpciones(datos: any) {

    return {
      series: [
        {
          name: "Cantidad Voto Adhesión",
          data: datos.votosNqn,
        },
        {
          name: "Ya votaron",

          data: datos.votaronNqn
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

}