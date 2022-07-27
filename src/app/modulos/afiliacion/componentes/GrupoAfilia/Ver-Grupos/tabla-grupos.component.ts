import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { IGruposAfiliados } from "app/modulos/afiliacion/interface/GrupoInterface";
import { AfiliacionService } from "app/modulos/afiliacion/services/afiliacion.service";
import { PlanillasAfiliacionComponent } from "./planillas-afiliacion/planillas-afiliacion.component";
import { PopUpFormAfiliaComponent } from "./pop-up-form-afilia/formPopUpafilia.component";
import { Subject, Observable } from "rxjs";

@Component({
  selector: "app-tabla-grupos",
  templateUrl: "./tabla-grupos.component.html",
  styleUrls: ["./tabla-grupos.component.scss"],
})
export class TablaGruposComponent implements OnInit {
  public lotes: IGruposAfiliados = [];
  private grupos$: Subject<IGruposAfiliados>;
  cargarBarra: boolean;
  oclAnterior: boolean;
  cargando: boolean;
  buscarLte: boolean;
  private page$: Subject<number>;
  npage: number;
  nroLte:string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private afiliadoService: AfiliacionService
  ) {
    this.grupos$ = new Subject();

    this.page$ = new Subject();
  }

  ngOnInit(): void {
    this.cargarGrupos();
    this.getGrupo$().subscribe((lot) => {
      this.lotes = lot;
      this.cargarBarra = true;
    });
    this.getPages$().subscribe((page) => {
      this.npage = page + 1;
    });
  }

  openDialogAfiliar(nroLote?, isNew?) {
    let title = isNew ? "Alta de Planilla" : "Modificar Planilla";
    const dialogoRef: MatDialogRef<any> = this.dialog.open(
      PopUpFormAfiliaComponent,
      {
        width: "90%",
        height: "80%",
        disableClose: false,
        data: { title, nroLote },
      }
    );
    dialogoRef.afterClosed().subscribe((res) => {
      if (res.length) {
        this.grupos$.next(res);
        this.router.navigate(["/afiliacion/lotes"]);
      }
      this.router.navigate(["/afiliacion/lotes"]);
    });
  }
  openDialogPlanillas(planillas?) {
    const dialogoRef: MatDialogRef<any> = this.dialog.open(
      PlanillasAfiliacionComponent,
      {
        width: "100%",
        height: "80%",
        disableClose: false,
        data: { planillas },
      }
    );
    dialogoRef.afterClosed().subscribe((res) => {
      if (res === "closed") {
        this.router.navigate(["/afiliacion/lotes"]);
      }
      this.router.navigate(["/afiliacion/lotes"]);
      this.cdr.markForCheck();
    });
  }

  cargarGrupos() {
    this.afiliadoService.getAllGrupos().subscribe((res: any) => {
      this.grupos$.next(res.data);
      this.page$.next(res.page);
      this.cargando = true;
    });
  }

  getGrupo$(): Observable<IGruposAfiliados> {
    return this.grupos$.asObservable();
  }
  getPages$(): Observable<number> {
    return this.page$.asObservable();
  }

  siguiente() {
    this.cargando = false;
    this.afiliadoService.getAllGrupos(this.npage).subscribe((res: any) => {
      this.grupos$.next(res.data);
      this.page$.next(res.page);
      this.oclAnterior = true;
      this.cargando = true;
    });
  }

  anterior() {
    this.cargando = false;

    let pagina = this.npage - 2;

    this.afiliadoService.getAllGrupos(pagina).subscribe((res: any) => {
      this.grupos$.next(res.data);
      this.page$.next(res.page);
      this.cargando = true;
      if (pagina === 1) {
        this.oclAnterior = false;
        this.cargando = true;
      }
    });
  }
  filtLte() {
    this.buscarLte = true;
  }
  value() {
    var slider = document.getElementById("nroLte");
    var val = document.getElementById("nroLte");
    console.log(slider);
    console.log(val);
  }
  volver() {
    this.buscarLte = false;
    this.ngOnInit();
  }
}
