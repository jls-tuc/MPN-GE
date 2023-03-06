import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { map } from "rxjs/operators"

const API_USERS_URL = `${environment.apiURL}/provLoc`;
const URLLoc = `${environment.apiURL}/locaNqn`;
@Injectable({
  providedIn: "root",
})
export class ProvLocService {
  constructor(private http: HttpClient) {}

  getProvLocalidades() {
    return this.http.get(API_USERS_URL);
  }

  getLocalidades() {
    return this.http.get(URLLoc);
  }

  getLocalidadesAsString() {
    return this.http.get(URLLoc)
      .pipe(
        map((response: any) => response.data.map(item => item['nombre']))
      )
  }
}
