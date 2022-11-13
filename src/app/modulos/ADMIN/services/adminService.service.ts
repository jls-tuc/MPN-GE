import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

const apiURL = environment.apiURL;
@Injectable({
  providedIn: "root",
})
export class AdminServiceService {
  constructor(private http: HttpClient) {}

  obtenerSeccionales() {
    let url = `${apiURL}/getseccionales`;

    return this.http.get(url);
  }

  obtenerUsr(usuario: string) {
    let url = `${apiURL}/auth/getUsr`;
    return this.http.get(url, { params: { dni: usuario } });
  }

  crearUsr(data) {
    let url = `${apiURL}/auth/registro`;
    return this.http.post(url, data);
  }
}
