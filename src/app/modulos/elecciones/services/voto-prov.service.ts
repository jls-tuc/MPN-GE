import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { IvotoADH } from "../interfaces/votosAdh";
const apiURL = environment.apiURL;
@Injectable({
  providedIn: "root",
})
export class VotoProvService {
  constructor(private http: HttpClient) { }

  postVotoProv(data) {
    let url = `${apiURL}/votoProv`;
    return this.http.post(url, data);
  }

  postVotoGraf(data) {
    let url = `${apiURL}/votoGraf`;
    return this.http.post(url, data);
  }

  getVotosById(id) {
    let url = `${apiURL}/votoProv`;
    return this.http.get(url + `/id?${id}`);
  }
  getVotosByIdUser(id) {
    let url = `${apiURL}/votoProv`;
    return this.http.get(url + `/idu?${id}`);
  }

  getVotos() {
    let url = `${apiURL}/votoProv`;
    return this.http.get(url);
  }
}
