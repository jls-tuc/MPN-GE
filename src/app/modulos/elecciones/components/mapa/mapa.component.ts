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
  places = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          icon: "theatre",
        },
        geometry: {
          type: "Point",
          coordinates: [-77.038659, 38.931567],
        },
      },
      {
        type: "Feature",
        properties: {
          icon: "theatre",
        },
        geometry: {
          type: "Point",
          coordinates: [-77.003168, 38.894651],
        },
      },
      {
        type: "Feature",
        properties: {
          icon: "bar",
        },
        geometry: {
          type: "Point",
          coordinates: [-77.090372, 38.881189],
        },
      },
      {
        type: "Feature",
        properties: {
          icon: "bicycle",
        },
        geometry: {
          type: "Point",
          coordinates: [-77.052477, 38.943951],
        },
      },
      {
        type: "Feature",
        properties: {
          icon: "music",
        },
        geometry: {
          type: "Point",
          coordinates: [-77.031706, 38.914581],
        },
      },
      {
        type: "Feature",
        properties: {
          icon: "music",
        },
        geometry: {
          type: "Point",
          coordinates: [-77.020945, 38.878241],
        },
      },
      {
        type: "Feature",
        properties: {
          icon: "music",
        },
        geometry: {
          type: "Point",
          coordinates: [-77.007481, 38.876516],
        },
      },
    ],
  };
  filterGroup = document.getElementById("filter-group");

  constructor(private http: HttpClient, private mapBox: MapaService) {}
  options = { types: [], componentRestrictions: { country: "ARG" } };
  ngOnInit(): void {
    this.mapBox.mostrarMapa(this.datosMapbox);
    this.cargarCapaDonas();
  }

  cargarCapaDonas() {
    this.mapBox.getDataGEo().subscribe((res: any) => {
      //console.log(res);
      this.mapBox.graficosDonas(res.dataGeo);
    });
  }
}
