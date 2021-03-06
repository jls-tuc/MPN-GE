import { Injectable } from "@angular/core";

import { getPersona } from "../../models/persona/persona.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../../../environments/environment";
const API_USERS_URL = `${environment.apiURL}/persona`;

@Injectable({
  providedIn: "root",
})
export class ValidarPersonaService {
  public getPersona: getPersona;

  constructor(public http: HttpClient) {}

  getPersonaBD(persona: string) {
    return this.http.get(API_USERS_URL + `/?${persona}`); // retorna un observable con los mismos resultados del potman
  }

  getPersonaRenaper(data: any) {
    const url = API_USERS_URL;
    console.log("persona", data);
    return this.http.get(url + `/?${data}`);
  }
}
