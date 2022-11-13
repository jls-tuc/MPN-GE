import { Component, Inject, OnInit, Optional, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: "app-popupEstEleccion",
  templateUrl: "./popupEstEleccion.component.html",
  styleUrls: ["./popupEstEleccion.component.scss"],
})
export class PopupEstEleccionComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(
    @Optional() public dialogRef: MatDialogRef<PopupEstEleccionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.chartOptions = {
      series: [
        {
          name: "Total",
          data: [
            this.data.votosMesa,
            this.data.afiliado,
            this.data.independientes,
            this.data.masculino,
            this.data.femenino,
            this.data.otro,
          ],
        },
        {
          name: "Votaron",
          data: [
            this.data.votaron,
            this.data.votaronA,
            this.data.votaron - this.data.votaronA,
            this.data.votaron - this.data.votaronF - this.data.votaronO,
            this.data.votaronF,
            this.data.votaronO,
          ],
        },
        {
          name: "Pendientes",
          data: [
            this.data.votosMesa - this.data.votaron,
            this.data.afiliado - this.data.votaronA,
            ,
            this.data.independientes - (this.data.votaron - this.data.votaronA),
            this.data.masculino -
              (this.data.votaron - this.data.votaronF - this.data.votaronO),
            this.data.femenino - this.data.votaronF,
            this.data.otro - this.data.votaronO,
          ],
        },
      ],

      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],

      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: "category",

        categories: [
          "Padron",
          "Afiliados",
          "Independientes",
          "Masculino",
          "Femenino",
          "Otros",
        ],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },

      /* fill: {
        opacity: 1,
        colors: ["#00E396", "#008FFB"],
      } */
    };
  }
}
