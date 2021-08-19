import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

const apiURL = environment.apiURL;
@Injectable({
  providedIn: "root",
})
export class ReferentesService {
  constructor(private http: HttpClient) {}

  crearRefernte(data) {
    let url = `${apiURL}/auth/registro`;
    return this.http.post(url, data);
  }

  getResPById(id: any) {
    //console.log("ID", id);
    let url = `${apiURL}/auth/usuario`;
    return this.http.get(url + `/?${id}`);
  }

  getReferente(id: any) {
    let url = `${apiURL}/cards/ref`;
    return this.http.get(url + `/?${id}`);
  }
  getResPlanila(id: any) {
    let url = `${apiURL}/cards/resp`;
    return this.http.get(url + `/?${id}`);
  }
  getPlanillero(id: any) {
    let url = `${apiURL}/cards/planilla`;
    return this.http.get(url + `/?${id}`);
  }
}
