import { ChangeDetectorRef, Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExportarExcelComponent } from '../exportar-excel/exportar-excel.component';
import { PopUpEmpadronadosComponent } from './pop-up-empadronados/pop-up-empadronados.component';

@Component({
  selector: 'app-pop-up-localidades',
  templateUrl: './pop-up-localidades.component.html',
  styleUrls: ['./pop-up-localidades.component.scss']
})
export class PopUpLocalidadesComponent implements OnInit {
  localidades = []
  constructor(
    @Optional() public dialogRef: MatDialogRef<PopUpLocalidadesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.localidades = this.data.localidad
    console.log('localidades', this.localidades)
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
  }
  openDialogEmpadronados(emp?) {
    const dialogoRef: MatDialogRef<any> = this.dialog.open(
      PopUpEmpadronadosComponent,
      {
        width: "100%",
        height: "80%",
        disableClose: false,
        data: { emp },
      }
    );
    dialogoRef.afterClosed().subscribe((res) => {
      /* if (res === "closed") {
        this.router.navigate(["/afiliacion/listados"]);
      }
      this.router.navigate(["/afiliacion/listados"]); */
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
      /*   if (res === "closed") {
          this.router.navigate(["/afiliacion/listados"]);
        }
        this.router.navigate(["/afiliacion/listados"]);
        this.cdr.markForCheck(); */
    });
  }
}

