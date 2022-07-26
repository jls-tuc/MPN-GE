import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Idepartamentos, Ilocalidades, Ipadronmpn } from '../../interface/padronmpn';
import { AfiliacionService } from '../../services/afiliacion.service';
import { ExportarExcelComponent } from './exportar-excel/exportar-excel.component';
import { PopUpLocalidadesComponent } from './pop-up-localidades/pop-up-localidades.component';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.scss']
})
export class ListadosComponent implements OnInit, AfterViewInit {




  deptos: Idepartamentos[] = []
  totales: any = {}
  localidades: Ilocalidades[] = []
  public cargado: boolean = false
  constructor(
    private afiliadoService: AfiliacionService,
    public dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef,) {

    this.afiliadoService.getListadosMPN().subscribe((res: any) => {
      console.log('------data', res.deptos)
      this.deptos = res.deptos
      this.deptos.sort((a, b) => a.total > b.total ? -1 : 1)
      this.totales = res.totales
      this.cargado = true
      this.cdr.markForCheck();
    });

  }

  ngOnInit(): void {



  }
  ngAfterViewInit() {

  }
  openDialogLocalidades(localidad?) {
    const dialogoRef: MatDialogRef<any> = this.dialog.open(
      PopUpLocalidadesComponent,
      {
        width: "100%",
        height: "90%",
        disableClose: false,
        data: { localidad },
      }
    );
    dialogoRef.afterClosed().subscribe((res) => {
      if (res === "closed") {
        this.router.navigate(["/afiliacion/listados"]);
      }
      this.router.navigate(["/afiliacion/listados"]);
      this.cdr.markForCheck();
    });
  }
  openDialogExportar(localidad?) {
    const dialogoRef: MatDialogRef<any> = this.dialog.open(
      ExportarExcelComponent,
      {
        width: "40%",

        disableClose: false,
        data: { localidad },
      }
    );
    dialogoRef.afterClosed().subscribe((res) => {
      if (res === "closed") {
        this.router.navigate(["/afiliacion/listados"]);
      }
      this.router.navigate(["/afiliacion/listados"]);
      this.cdr.markForCheck();
    });
  }
}
