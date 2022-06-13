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

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { VotoProvService } from "../../../services/voto-prov.service";
import Swal from "sweetalert2";
import { UserModel } from "app/shared/models/user.model";
import { Observable } from "rxjs";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { ReferentesService } from "../../../services/referentes.service";
import jsPDF from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake";

@Component({
  selector: "app-ver-planilla-eleccion",
  templateUrl: "./ver-planilla-eleccion.component.html",
  styleUrls: ["./ver-planilla-eleccion.component.css"],
})
export class VerPlanillaEleccionComponent implements OnInit {
  userData$: Observable<UserModel>;
  datosUser: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("pdfTable") pdfTable: ElementRef;
  votosCargados: any = {};
  totalVotos: any = {};
  resPlanillas: any;
  coord = false;
  cargar_referentes = false;
  cargar_votos = false;
  lisReferentes: any[] = [];
  referentes: any[] = [];
  listaColumnas: string[] = [
    "res",
    "dni",
    "nombreCompleto",
    "telefono",
    "localidad",
    "establecimiento",
    "mesa",
    "voto",
  ];
  dataSource: MatTableDataSource<any>;
  sortedData: any[];
  public cargar_datos: boolean = false;
  constructor(
    @Optional() public dialogRef: MatDialogRef<VerPlanillaEleccionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public auhService: JwtAuthService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private votoService: VotoProvService,
    private refService: ReferentesService,
    private router: Router
  ) {
    (this.userData$ = this.auhService.currentUserSubject.asObservable()),
      (this.datosUser = this.userData$);
    let Usuario: any = this.auhService.user;
    let dataUsr = {
      id: Usuario.id,
      areaResponsable: Usuario.areaResponsable,
      role: Usuario.role,
    };
    this.auhService.datosUsr = dataUsr;
  }

  ngOnInit(): void {
    if (this.auhService.datosUsr.role === "user-coord") {
      this.cargarReferentes(this.auhService.datosUsr);
      this.cargar_referentes = true;

      this.cargarHtml(this.auhService.datosUsr);
    } else {
      this.cargarDatosUs();
    }
  }
  async cargarReferentes(data?: any) {
    const params: {} = `id=${data.id}`;
    await this.refService.getReferente(params).subscribe(async (res: any) => {
      this.referentes = res.resp;
      console.log("users", this.referentes);
      for (let ref of this.referentes) {
        let refTemp = {
          value: ref._id,
          viewValue: `${ref.datosPersonales.apellido} ${ref.datosPersonales.nombres}`,
        };
        await this.lisReferentes.push(refTemp);
      }
    });
    this.cargar_referentes = true;
  }
  async cargarDatosUs() {
    //console.log(this.data.data);
    if (this.data != null && this.data.data.role === "user-ref") {
      await this.cargarHtml(this.data.data);
      const consulta: any = `consulta=${"Referente"}&valor=${
        this.resPlanillas._id
      }`;
      this.listaColumnas = [
        "res",
        "dni",
        "nombreCompleto",
        "telefono",
        "localidad",
        "establecimiento",
        "mesa",
        "voto",
      ];
      this.cargarPlanilla(consulta);
    } else if (this.data != null && this.data.data.role === "user-resp") {
      await this.cargarHtml(this.data.data);
      const consulta: any = `consulta=${"Resplanilla"}&valor=${
        this.resPlanillas._id
      }`;
      this.cargarPlanilla(consulta);
    } else {
      if (this.datosUser.source._value.role === "user-ref") {
        //console.log("estoy");
        this.resPlanillas = {
          _id: this.datosUser.source._value.id,
          nombres: this.datosUser.source._value.nombres,
          apellido: this.datosUser.source._value.apellido,
          localidad: this.datosUser.source._value.localidad,
        };
        const consulta: {} = `consulta=${"Referente"}&valor=${
          this.resPlanillas._id
        }`;
        this.cargarPlanilla(consulta);
      } else if (this.datosUser.source._value.role === "user-coord") {
        this.coord = true;

        this.listaColumnas = [
          "ref",
          "res",
          "dni",
          "nombreCompleto",
          "telefono",
          "localidad",
          "establecimiento",
          "mesa",
          "voto",
        ];
        this.resPlanillas = {
          _id: this.datosUser.source._value.id,
          nombres: this.datosUser.source._value.nombres,
          apellido: this.datosUser.source._value.apellido,
          localidad: this.datosUser.source._value.localidad,
        };
        const consulta: {} = `consulta=${"Coord"}&valor=${
          this.resPlanillas._id
        }`;

        this.cargarPlanilla(consulta);
      }
    }
  }
  async cargarReferente(data: any) {
    console.log(`data`, data);
    this.coord = false;

    this.listaColumnas = [
      "res",
      "dni",
      "nombreCompleto",
      "telefono",
      "localidad",
      "establecimiento",
      "mesa",
      "voto",
    ];
    const consulta: {} = `consulta=${"Referente"}&valor=${data}`;

    await this.cargarPlanilla(consulta);
    this.coord = true;
  }
  cargarHtml(data) {
    if (data.role === "user-ref") {
      this.cargar_datos = true;
      this.resPlanillas = {
        _id: data._id,
        nombres: data.datosPersonales.nombres,
        apellido: data.datosPersonales.apellido,
        localidad: data.datosPersonales.localidad,
      };
      //console.log(this.resPlanillas);
    } else {
      this.cargar_datos = true;
      this.resPlanillas = {
        _id: data._id,
        nombres: data.nombres,
        apellido: data.apellido,
        localidad: data.localidad,
      };
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  async cargarPlanilla(data?) {
    this.cargar_votos = false;
    await this.votoService.getvotosFaltan(data).subscribe((res: any) => {
      if (res.ok) {
        console.log(res);
        this.votosCargados = res.votosUnicos;
        this.totalVotos = res.totalV;
        this.dataSource = new MatTableDataSource(this.votosCargados);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      this.cargar_votos = true;
    });
  }
  public downloadAsPDF() {
    const doc = new jsPDF("l", "mm", "a4");

    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = {
      content: html,
      pageSize: "A4",
      pageOrientation: "landscape",
    };
    pdfMake.createPdf(documentDefinition).open();
  }
}
