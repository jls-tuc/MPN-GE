import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Sort } from "@angular/material/sort";
import { GraficaService } from 'app/modulos/elecciones/services/grafica.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { IgraficaTarjeta } from '../../../interfaces/grafica.interface';
import { VotoProvService } from 'app/modulos/elecciones/services/voto-prov.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from "sweetalert2";
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  cargar: boolean = false;
  dataSource: MatTableDataSource<any>;
  sortedData: any[];
  public grafVotos: IgraficaTarjeta;
  public grafVotosVoto: IgraficaTarjeta;
  public grafVotosFalta: IgraficaTarjeta;
  public cssClass = "";
  public symbolShape = "";
  public baseColor = "#8C8C8C";
  public baseColorLigth = "#DCDCDC";
  public tituloData = "Prueba";
  public datosData = 10000;
  public logoData = "assets/images/mpn/votos.png";
  votosTotal: any;
  afiliados: any;
  femenino: any;
  masculino: any;
  noafiliados: any;
  coordinadores: any;
  referentes: any;
  responsables: any;
  calculos: any;
  votosCargados: any;
  votosCoordinadores: any;
  totalVotos: number;
  totalDNI: any;
  duplicados: number;
  listaColumnas: string[] = [
    "organizacion",
    "nombrecompleto",
    "totalafiliados",
    "totalnoafiliados",
    "totalvotos",
  ];
  constructor(private cdr: ChangeDetectorRef,
    public authServ: JwtAuthService,
    public grafServ: GraficaService,
    public dialog: MatDialog, private votoService: VotoProvService,) {

    let Usuario: any = this.authServ.user;
    let data = {
      id: Usuario.id,
      areaResponsable: Usuario.areaResponsable,
      role: Usuario.role,
    };
    this.grafServ.data = data;
  }

  ngOnInit(): void {

    this.buscarDatosGraficaRol(this.grafServ.data);
    this.cargarDatosUs();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  async buscarDatosGraficaRol(data: any) {
    let usr = this.authServ.getUser();
    console.log(``,)
    this.calculos = await this.grafServ
      .getvotosGrafica(data)
      .subscribe((res: any) => {
        console.log(`res`, res)
        this.votosTotal = res.coordinadores;
        this.afiliados = res.referentes;
        this.femenino = res.responsables;
        this.grafVotos = {
          baseColor: "#1a3a83",
          baseColorLigth: "#DEE8FF",
          tituloData: "Votos Cargados",
          logoData: "assets/images/mpn/mujer_hombre.png",
          datosData: [this.votosTotal],
          labelsData: ["Votos Cargados"],
        }
        this.grafVotosVoto = {
          baseColor: "#1A8383",
          baseColorLigth: "#DEFFFF",
          tituloData: "Ya Votaron",
          logoData: "assets/images/mpn/votos.png",
          datosData: [this.afiliados],
          labelsData: ["Votos Cargados"],
        }
        this.grafVotosFalta = {
          baseColor: "#831A2D",
          baseColorLigth: "#FFE1E7",
          tituloData: "Faltan Votar",
          logoData: "assets/images/mpn/no_votar.png",
          datosData: [this.femenino],
          labelsData: ["Votos Cargados"],
        }

        this.cdr.detectChanges();
      });
  }
  cargarDatosUs() {
    this.grafServ.getvotosCalculoTotal().subscribe((res: any) => {
      //  console.log(`Respuesta de CalculoTotal; `, res.data);
      this.votosCargados = res.data;
      this.votosCoordinadores = this.votosCargados.filter(
        (data) => data.role === "user-coord"
      );
      // console.log(`this.votosCoordinadores`, this.votosCoordinadores);
      this.totalVotos = 0;
      for (let voto of this.votosCoordinadores) {
        this.totalVotos = this.totalVotos + voto.totalvotos;
        //   console.log(`this.totalVotos`, this.totalVotos);
      }
      //console.log(`res`, res)
      this.totalDNI = res.totalDNI;
      //console.log(`this.totalDNI`, this.totalDNI);
      this.duplicados = this.totalVotos - this.totalDNI;
      //   console.log(`Saliooooooooooo`);
      this.dataSource = new MatTableDataSource(this.votosCoordinadores);
      this.dataSource.paginator = this.paginator;
      this.cdr.markForCheck();
      this.cargar = true;
    });
  }
  cargarPlanilla(data?) {
    this.votoService.getVotosById(data).subscribe((res: any) => {
      if (res.ok) {
        //   console.log(res);
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
