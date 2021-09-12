
import { HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import axios from 'axios';
import { Observable } from 'rxjs';
const apiURL = environment.apiURL;
@Injectable({
  providedIn: "root",
})
export class GraficaService {
  public data: any;

  public dataLocalidad: any;
  constructor(public http: HttpClient,
  ) { }

  getvotosGrafica(usr: any) {

    let url = `${apiURL}/estadistica/graficatotal`;
    return this.http.post(url, usr);
  }
  getvotosGraficaEleccion(usr: any) {

    //console.log(`Mando usr`, usr)

    let url = `${apiURL}/estadistica/graficatotalEleccion`;
    return this.http.post(url, usr);
  }

  getvotosCalculoTotal() {
    let url = `${apiURL}/estadistica/calculototal`;
    return this.http.get(url, { responseType: 'json' });
  }
  getvotosLocalidad() {
    let url = `${apiURL}/estadistica/votosLocalidades`;
    return this.http.get(url, { responseType: 'json' });

  }
  getvotosLocalidadNqn() {
    let url = `${apiURL}/mesa/votosnqn`;
    return this.http.get(url);
  }
  getvotosCalculoEleccion(usuario: any) {
    console.log(`Mando usr`, usuario)
    let url = `${apiURL}/estadistica/calculoEleccion`;
    return this.http.post(url, usuario);
  }
  getvotosCalculoTotalCoord(usr: any) {
    let url = `${apiURL}/estadistica/calculototalref`;
    return this.http.post(url, usr);
  }
  getvotosCalculoTotalRef(usr: any) {
    let url = `${apiURL}/estadistica/calculototalresp`;
    return this.http.post(url, usr);
  }
}
