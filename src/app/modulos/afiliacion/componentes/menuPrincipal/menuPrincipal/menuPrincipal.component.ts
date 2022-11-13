import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { AfiliacionService } from "app/modulos/afiliacion/services/afiliacion.service";
import { Subject, Observable } from "rxjs";
import { egretAnimations } from "app/shared/animations/egret-animations";

@Component({
  selector: "app-menuPrincipal",
  templateUrl: "./menuPrincipal.component.html",
  styleUrls: ["./menuPrincipal.component.scss"],
  animations: egretAnimations,
})
export class MenuPrincipalComponent {
  private data$: Subject<any>;
  private lotes$: Subject<any>;
  private afEstado$: Subject<any>;
  totalesLotes: number[] = [];
  totalAf: number;
  totalAfiliados: number[] = [];
  proxAfiliar: number;
  afiRechazados: number;
  view: [number, number] = [700, 400];
  afiliado: any[];
  infoLote: any[];
  legendTitle: string = "Categorías";
  // options x 2 graficos Afiliados y Lotes

  showLabels: boolean = true;
  isDoughnut: boolean = false;
  // options in commun
  gradient: boolean = true;
  showLegend: boolean = true;
  // options  graficos x barras
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "Seccionales";
  showYAxisLabel: boolean = true;
  yAxisLabel: string = "Afiliados";
  animations: boolean = true;
  //variable de datos grafico seccionales
  multi: any[];
  viewBarras: [number, number] = [1300, 700];
  colorScheme = {
    domain: ["#A9F5A9", "#F5BCA9", "#819FF7", "#F78181"],
  };

  constructor(private afiliadoService: AfiliacionService) {
    this.data$ = new Subject();
    this.lotes$ = new Subject();
    this.afEstado$ = new Subject();
    this.afiliadoService.estdisticaAfiliado().subscribe((res: any) => {
      let datos = [
        {
          name: "Femenino",
          value: res.totalFemenino,
        },
        {
          name: "Masculino",
          value: res.totalMasculino,
        },
        {
          name: "Otro",
          value: res.totalOtro,
        },
      ];
      this.data$.next(datos);
    });
    this.afiliadoService.getIndica().subscribe((res: any) => {
      let datos = [
        {
          name: "Pendientes",
          value: res.ltePendientes | 0,
        },
        {
          name: "Cerrados",
          value: res.lteCerrados,
        },
        {
          name: "Presentados",
          value: res.ltePresentados,
        },
      ];
      this.lotes$.next(datos);
    });
    this.afiliadoService.grafAfiliadosEstados().subscribe((res: any) => {
      //    console.log(res);
      this.afEstado$.next(res.grafico);
    });
  }
  get single$(): Observable<any> {
    return this.data$.asObservable();
  }
  get dataLotes$(): Observable<any> {
    return this.lotes$.asObservable();
  }

  get afEstados$() {
    return this.afEstado$.asObservable();
  }

  onSelectBar(event) {
    // console.log(event);
  }

  onSelect(data): void {
    //console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //  console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.single$.subscribe((data: any) => {
      this.afiliado = data;
    });

    this.lotes$.subscribe((data: any) => {
      this.infoLote = data;
    });
    this.afEstados$.subscribe((data: any) => {
      this.multi = data;
    });
  }
}
