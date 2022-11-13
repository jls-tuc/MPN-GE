import { Component, OnInit } from "@angular/core";
import { CargarVotoService } from "app/modulos/elecciones/services/cargar-voto.service";

@Component({
  selector: "app-intencionVoto",
  templateUrl: "./intencionVoto.component.html",
  styleUrls: ["./intencionVoto.component.scss"],
})
export class IntencionVotoComponent implements OnInit {
  single: any[];
  view: any[] = [500, 400];
  viewGenero: any[] = [500, 400];
  viewBar: any[] = [1300, 1440];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;

  showXAxisLabel: boolean = true;
  xAxisLabel: string = "Votantes";
  showYAxisLabel: boolean = true;

  legendTitle: string = "Categorias";
  showDataLabel: boolean = true;
  totalVotantes = 0;
  totalPartic: number;
  colorScheme = {
    domain: ["#F10B62", "#24DB1E", "#1897FB", "#F7AC16"],
  };

  colorSchemeAf = {
    domain: ["#7aa3e5", "#a8385d"],
  };
  colorGenero = {
    domain: ["#5AA454", "#E44D25", "#aae3f5"],
  };
  dataGrafAFvsInd = [];
  dataGrafGenero = [];
  localidades = [];
  constructor(private cargarVotoServ: CargarVotoService) {}
  onSelect(event) {
    //console.log(event);
  }
  onSelectBar(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit() {
    this.cargarVotoServ.getGrafChasquis().subscribe((res: any) => {
      //console.log(res);
      this.totalVotantes = res.totalGral.votosAf + res.totalGral.votosInd;
      this.totalPartic = (this.totalVotantes / 128984) * 100;
      let graf = [
        {
          name: "Afiliados",
          value: res.totalGral.votosAf,
        },
        {
          name: "Independientes",
          value: res.totalGral.votosInd,
        },
        /*  {
          name: "Total",
          value: res.totalGral.votosInd + res.totalGral.votosAf,
        }, */
      ];
      let grafGenero = [
        {
          name: "Votos Femenino",
          value: res.totalGral.votosF,
        },
        {
          name: "Voto Masculino",
          value: res.totalGral.votosM,
        },
        {
          name: "Votos otro",
          value: res.totalGral.votosO,
        },
      ];

      let grafLocalidad = [];
      for (let item of res.dataTotales) {
        let mostrar = item.votosInd + item.votosAf;
        if (mostrar >= 0) {
          grafLocalidad.push({
            name: item.localidad,
            series: [
              {
                name: "Total Votantes",
                value: item.totalElectores,
              },
              {
                name: "Votaron",
                value: item.votosInd + item.votosAf,
              },
              /* {
                name: "Votaron Afiliados",
                value: item.votosAf,
              },
              {
                name: "Votaron Independientes",
                value: item.votosInd,
              }, */
            ],
          });
        }
      }
      this.localidades = grafLocalidad;
      this.dataGrafAFvsInd = graf;
      this.dataGrafGenero = grafGenero;
    });
  }
}
