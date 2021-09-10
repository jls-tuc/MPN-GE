import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

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
import { timer } from 'rxjs';
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit, AfterViewInit {
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;
  listaColumnas: string[] = [
    "organizacion",
    "nombrecompleto",
    "totalvotos",
    "votaron",
    "porcentaje",
  ];

  @ViewChild(MatSort) sort: MatSort;
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
  votosReferentes: any;
  totalVotos: number;
  votaron: number;
  novotaron: number;
  porVotaron: number;
  pornoVotaron: number;
  totalDNI: any;
  duplicados: number;
  timeLeft: number = 600;
  interval;
  valor = 10000;
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
  ngAfterViewInit(): void {

    //this.showDate();

    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    console.log(`reiniciooooo`)
    this.buscarDatosGraficaRol(this.grafServ.data);
    this.cargarDatosUs();
    this.startTimer();
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.minutes = Math.trunc(this.timeLeft / 60);
        this.seconds = this.timeLeft % 60;
        this.timeLeft--;
      } else {
        this.timeLeft = 600;
        let usr = {
          id: this.grafServ.data.id
        }
        this.authServ.renewJwtToken(usr);
        this.buscarDatosGraficaRol(this.grafServ.data);
        this.cargarDatosUs();
        this.cdr.detectChanges();
        this.cdr.markForCheck();
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  async buscarDatosGraficaRol(data: any) {
    let usr = this.authServ.getUser();
    console.log(`Daaaaata :`, data)
    this.calculos = await this.grafServ
      .getvotosGraficaEleccion(data)
      .subscribe((res: any) => {
        console.log(`res`, res)
        this.votosTotal = res.votosTotal;
        if (res.votaron === null) { this.votaron = 0; } else { this.votaron = res.votaron; };
        this.novotaron = this.votosTotal - this.votaron;
        this.porVotaron = res.porcentaje.toFixed(2);
        this.pornoVotaron = (100 - this.porVotaron);
        this.grafVotos = {
          baseColor: "#1a3a83",
          baseColorLigth: "#DEE8FF",
          tituloData: "Votos Cargados DNI",
          logoData: "/assets/images/mpn/mujer_hombre.png",
          datosData: [this.votosTotal],
          porcentaje: 100,
          labelsData: ["Votos Cargados"],
          cardColor: "#F0F4FE",
          mostrar: false,
        }
        this.grafVotosVoto = {
          baseColor: "#00D51E",
          baseColorLigth: "#ABFFB7",
          tituloData: "Ya Votaron",
          logoData: "/assets/images/mpn/votos.png",
          datosData: [this.votaron],
          porcentaje: this.porVotaron,
          labelsData: ["Votos Cargados"],
          cardColor: "#EDFFFF",
          mostrar: true,
        }
        this.grafVotosFalta = {
          baseColor: "#FF0000",
          baseColorLigth: "#FFE1E7",
          tituloData: "Faltan Votar",
          logoData: "/assets/images/mpn/no_votar.png",
          datosData: [this.novotaron],
          porcentaje: this.pornoVotaron,
          labelsData: ["Votos Cargados"],
          cardColor: "#FFF0F3",
          mostrar: true,
        }

        this.cdr.detectChanges();
        this.cdr.markForCheck();
      });
  }
  cargarDatosUs() {
    console.log(`El usuario es: `, this.grafServ.data)
    let role = {
      usuario: this.grafServ.data.role,
      id: this.grafServ.data.id
    }
    if (this.grafServ.data.role === "user-sys" || this.grafServ.data.role === "user-calc") {
      console.log(`entro a sys calc`, role)
      this.grafServ.getvotosCalculoEleccion(role).subscribe((res: any) => {
        console.log(`Respuesta de CalculoTotal; `, res.data);
        this.votosCargados = res.data;
        this.votosCoordinadores = this.votosCargados.filter(
          (data) => data.role === "user-coord" && data.totalvotos !== 0
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
        console.log(`this.votosCoordinadores`, this.votosCoordinadores)
        this.dataSource = new MatTableDataSource(this.votosCoordinadores);
        this.dataSource.paginator = this.paginator;
        this.cargar = true;
        this.cdr.detectChanges();
        this.cdr.markForCheck();
      });
    } else {
      console.log(`entro a sys calc`)
      this.grafServ.getvotosCalculoEleccion(role).subscribe((res: any) => {
        console.log(`Respuesta de CalculoTotal; `, res.data);
        this.votosCargados = res.data;
        this.votosCoordinadores = this.votosCargados.filter(
          (data) => data.role === "user-ref" || data.role === "user-coord"
        );
        console.log(`this.votosCoordinadores`, this.votosCoordinadores);
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
        console.log(`this.votosCoordinadores`, this.votosCoordinadores)
        this.dataSource = new MatTableDataSource(this.votosCoordinadores);
        this.dataSource.paginator = this.paginator;
        this.cargar = true;
        this.cdr.detectChanges();
        this.cdr.markForCheck();
      });
    }
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
