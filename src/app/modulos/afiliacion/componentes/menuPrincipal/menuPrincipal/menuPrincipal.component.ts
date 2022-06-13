import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewChild,
} from "@angular/core";
import { AfiliacionService } from "app/modulos/afiliacion/services/afiliacion.service";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-menuPrincipal",
  templateUrl: "./menuPrincipal.component.html",
  styleUrls: ["./menuPrincipal.component.scss"],
})
export class MenuPrincipalComponent {
  @ViewChild("chart") chart: ChartComponent;

  totalLotes: number;
  totalLotesPresentados: number;
  totalLotesCerrados: number;
  totalAfiliados: number;
  proxAfiliar: number;
  afiRechazados: number;

  public chartOptions: Partial<ChartOptions>;

  constructor(private afiliadoService: AfiliacionService) {
    this.afiliadoService.getIndica().subscribe((res: any) => {
      (this.totalLotes = res.totalLotes),
        (this.totalLotesPresentados = res.ltePresentados);
      this.totalLotesCerrados = res.lteCerrados;
      this.totalAfiliados = res.totalAfiliados;
      this.proxAfiliar = res.proxAfiliados;
      this.afiRechazados = 0;
    });
    this.chartOptions = {
      series: [
        {
          name: "Afiliados",
          data: [10, 41, 35, 51, 49, 62, 69, 74, 79, 86, 99, 120],
        },
      ],
      chart: {
        height: 350,
        type: "bar",
      },
      title: {
        text: "Nuevos afiliados",
      },
      xaxis: {
        categories: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
      },
    };
  }

  ngOnInit() {}
}
