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
import { VotoProvService } from '../../../services/voto-prov.service';
import Swal from "sweetalert2";
import { UserModel } from "app/shared/models/user.model";
import { Observable } from "rxjs";
import { JwtAuthService } from "../../../../../shared/services/auth/jwt-auth.service";
import { GraficaService } from "../../../services/grafica.service";
import { Sort } from "@angular/material/sort";
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { ReferentesService } from '../../../services/referentes.service';
import { OnDestroy } from '@angular/core';

@Component({
  selector: "app-dataref",
  templateUrl: "./dataref.component.html",
  styleUrls: ["./dataref.component.scss"],
})
export class DatarefComponent implements OnInit {
  cargar: boolean = true;
  userData$: Observable<UserModel>;
  datosUser: any;
  userID: any;
  users: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  votosCargados: any = {};
  totalVotos: number = 0;
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
  @ViewChild('pdfTable') pdfTable: ElementRef;
  usuario: any;
  calculos: any;
  suscrip: any;
  constructor(
    public auth: JwtAuthService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private votoService: VotoProvService,
    private grafCalc: GraficaService,
    private router: Router,
    private referenteService: ReferentesService
  ) {

  }
  title = 'htmltopdf';

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

  async cargarDatosUs() {
    let data = {
      usr: this.auth.user
    }

    await this.grafCalc.getvotosCalculoTotalCoord(data).subscribe((res: any) => {
      console.log(`Respuesta de CalculoTotal; `, res.data);
      this.votosCargados = res.data;

      for (let voto of this.votosCargados) {
        this.totalVotos = this.totalVotos + voto.totalvotos;
        console.log(`this.totalVotos`, this.totalVotos);
      }

      console.log(`Saliooooooooooo`);
      this.dataSource = new MatTableDataSource(this.votosCargados);
      this.dataSource.paginator = this.paginator;
    });
    this.cdr.markForCheck();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.votosCargados.slice();
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
            a.votosCargados,
            b.votosCargados,
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
