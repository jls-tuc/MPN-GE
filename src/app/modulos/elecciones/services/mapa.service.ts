import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import * as Mapboxgl from "mapbox-gl";
import { IntMapBox } from "../interfaces/map-box";
import { HttpClient } from "@angular/common/http";
import { MapaPopupComponent } from "../components/mapa/popup/popup.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
@Injectable({
  providedIn: "root",
})
export class MapaService {
  apiURL = environment.apiURL;
  mapa: Mapboxgl.Map;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

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

  graficosDonas(dataGeo?) {
    const total1 = ["<", ["get", "votaron"], 80];
    const total2 = [
      "all",
      [">=", ["get", "votaron"], 80],
      ["<", ["get", "votaron"], 150],
    ];
    const total3 = [
      "all",
      [">=", ["get", "votaron"], 150],
      ["<", ["get", "votaron"], 300],
    ];
    const total4 = [
      "all",
      [">=", ["get", "votaron"], 300],
      ["<", ["get", "votaron"], 400],
    ];
    const total5 = [">=", ["get", "votaron"], 500];

    const colors = ["#e31a1c", "#e36e1a", "#e3ad1a", "#e3d21a", "#109c14"];

    this.mapa.on("load", () => {
      this.mapa.addSource("places", {
        type: "geojson",
        data: dataGeo,
        cluster: true,
        clusterRadius: 25,
        clusterProperties: {
          // keep separate counts for each magnitude category in a cluster
          total1: ["+", ["case", total1, 1, 0]],
          total2: ["+", ["case", total2, 1, 0]],
          total3: ["+", ["case", total3, 1, 0]],
          total4: ["+", ["case", total4, 1, 0]],
          total5: ["+", ["case", total5, 1, 0]],
        },
      });
      // Add a layer showing the places.
      this.mapa.addLayer({
        id: "places",
        type: "circle",
        source: "places",
        filter: ["!=", "cluster", true],
        paint: {
          "circle-color": [
            "case",
            total1,
            colors[0],
            total2,
            colors[1],
            total3,
            colors[2],
            total4,
            colors[3],

            colors[4],
          ],
          "circle-opacity": 0.8,
          "circle-radius": 22,
        },
      });
      this.mapa.addLayer({
        id: "id_places",
        type: "symbol",
        source: "places",
        filter: ["!=", "cluster", true],
        layout: {
          "text-field": [
            "number-format",
            ["get", "votaron"],
            { "min-fraction-digits": 0, "max-fraction-digits": 3 },
          ],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": [
            "case",
            ["<", ["get", "votaron"], 3],
            "black",
            "white",
          ],
        },
      });

      // Create a popup, but don't add it to the map yet.
      const popup = new Mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      this.mapa.on("click", "places", (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description =
          e.features[0].properties.establecimiento +
          e.features[0].properties.total +
          e.features[0].properties.votaron;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        let dialogRef: MatDialogRef<any> = this.dialog.open(
          MapaPopupComponent,
          {
            width: "37%",
            height: "35%",
            data: e.features[0],
          }
        );
        dialogRef.keydownEvents().subscribe((event) => {
          if (event.key === "Escape") {
            dialogRef.close();
          }
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        this.mapa.on("mouseenter", "places", () => {
          this.mapa.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        this.mapa.on("mouseleave", "places", () => {
          this.mapa.getCanvas().style.cursor = "";
        });
      });
    });
  }

  ////endPoint

  votoXEsc(esc) {
    // console.log(esc);
    let url = `${this.apiURL}/geo/votoXEsc`;
    return this.http.post(url, esc);
  }

  getDataGEo() {
    // console.log(esc);
    let url = `${this.apiURL}/geo/votoXEsc`;
    return this.http.get(url);
  }
}
