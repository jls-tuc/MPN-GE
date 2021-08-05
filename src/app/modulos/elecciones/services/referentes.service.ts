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

  getReferente() {
    let url = `${apiURL}/auth/usuarios`;
    return this.http.get(url);
  }

  getResPById(id: any) {
    //console.log("ID", id);
    let url = `${apiURL}/auth/usuario`;
    return this.http.get(url + `/?${id}`);
  }
}
