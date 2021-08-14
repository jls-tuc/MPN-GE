import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
} from "@angular/core";
import { egretAnimations } from "app/shared/animations/egret-animations";
import { LayoutService } from "app/shared/services/layout.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { VotoProvService } from "../../services/voto-prov.service";
import { JwtAuthService } from "../../../../shared/services/auth/jwt-auth.service";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  ApexPlotOptions,
  ApexDataLabels,
} from "ng-apexcharts";
import { ReferentesService } from "../../services/referentes.service";
import { filter } from "rxjs/operators";
import { UserModel } from "../../../../shared/models/user.model";
import { Observable } from "rxjs";
import { GraficaService } from "../../services/grafica.service";
import { number } from "ngx-custom-validators/src/app/number/validator";
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: "app-indicadores",
  templateUrl: "./indicadores.component.html",
  styleUrls: ["./indicadores.component.scss"],
  animations: egretAnimations,
})
export class IndicadoresComponent implements OnInit {
  //Variables Usuario
  userLog$: Observable<UserModel>;
  usuarioRol: any;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public graficaVotos;
  public graficaAfiliados;
  public graficaNoafiliados;
  public graficaMasculino;
  public graficaFemenino;
  public v_chartOptions;
  public a_chartOptions;
  public na_chartOptions;
  public f_chartOptions;
  public m_chartOptions;

  public total: number;
  public votosTotal: number = 0;
  public afiliados: number = 0;
  public femenino: number = 0;
  public masculino: number = 0;
  public noafiliados: number = 0;
  public v_datosData: number[];
  public v_labelsData: string[];
  public v_total: number = 0;
  public a_datosData: number[];
  public a_labelsData: string[];
  public a_total: number = 0;
  public na_datosData: string[];
  public na_labelsData: number[];
  public na_total: number = 0;
  fontFamily = "";
  colorsGrayGray500 = "";
  colorsGrayGray200 = "";
  colorsGrayGray300 = "";
  v_colorsThemeBase = "";
  v_colorsThemeLight = "";
  v_symbolCSSClasses = "";
  v_svgCSSClasses = "";
  a_colorsThemeBase = "";
  a_colorsThemeLight = "";
  f_colorsThemeBase = "";
  f_colorsThemeLight = "";
  m_colorsThemeBase = "";
  m_colorsThemeLight = "";
  a_symbolCSSClasses = "";
  a_svgCSSClasses = "";
  na_colorsThemeBase = "";
  na_colorsThemeLight = "";
  na_symbolCSSClasses = "";
  na_svgCSSClasses = "";
  public coordinadores: any;
  public referentes: any;
  public responsables: any;
  public operadores = false;
  calculos: any;
  constructor(
    private layout: LayoutService,
    private snack: MatSnackBar,
    private votoServ: VotoProvService,
    private usuarios: ReferentesService,
    private cdr: ChangeDetectorRef,
    public authServ: JwtAuthService,
    public grafServ: GraficaService
  ) {}
  loadLayoutView() {
    this.fontFamily = "";
    this.colorsGrayGray500 = "";
    this.colorsGrayGray200 = "";
    this.colorsGrayGray300 = "";
    this.v_colorsThemeBase = "#1a3a83";
    this.v_colorsThemeLight = "#DEE8FF";
    this.na_colorsThemeBase = "#831A2D";
    this.na_colorsThemeLight = "#FFE1E7";
    this.a_colorsThemeBase = "#1A8383";
    this.a_colorsThemeLight = "#DEFFFF";
    this.f_colorsThemeBase = "#FBFF00";
    this.f_colorsThemeLight = "#FEFFCE";
    this.m_colorsThemeBase = "#BD00F0";
    this.m_colorsThemeLight = "#F3C9FF";
  }

  async ngOnInit() {
    let Usuario: any = this.authServ.user;
    let data = {
      id: Usuario.id,
      areaResponsable: Usuario.areaResponsable,
    };
    // console.log(`data`, data)
    this.loadLayoutView();
    this.v_symbolCSSClasses = `symbol "symbol-circle" symbol-50 symbol-light-"#1A8383" mr-2`;
    this.v_svgCSSClasses = `svg-icon svg-icon-xl svg-icon-"#1A8383"`;
    this.a_symbolCSSClasses = `symbol "symbol-circle" symbol-50 symbol-light-"#1A8383" mr-2`;
    this.a_svgCSSClasses = `svg-icon svg-icon-xl svg-icon-"#1A8383"`;
    this.na_symbolCSSClasses = `symbol "symbol-circle" symbol-50 symbol-light-"#1A8383" mr-2`;
    this.na_svgCSSClasses = `svg-icon svg-icon-xl svg-icon-"#1A8383"`;
    if (
      this.authServ.user.role === "user-calc" ||
      this.authServ.user.role === "user-sys"
    ) {
      this.operadores = true;
    } else {
      this.operadores = false;
    }
    this.buscarDatosGraficaRol(data);
  }

  async buscarDatosGraficaRol(data: any) {
    this.calculos = await this.grafServ
      .getvotosGrafica(data)
      .subscribe((res: any) => {
        console.log(`Respuesta de CalculoTotal; `, res);

        this.votosTotal = res.votosTotal;
        this.afiliados = res.afiliados;
        this.femenino = res.femenino;
        this.masculino = res.masculino;
        this.noafiliados = res.noafiliados;
        this.coordinadores = res.coordinadores;
        this.referentes = res.referentes;
        this.responsables = res.responsables;
        let data = {
          v_datosData: [1, 34],
          v_labelsData: ["08 Agosto", "09 Agosto"],
          v_total: this.votosTotal,
          a_datosData: [1, 34],
          a_labelsData: ["08 Agosto", "09 Agosto"],
          a_total: this.afiliados,
          na_datosData: [1, 34],
          na_labelsData: ["08 Agosto", "09 Agosto"],
          na_total: this.noafiliados,
          femenino: this.femenino,
          masculino: this.masculino,
        };
        this.cargarGrafica(data);
        this.cdr.detectChanges();
      });
  }

  cargarGrafica(data: any) {
    this.graficaVotos = {
      baseColor: "#1a3a83",
      lightColor: "#DEE8FF",
      tituloData: "Votos Cargados",
      logoData: "assets/images/mpn/votos.png",
      cssClass: "gutter-b",
      symbolShape: "symbol-circle",
      datosData: data.v_datosData,
      labelsData: data.v_labelsData,
      total: data.v_total,
    };
    this.v_chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: this.graficaVotos.datosData,
        },
      ],
      chart: {
        type: "area",
        height: 120,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {},
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: 1,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [this.v_colorsThemeBase],
      },
      xaxis: {
        categories: this.graficaVotos.labelsData,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
        crosshairs: {
          show: false,
          position: "front",
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 55,
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: this.fontFamily,
        },
        y: {
          formatter: (val) => {
            return `$ ${val} thousands`;
          },
        },
      },
      colors: [this.v_colorsThemeLight],
      markers: {
        colors: [this.v_colorsThemeLight],
        strokeColor: [this.v_colorsThemeBase],
        strokeWidth: 3,
      },
    };
    this.graficaAfiliados = {
      baseColor: "#1A8383",
      lightColor: "#DEFFFF",
      tituloData: "Afiliados",
      logoData: "assets/images/mpn/afiliado.png",
      cssClass: "gutter-b",
      symbolShape: "symbol-circle",
      datosData: data.a_datosData,
      labelsData: data.a_labelsData,
      total: data.a_total,
    };
    this.a_chartOptions = {
      series: [
        {
          name: "Afiliados",
          data: this.graficaAfiliados.datosData,
        },
      ],
      chart: {
        type: "area",
        height: 120,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {},
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: 1,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [this.a_colorsThemeBase],
      },
      xaxis: {
        categories: this.graficaAfiliados.labelsData,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
        crosshairs: {
          show: false,
          position: "front",
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 55,
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: this.fontFamily,
        },
        y: {
          formatter: (val) => {
            return `$ ${val} thousands`;
          },
        },
      },
      colors: [this.a_colorsThemeLight],
      markers: {
        colors: [this.a_colorsThemeLight],
        strokeColor: [this.a_colorsThemeBase],
        strokeWidth: 3,
      },
    };
    this.graficaNoafiliados = {
      baseColor: "#831A2D",
      lightColor: "#FFE1E7",
      tituloData: "No Afiliados",
      logoData: "assets/images/mpn/mujer_hombre.png",
      cssClass: "gutter-b",
      symbolShape: "symbol-circle",
      datosData: data.na_datosData,
      labelsData: data.na_labelsData,
      total: data.na_total,
    };
    this.na_chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: this.graficaNoafiliados.datosData,
        },
      ],
      chart: {
        type: "area",
        height: 120,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {},
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: 1,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [this.na_colorsThemeBase],
      },
      xaxis: {
        categories: this.graficaNoafiliados.labelsData,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
        crosshairs: {
          show: false,
          position: "front",
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 55,
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: this.fontFamily,
        },
        y: {
          formatter: (val) => {
            return `$ ${val} thousands`;
          },
        },
      },
      colors: [this.na_colorsThemeLight],
      markers: {
        colors: [this.na_colorsThemeLight],
        strokeColor: [this.na_colorsThemeBase],
        strokeWidth: 3,
      },
    };
    this.graficaFemenino = {
      baseColor: "#BD00F0",
      lightColor: "#F3C9FF",
      tituloData: "No Afiliados",
      logoData: "assets/images/mpn/mujer.png",
      cssClass: "gutter-b",
      symbolShape: "symbol-circle",
      datosData: data.na_datosData,
      labelsData: data.na_labelsData,
      total: data.na_total,
    };
    this.f_chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: this.graficaNoafiliados.datosData,
        },
      ],
      chart: {
        type: "area",
        height: 120,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {},
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: 1,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [this.f_colorsThemeBase],
      },
      xaxis: {
        categories: this.graficaNoafiliados.labelsData,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
        crosshairs: {
          show: false,
          position: "front",
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 55,
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: this.fontFamily,
        },
        y: {
          formatter: (val) => {
            return `$ ${val} thousands`;
          },
        },
      },
      colors: [this.f_colorsThemeLight],
      markers: {
        colors: [this.f_colorsThemeLight],
        strokeColor: [this.f_colorsThemeBase],
        strokeWidth: 3,
      },
    };
    this.graficaMasculino = {
      baseColor: "#FBFF00",
      lightColor: "#FEFFCE",
      tituloData: "No Afiliados",
      logoData: "assets/images/mpn/no_afiliado.png",
      cssClass: "gutter-b",
      symbolShape: "symbol-circle",
      datosData: data.na_datosData,
      labelsData: data.na_labelsData,
      total: data.na_total,
    };
    this.m_chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: this.graficaNoafiliados.datosData,
        },
      ],
      chart: {
        type: "area",
        height: 120,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {},
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: 1,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [this.m_colorsThemeBase],
      },
      xaxis: {
        categories: this.graficaNoafiliados.labelsData,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
        crosshairs: {
          show: false,
          position: "front",
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 55,
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: this.fontFamily,
        },
        y: {
          formatter: (val) => {
            return `$ ${val} thousands`;
          },
        },
      },
      colors: [this.m_colorsThemeLight],
      markers: {
        colors: [this.m_colorsThemeLight],
        strokeColor: [this.m_colorsThemeBase],
        strokeWidth: 3,
      },
    };
    /*  this.chartOptions = {
       series: [data.femenino, data.masculino],
 
       chart: {
         width: 380,
         type: "pie"
       },
       plotOptions: {
         pie: {
           customScale: 0.8
         }
       },
       dataLabels: {
         enabled: true,
         enabledOnSeries: undefined,
 
         textAnchor: 'middle',
         distributed: false,
         offsetX: 0,
         offsetY: 0,
         style: {
           fontSize: '24px',
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
 
       labels: ["Femenino", "Masculino"],
       responsive: [
         {
 
           breakpoint: 480,
           options: {
             chart: {
               width: 250
             },
             legend: {
               position: 'top',
               labels: ["Femenino", "Masculino"],
             }
           }
         }
       ]
     }; */
  }
}
