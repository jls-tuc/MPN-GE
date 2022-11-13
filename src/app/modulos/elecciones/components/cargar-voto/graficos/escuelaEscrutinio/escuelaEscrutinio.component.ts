import { Component, Input, OnInit } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { Subject } from "rxjs";
import { single } from "../data";

@Component({
  selector: "app-escuelaEscrutinio",
  templateUrl: "./escuelaEscrutinio.component.html",
  styleUrls: ["./escuelaEscrutinio.component.scss"],
})
export class EscuelaEscrutinioComponent implements OnInit {
  @Input() datosEscuela: Subject<any> = new Subject<any>();
  escuela: string;
  single: any[];
  view: any[] = [1080, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  dataGraficar: any;
  constructor() {}
  onSelect(data): void {
    //console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }
  ngOnInit() {
    this.datosEscuela.subscribe((res) => {
      console.log(res);
      this.escuela = res.escuela;
      let dataGraF = [
        {
          name: "Votos Blanco",
          value: res.resultados.votosBlanco,
        },
        {
          name: "Total Nulos",
          value: res.resultados.votosNulos,
        },
        {
          name: "Total Impugnados",
          value: res.resultados.votosImpugnados,
        },
        {
          name: "Total Recurridos",
          value: res.resultados.votosRecurridos,
        },
      ];
      for (let lista of res.resultados.listas) {
        dataGraF.push({
          name: `Lista ${lista.lista}`,
          value: lista.resultado,
        });
      }

      this.dataGraficar = dataGraF;
    });
  }
}
