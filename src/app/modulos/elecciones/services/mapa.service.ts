import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import * as Mapboxgl from "mapbox-gl";
import { IntMapBox } from "../interfaces/map-box";
import { HttpClient } from "@angular/common/http";
import { MapaPopupComponent } from "../components/mapa/popupEsc/popup.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { PopupCircuitosComponent } from "../components/mapa/popupCirc/popupCircuitos/popupCircuitos.component";
@Injectable({
  providedIn: "root",
})
export class MapaService {
  apiURL = environment.apiURL;
  mapa: Mapboxgl.Map;
  escAct: boolean = false;
  circAct: boolean = false;
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

    /*  marker.on("drag", () => {
      console.log(marker.getLngLat());
    }); */
  }

  graficosDonas(dataGeo?, circuitosJson?) {
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

    const colors = ["#ecf0f1", "#e36e1a", "#e3ad1a", "#e3d21a", "#109c14"];

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
      this.mapa.addSource("states", {
        type: "geojson",
        data: circuitosJson,
      });

      // Add a layer showing the places.
      this.mapa.addLayer({
        id: "places",
        type: "circle",
        source: "places",
        filter: ["!=", "cluster", true],
        layout: {
          // Make the layer visible by default.
          visibility: "visible",
        },
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
          "circle-opacity": 1,
          "circle-radius": 10,
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
      this.mapa.addLayer({
        id: "states-layer",
        type: "fill",
        source: "states",
        layout: {
          // Make the layer visible by default.
          visibility: "visible",
        },
        paint: {
          "fill-outline-color": "#484896",
          "fill-color": ["get", "color"],
          "fill-opacity": ["get", "colorOutline"],
        },
      });
      // Create a popup, but don't add it to the map yet.
      const popup = new Mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      this.mapa.on("mouseenter", "states-layer", () => {
        this.mapa.getCanvas().style.cursor = "pointer";
      });

      // Change the cursor back to a pointer
      // when it leaves the states layer.
      this.mapa.on("mouseleave", "states-layer", () => {
        this.mapa.getCanvas().style.cursor = "";
      });

      this.mapa.on("click", "places", (e) => {
        // Copy coordinates array.
        this.escAct = true;

        this.circAct = false;

        const coordinates = e.features[0].geometry.coordinates.slice();
        const description =
          e.features[0].properties.establecimiento +
          e.features[0].properties.total +
          e.features[0].properties.votaron;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        let dialogRef: MatDialogRef<any> = this.dialog.open(
          MapaPopupComponent,
          {
            width: "55%",
            height: "70%",
            data: e.features[0],
          }
        );
        dialogRef.beforeClosed().subscribe((e) => {
          this.escAct = false;
          this.circAct = false;
        });
        /* dialogRef.backdropClick().subscribe((e) => {
          this.escAct = false;
          this.circAct = false;
        }); */
        dialogRef.keydownEvents().subscribe((event) => {
          if (event.key === "Escape") {
            this.escAct = false;
            this.circAct = false;
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
      this.mapa.on("click", "states-layer", (e) => {
        !this.escAct && (this.circAct = true);

        if (!this.escAct && this.circAct) {
          let dialogRef: MatDialogRef<any> = this.dialog.open(
            PopupCircuitosComponent,
            {
              width: "500px",
              height: "670px",
              data: e.features[0],
            }
          );
          /*  dialogRef.backdropClick().subscribe((e) => {
            this.escAct = true;
          }); */
          dialogRef.keydownEvents().subscribe((event) => {
            if (event.key === "Escape") {
              this.circAct = true;
              dialogRef.close();
            }
          });
          dialogRef.beforeClosed().subscribe((e) => {
            this.circAct = true;
          });
        }
      });
    });

    this.mapa.on("idle", () => {
      // If these two layers were not added to the map, abort
      if (!this.mapa.getLayer("places") || !this.mapa.getLayer("states")) {
        return;
      }

      // Enumerate ids of the layers.
      const toggleableLayerIds = ["places", "states"];

      // Set up the corresponding toggle button for each layer.
      for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
          continue;
        }

        // Create a link.
        const link = document.createElement("a");
        link.id = id;
        link.href = "#";
        link.textContent = id;
        link.className = "active";

        // Show or hide layer when the toggle is clicked.
        /*   link.onclick = function (e) {
            
              const clickedLayer = '';
              e.preventDefault();
              e.stopPropagation();

              const visibility = this.mapaa.getLayoutProperty(
                  clickedLayer,
                  'visibility'
              );

              // Toggle layer visibility by changing the layout object's visibility property.
              if (visibility === 'visible') {
                  this.mapa.setLayoutProperty(clickedLayer, 'visibility', 'none');
                  this.className = '';
              } else {
                  this.className = 'active';
                  map.setLayoutProperty(
                      clickedLayer,
                      'visibility',
                      'visible'
                  );
              }
          }; */

        const layers = document.getElementById("menu");
        layers.appendChild(link);
      }
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
  getCircuitoGEo() {
    // console.log(esc);
    let url = `${this.apiURL}/geo/circuitosElectorales`;
    return this.http.get(url);
  }
}
