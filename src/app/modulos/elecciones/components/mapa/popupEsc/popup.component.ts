import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { PopupEstEleccionComponent } from "../popupEstEleccion/popupEstEleccion.component";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.css"],
})
export class MapaPopupComponent implements OnInit {
  displayedColumns: string[] = [
    "fechaEleccion",
    "mesaNro",
    "estadoEleccion",
    "tipoEleccion",
    "ver",
  ];

  showTableMesa: boolean;
  tipoElecciones: any[];
  elecciones: any[];
  eleccionSelected: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  datos: any;
  dataSource: MatTableDataSource<any>;
  sortedData: any[];
  constructor(
    public dialogRef: MatDialogRef<MapaPopupComponent>,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Assign the data to the data source for the table to render

    dialogRef.disableClose = true;
  }
  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.datos = this.data.properties;
    this.elecciones = JSON.parse(this.datos.elecciones);
    this.tipoElecciones = [
      ...new Set(this.elecciones.map((item) => item.eleccion)),
    ];
  }

  loadTableMesa() {
    let mesas = this.elecciones.filter(
      (item) => item.eleccion === this.eleccionSelected
    );
    this.dataSource = new MatTableDataSource(mesas);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Mesas por página.";
    this.showTableMesa = true;
    this.cdr.markForCheck();
  }

  showGraficas(datosEstadisticos: any) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      PopupEstEleccionComponent,
      {
        width: "60%",
        height: "70%",
        data: datosEstadisticos,
      }
    );
    dialogRef.beforeClosed().subscribe((e) => {});
  }
}

/* */
