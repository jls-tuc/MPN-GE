import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";

import { egretAnimations } from "app/shared/animations/egret-animations";
import { Subject } from "rxjs";
@Component({
  selector: "app-localidadEscrutinio",
  templateUrl: "./localidadEscrutinio.component.html",
  styleUrls: ["./localidadEscrutinio.component.scss"],
  animations: egretAnimations,
})
export class LocalidadEscrutinioComponent implements OnInit {
  @Input() datosLocalidad: Subject<any> = new Subject<any>();
  localidad: string;
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
    /*    console.log("Item clicked", JSON.parse(JSON.stringify(data))); */
  }

  onActivate(data): void {
    /* console.log("Activate", JSON.parse(JSON.stringify(data))); */
  }

  onDeactivate(data): void {
    /* console.log("Deactivate", JSON.parse(JSON.stringify(data))); */
  }

  ngOnInit() {
    this.datosLocalidad.subscribe((res) => {
      console.log(res);
      this.localidad = res.localidad;

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
      this.dataGraficar = [...dataGraF];
    });
  }
}
