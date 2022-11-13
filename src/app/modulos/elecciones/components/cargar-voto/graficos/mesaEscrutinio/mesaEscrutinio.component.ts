import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { single } from "../data";

@Component({
  selector: "app-mesaEscrutinio",
  templateUrl: "./mesaEscrutinio.component.html",
  styleUrls: ["./mesaEscrutinio.component.scss"],
})
export class MesaEscrutinioComponent implements OnInit {
  @Input() datosMesa: Subject<any> = new Subject<any>();
  mesa: string;
  single: any[];
  view: any[] = [1080, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  dataGraficar: any;
  constructor() {}
  onSelect(data): void {
    // console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }
  ngOnInit() {
    this.datosMesa.subscribe((res) => {
      this.mesa = res.mesa;
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
