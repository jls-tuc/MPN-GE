import { Injectable, Pipe } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "environments/environment";
import { map } from "rxjs/operators";
const apiURL = environment.apiURL;
@Injectable({
  providedIn: "root",
})
export class PadronesService {
  constructor(private http: HttpClient) {}

  getPadronNqn(data) {
    let url = `${apiURL}/padronNqn`;
    return this.http.get(url + `/?${data}`);
  }
  getPadronNqnValue(data) {
    let url = `${apiURL}/padronNqn`;
    return this.http.get(url + `/?documento=${data.dni}&sexo=${data.sexo}`);
  }

  getAfiliado(data) {
    let url = `${apiURL}/afiliadoNpn`;
    return this.http.get(url + `/?${data}`);
  }
  getAfiliadoValue(data) {
    let url = `${apiURL}/afiliadoNpn`;
    return this.http.get(url + `/?documento=${data.dni}&sexo=${data.sexo}`);
  }
  //////cargar los circuitos en base a las secciones

  getSecCir() {
    let url = `${apiURL}/secCir`;
    return this.http.get(url);
  }

  getAfFiltro(value: {}) {
    let data: any = {};
    data.data = value;
    let url = `${apiURL}/afiliado/filtros`;
    return this.http.post(url, data);
  }
}
