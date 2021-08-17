import {
  Component,
  ChangeDetectorRef,
  OnInit,
  Inject,
  Optional,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { VotoProvService } from "../../../services/voto-prov.service";
import Swal from "sweetalert2";
import { UserModel } from "app/shared/models/user.model";
import { Observable } from "rxjs";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { GraficaService } from "../../../services/grafica.service";
import { Sort } from "@angular/material/sort";
import jsPDF from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake";

@Component({
  selector: "app-datacoord",
  templateUrl: "./datacoord.component.html",
  styleUrls: ["./datacoord.component.scss"],
})
export class DatacoordComponent implements OnInit {
  cargar: boolean = false;
  userData$: Observable<UserModel>;
  datosUser: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  votosCargados: any = {};
  totalVotos: any;
  totalDNI: any;
  duplicados: any;
  votosCoordinadores: any;
  resPlanillas: any;
  listaColumnas: string[] = [
    "organizacion",
    "nombrecompleto",
    "totalafiliados",
    "totalnoafiliados",
    "totalvotos",
  ];
  dataSource: MatTableDataSource<any>;
  sortedData: any[];
  public cargar_datos: boolean = false;
  @ViewChild("pdfTable") pdfTable: ElementRef;
  constructor(
    public auhService: JwtAuthService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private votoService: VotoProvService,
    private grafCalc: GraficaService,
    private router: Router
  ) {}
  title = "htmltopdf";

  ngOnInit(): void {
    this.cargarDatosUs();
  }
  public downloadAsPDF() {
    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
  cargarDatosUs() {
    this.grafCalc.getvotosCalculoTotal().subscribe((res: any) => {
      console.log(`Respuesta de CalculoTotal; `, res.data);
      this.votosCargados = res.data;
      this.votosCoordinadores = this.votosCargados.filter(
        (data) => data.role === "user-coord"
      );
      console.log(`this.votosCoordinadores`, this.votosCoordinadores);
      this.totalVotos = 0;
      for (let voto of this.votosCoordinadores) {
        this.totalVotos = this.totalVotos + voto.totalvotos;
        console.log(`this.totalVotos`, this.totalVotos);
      }
      console.log(`res`, res);
      this.totalDNI = res.totalDNI;
      console.log(`this.totalDNI`, this.totalDNI);
      this.duplicados = this.totalVotos - this.totalDNI;
      console.log(`Saliooooooooooo`);
      this.dataSource = new MatTableDataSource(this.votosCoordinadores);
      this.dataSource.paginator = this.paginator;
      this.cdr.markForCheck();
      this.cargar = true;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cargarPlanilla(data?) {
    this.votoService.getVotosById(data).subscribe((res: any) => {
      if (res.ok) {
        console.log(res);
        this.votosCargados = res.votosUnicos;
        this.totalVotos = res.totalV;
        this.dataSource = new MatTableDataSource(this.votosCoordinadores);
        this.dataSource.paginator = this.paginator;

        this.cdr.markForCheck();
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Por favor, verifique los datos ingresados.",
          showConfirmButton: false,
          timer: 3500,
        });
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.votosCoordinadores.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "organizacion":
          return this.compare(a.organizacion, b.organizacion, isAsc);
        case "nombrecompleto":
          return this.compare(a.nombrecompleto, b.nombrecompleto, isAsc);
        case "totalafiliados":
          return this.compare(a.totalafiliados, b.totalafiliados, isAsc);
        case "totalnoafiliados":
          return this.compare(
            a.votosCoordinadores,
            b.votosCoordinadores,
            isAsc
          );
        case "totalvotos":
          return this.compare(a.totalvotos, b.totalvotos, isAsc);

        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
