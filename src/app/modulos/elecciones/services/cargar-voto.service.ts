import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
const apiURL = environment.apiURL;
@Injectable({
  providedIn: "root",
})
export class CargarVotoService {
  constructor(private http: HttpClient) {}

  getGrafChasquis() {
    let url = `${apiURL}/votos-12/indicadorChasqui`;
    return this.http.get(url);
  }

  getEscuela(usuario) {
    let url = `${apiURL}/votos-12/votos`;
    return this.http.get(url + `/?${usuario}`);
  }

  postOrden(data) {
    let url = `${apiURL}/datosEsc`;
    return this.http.post(url, data);
  }

  getOrden(data) {
    let url = `${apiURL}/mesa/orden`;
    return this.http.post(url, data);
  }

  getActasEscrutinios() {
    let url = `${apiURL}/votos-12/getActas`;
    return this.http.get(url);
  }

  postActasEscrutinio(acta: any) {
    let url = `${apiURL}/votos-12/postActas`;

    return this.http.post(url, acta);
  }
  postChasqui(acta: any) {
    let url = `${apiURL}/votos-12/postChasqui`;

    return this.http.post(url, acta);
  }
}
