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

  getPadronProv(data) {
    let url = `${apiURL}/padronProv`;
    return this.http.get(url + `/?${data}`);
  }

  getAfiliado(data) {
    let url = `${apiURL}/afiliadoNpn`;
    return this.http.get(url + `/?${data}`);
  }
}
