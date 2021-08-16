import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
const apiURL = environment.apiURL;
@Injectable({
  providedIn: "root",
})
export class GraficaService {
  constructor(private http: HttpClient) {}
  getvotosGrafica(usr: any) {
    //  console.log(`Mando usr`, usr)
    let url = `${apiURL}/estadistica/graficatotal`;
    return this.http.post(url, usr);
  }

  getvotosCalculoTotal() {
    let url = `${apiURL}/estadistica/calculototal`;
    return this.http.get(url);
  }
  getvotosCalculoTotalCoord(usr: any) {
    let url = `${apiURL}/estadistica/calculototalref`;
    return this.http.post(url, usr);
  }
}
