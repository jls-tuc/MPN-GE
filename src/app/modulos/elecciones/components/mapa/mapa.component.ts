import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as Mapboxgl from "mapbox-gl";
import { IntMapBox } from "../../interfaces/map-box";
import { MapaService } from "../../services/mapa.service";

@Component({
  selector: "app-mapa",
  templateUrl: "./mapa.component.html",
  styleUrls: ["./mapa.component.css"],
})
export class MapaComponent implements OnInit {
  escuelas: any = {};
  public datosGeo: any;
  mapa: Mapboxgl.Map;
  dataGeom: any[];

  datosMapbox: IntMapBox = {
    latitud: -38.951667,
    longitud: -68.074444,
    zoom: 7,
    mapTypeId: "roadmap",
  };
  constructor(private http: HttpClient, private mapBox: MapaService) {}
  options = {
    types: [],
    componentRestrictions: { country: "ARG" },
  };
  ngOnInit(): void {
    this.mapBox.mostrarMapa(this.datosMapbox);
  }
}
