import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
const apiURL = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class GraficaService {

  constructor(private http: HttpClient) { }
  getvotosGrafica() {
    let url = `${apiURL}/estadistica/graficagral`;
    return this.http.get(url);
  }
  getvotosGraficaTotal() {
    let url = `${apiURL}/estadistica/graficatotal`;
    return this.http.get(url);
  }
  getvotosCalculoTotal() {
    let url = `${apiURL}/estadistica/calculototal`;
    return this.http.get(url);
  }
}
