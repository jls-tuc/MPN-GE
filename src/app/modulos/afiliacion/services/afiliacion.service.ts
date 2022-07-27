import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "environments/environment";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { tap } from "rxjs/operators";

const apiURL = environment.apiURL;

@Injectable({
  providedIn: "root",
})
export class AfiliacionService {
  constructor(private http: HttpClient) {}

  getAllUsuarios() {
    let url = `${apiURL}/auth/usr`;
    return this.http.get(url);
  }

  getAllLocaNqn() {
    let url = `${apiURL}/locaNqn`;
    return this.http.get(url);
  }

  /// grupo afiliacion servicios exclusivessss

  postGrupo(value: {}) {
    let data: any = {};
    data.data = value;

    let url = `${apiURL}/afiliaciones/grupo`;
    return this.http.post(url, data);
  }

  updGrupo(value: {}, _id) {
    let data: any = {};
    data.upd = value;

    let url = `${apiURL}/afiliaciones/grupo/${_id}`;
    return this.http.patch(url, data);
  }

  getAllGrupos(page?: number, skip?: number) {
    let url = `${apiURL}/afiliaciones/grupos`;
    return this.http.get(url + `/?page=${page}&skip=${skip}`);
  }

  getDniGrupo(value) {
    let data: any = {};
    data.dni = value.dni;
    let url = `${apiURL}/afiliaciones/grupo/dni`;
    return this.http.post(url, data);
  }

  getDniJuntaElectoras(value) {
    let url = `https://sgeafiliados.pjn.gov.ar/afiliado-servicios/api/afiliacion?matricula=${value.dni}&genero=${value.sexo}`;

    return this.http.get(url);
  }

  postPlanilla(value: {}, nroLote: string) {
    let data: any = {};
    data.data = value;
    let url = `${apiURL}/afiliaciones/afilia/${nroLote}`;
    return this.http.post(url, data);
  }

  presentacionLte(value: {}, _id: string, op: string) {
    let data: any = {};
    data.upd = value;
    data.op = op;
    let url = `${apiURL}/afiliaciones/presentacion/${_id}`;
    return this.http.patch(url, data);
  }
  ///udpEstadoPlanilla
  updPlanilla(value: {}, nroLte: string) {
    let data: any = {};
    data.upd = value;

    let url = `${apiURL}/afiliaciones/updPlanilla/${nroLte}`;
    return this.http.patch(url, data);
  }

  ///indicadores

  getIndica() {
    let url = `${apiURL}/afiliaciones/indica`;
    return this.http.get(url);
  }
  /// planillas de los lotes

  getPlanillas(value: {}) {
    let data: any = {};
    data.data = value;
    let url = `${apiURL}/afiliaciones/planillas`;
    return this.http.post(url, data);
  }
}
