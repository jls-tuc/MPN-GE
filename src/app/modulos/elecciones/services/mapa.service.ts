import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import * as Mapboxgl from "mapbox-gl";
import { IntMapBox } from "../interfaces/map-box";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class MapaService {
  apiURL = environment.apiURL;
  mapa: Mapboxgl.Map;

  constructor(private http: HttpClient) {}

  mostrarMapa(data: IntMapBox) {
    (Mapboxgl as any).accessToken = environment.apiMapBox;
    this.mapa = new Mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: data.zoom,
      center: [data.longitud, data.latitud],
    });
    this.mapa.on("idle", () => {
      this.mapa.resize();
    });
  }

  mostarMapaDraggable(data: IntMapBox) {
    (Mapboxgl as any).accessToken = environment.apiMapBox;
    this.mapa = new Mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: data.zoom,
      center: [data.longitud, data.latitud],
    });
    this.mapa.addControl(new Mapboxgl.NavigationControl());

    const marker = new Mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([data.longitud, data.latitud])
      .addTo(this.mapa);

    marker.on("drag", () => {
      console.log(marker.getLngLat());
    });
  }

  votoXEsc(esc) {
    console.log(esc);
    let url = `${this.apiURL}/geo/votoXEsc`;
    return this.http.post(url, esc);
  }
}
