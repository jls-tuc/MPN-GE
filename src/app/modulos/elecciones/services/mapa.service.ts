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

  graficosDonas(dataGeo?) {
    //console.log(dataGeo);
    const total1 = ["<", ["get", "total"], 2];
    const total2 = [
      "all",
      [">=", ["get", "total"], 2],
      ["<", ["get", "total"], 3],
    ];
    const total3 = [
      "all",
      [">=", ["get", "total"], 3],
      ["<", ["get", "total"], 4],
    ];
    const total4 = [
      "all",
      [">=", ["get", "total"], 4],
      ["<", ["get", "total"], 5],
    ];
    const total5 = [">=", ["get", "total"], 5];

    const colors = ["#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c"];

    this.mapa.on("load", () => {
      this.mapa.addSource("establecimientos", {
        type: "geojson",
        data: dataGeo, //"https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
        cluster: true,
        clusterRadius: 80,
        clusterProperties: {
          // keep separate counts for each magnitude category in a cluster
          total1: ["+", ["case", total1, 1, 0]],
          total2: ["+", ["case", total2, 1, 0]],
          total3: ["+", ["case", total3, 1, 0]],
          total4: ["+", ["case", total4, 1, 0]],
          total5: ["+", ["case", total5, 1, 0]],
        },
      });
      // circle and symbol layers for rendering individual earthquakes (unclustered points)
      this.mapa.addLayer({
        id: "establecimientos_circle",
        type: "circle",
        source: "establecimientos",
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
          "circle-opacity": 0.6,
          "circle-radius": 22,
        },
      });
      this.mapa.addLayer({
        id: "establecimientos_label",
        type: "symbol",
        source: "establecimientos",
        filter: ["!=", "cluster", true],
        layout: {
          "text-field": [
            "number-format",
            ["get", "total"],
            { "min-fraction-digits": 1, "max-fraction-digits": 3 },
          ],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": ["case", ["<", ["get", "total"], 3], "black", "white"],
        },
      });

      // objects for caching and keeping track of HTML marker objects (for performance)
      const markers = {};
      let markersOnScreen = {};

      function updateMarkers() {
        const newMarkers = {};
        const features = this.mapa.querySourceFeatures("establecimientos");

        // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
        // and add it to the map if it's not there already
        for (const feature of features) {
          const coords = feature.geometry.coordinates;
          const props = feature.properties;
          if (!props.cluster) continue;
          const id = props.cluster_id;

          let marker = markers[id];
          if (!marker) {
            const el = createDonutChart(props);
            marker = markers[id] = new Mapboxgl.Marker({
              element: el,
            }).setLngLat(coords);
          }
          newMarkers[id] = marker;

          if (!markersOnScreen[id]) marker.addTo(this.mapa);
        }
        // for every marker we've added previously, remove those that are no longer visible
        for (const id in markersOnScreen) {
          if (!newMarkers[id]) markersOnScreen[id].remove();
        }
        markersOnScreen = newMarkers;
      }

      // after the GeoJSON data is loaded, update markers on the screen on every frame
      this.mapa.on("render", () => {
        if (!this.mapa.isSourceLoaded("establecimientos")) return;
        updateMarkers();
      });
    });

    function createDonutChart(props) {
      const offsets = [];
      const counts = [
        props.total1,
        props.total2,
        props.total3,
        props.total4,
        props.total5,
      ];
      let total = 0;
      for (const count of counts) {
        offsets.push(total);
        total += count;
      }
      const fontSize =
        total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
      const r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
      const r0 = Math.round(r * 0.6);
      const w = r * 2;

      let html = `<div>
        <svg width="${w}" height="${w}" viewbox="0 0 ${w} ${w}" text-anchor="middle" style="font: ${fontSize}px sans-serif; display: block">`;

      for (let i = 0; i < counts.length; i++) {
        html += donutSegment(
          offsets[i] / total,
          (offsets[i] + counts[i]) / total,
          r,
          r0,
          colors[i]
        );
      }
      html += `<circle cx="${r}" cy="${r}" r="${r0}" fill="white" />
        <text dominant-baseline="central" transform="translate(${r}, ${r})">
            ${total.toLocaleString()}
        </text>
        </svg>
        </div>`;

      const el = document.createElement("div");
      el.innerHTML = html;
      return el.firstChild;
    }

    function donutSegment(start, end, r, r0, color) {
      if (end - start === 1) end -= 0.00001;
      const a0 = 2 * Math.PI * (start - 0.25);
      const a1 = 2 * Math.PI * (end - 0.25);
      const x0 = Math.cos(a0),
        y0 = Math.sin(a0);
      const x1 = Math.cos(a1),
        y1 = Math.sin(a1);
      const largeArc = end - start > 0.5 ? 1 : 0;

      // draw an SVG path
      return `<path d="M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0} ${
        r + r * y0
      } A ${r} ${r} 0 ${largeArc} 1 ${r + r * x1} ${r + r * y1} L ${
        r + r0 * x1
      } ${r + r0 * y1} A ${r0} ${r0} 0 ${largeArc} 0 ${r + r0 * x0} ${
        r + r0 * y0
      }" fill="${color}" />`;
    }
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
