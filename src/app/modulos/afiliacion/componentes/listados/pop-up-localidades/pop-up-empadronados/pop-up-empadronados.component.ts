import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface planillaData {
  analfabeto: string;
  apellido: string;
  circuito: string;
  clase: string;
  codCircuito: string;
  codSeccion: string;
  domicilio: string;
  estadoActualElector: string;
  estadoAfiliacion: string;
  fechaAfiliacion: string;
  fechaDomicilio: string;
  fechaNacimiento: string;
  genero: string;
  matricula: string;
  nombre: string;
  profesion: string;
  seccion: string;
  tipoDocumento: string;

}

@Component({
  selector: 'app-pop-up-empadronados',
  templateUrl: './pop-up-empadronados.component.html',
  styleUrls: ['./pop-up-empadronados.component.scss']
})

export class PopUpEmpadronadosComponent implements AfterViewInit {
  dataSource: MatTableDataSource<planillaData>;
  listaColumnas: string[] = [
    "matricula",
    "apellido",
    "nombre",
    "domicilio",
    "genero",

  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  empadronados = []
  empPag = []
  constructor(
    @Optional() public dialogRef: MatDialogRef<PopUpEmpadronadosComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.empadronados = this.data.emp
    this.empPag = this.empadronados

  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.empPag);
    console.log('empadronados', this.empadronados)
    this.paginator._intl.itemsPerPageLabel = "Empadronados";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.markForCheck();
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log(this.dataSource.filter);
  }

}
