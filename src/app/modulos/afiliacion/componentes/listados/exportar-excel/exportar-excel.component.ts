import { CLOSE_SQUARE_BRACKET } from "@angular/cdk/keycodes";
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AfiliacionService } from "app/modulos/afiliacion/services/afiliacion.service";

@Component({
  selector: "app-exportar-excel",
  templateUrl: "./exportar-excel.component.html",
  styleUrls: ["./exportar-excel.component.scss"],
})
export class ExportarExcelComponent implements OnInit {
  public localidades: any;
  form: FormGroup;
  formSexo: FormGroup;
  Data: Array<any> = [];
  DataSexo: Array<any> = [
    {
      label: "Femenino",
      value: "F",
      checked: false,
    },
    {
      label: "Masculino",
      value: "M",
      checked: false,
    },
    {
      label: "No Binario",
      value: "X",
      checked: false,
    },
  ];
  public disabled = true;
  public checkArray: FormArray = new FormArray([]);
  public checkArraySexo: FormArray = new FormArray([]);
  public cargado: boolean = false;

  constructor(
    @Optional() public dialogRef: MatDialogRef<ExportarExcelComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private dataService: AfiliacionService,
    private cdr: ChangeDetectorRef
  ) {
    this.localidades = this.data.localidad;
    this.Data = this.localidades;
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    });
    this.formSexo = this.fb.group({
      checkArraySexo: this.fb.array([], [Validators.required]),
    });
    this.cargado = true;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {}
  onCheckboxChange(e: any) {
    this.checkArray = this.form.get("checkArray") as FormArray;
    if (e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);
        }
        i++;
      });
    }
    this.habilitado();
    this.cdr.markForCheck();
  }

  onCheckboxChangeSexo(eSexo: any) {
    eSexo.checked = !eSexo.checked;
    this.habilitado();
    this.cdr.markForCheck();
  }

  habilitado() {
    if (this.localidades.length > 0) {
      let temp = [false, false];
      this.DataSexo.map((sexo: any) => {
        if (sexo.checked) {
          temp[0] = true;
        }
      });

      if (this.checkArray.length > 0) temp[1] = true;
      if (temp[0] === true && temp[1] === true) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
      this.cdr.markForCheck();
    } else {
      this.disabled = false;
    }
  }

  async submitForm() {
    let temp = [];
    let data = [];
    if (this.localidades.length !== undefined) {
      for (let loc = 0; loc < this.checkArray.value.length; loc++) {
        const localidad = this.checkArray.value[loc];
        let buscarLocalidad = this.localidades.filter(
          (x) => x.localidad == localidad
        );
        this.DataSexo.map((sexo: any) => {
          if (sexo.checked) {
            let buscarSexoLocalidad = buscarLocalidad[0].empadronados.filter(
              (x) => x.genero == sexo.value
            );
            if (buscarSexoLocalidad.length > 0) {
              buscarSexoLocalidad.map((x) => {
                temp.push(x);
              });
            }
          }
        });
      }
      let empadronados = temp.length;
      let porSexo = [];
      let i = 0;
      let sexoBuscar = "";
      let datosFinal = [];
      for (let sexo = 0; sexo < this.DataSexo.length; sexo++) {
        const e = this.DataSexo[sexo];
        if (e.checked) {
          porSexo[i] = temp.filter((x) => x.genero == e.value).length;
          let obTemp = {
            genero: e.label,
            cantidad: porSexo[i],
          };
          datosFinal.push(obTemp);
          i++;
        }
      }
      let loc = "";
      let cantidad = 0;
      this.checkArray.value.map((local: any) => {
        if (this.checkArray.value.length === 1) {
          loc = loc + local;
        } else {
          if (cantidad === this.checkArray.value.length - 1) {
            loc = loc + " y " + local;
          } else {
            if (cantidad === this.checkArray.value.length - 2) {
              loc = loc + local;
            } else {
              loc = loc + local + ", ";
            }
          }
        }
        cantidad++;
      });
      temp.push({ seccion: "" });
      temp.push({ seccion: `Localidades ${loc}` });
      temp.push({ seccion: "" });
      temp.push({ seccion: `Total de empadronados :${empadronados}` });
      temp.push({ seccion: `Femenino :${porSexo[0]}` });
      temp.push({ seccion: `Masculino :${porSexo[1]}` });
      temp.push({ seccion: `No Binario:${porSexo[2]}` });
      for await (const item of temp) {
        delete item._id;
        delete item.__v;
        data.push(item);
      }
    } else {
      temp = this.localidades.empadronados;
      let porSexo = [];
      let i = 0;
      for (let sexo = 0; sexo < this.DataSexo.length; sexo++) {
        const e = this.DataSexo[sexo];
        console.log("e", e);
        if (e.checked) {
          porSexo[i] = temp.filter((x) => x.genero == e.value).length;
          let obTemp = {
            genero: e.label,
            cantidad: porSexo[i],
          };
          i++;
        }
      }
      for await (const item of temp) {
        delete item._id;
        delete item.__v;
        data.push(item);
      }
      data.push({ seccion: "" });
      data.push({ seccion: `Localidad ${this.localidades.localidad}` });
      data.push({ seccion: "" });
      data.push({
        seccion: `Total de empadronados: ${this.localidades.total}`,
      });
      data.push({ seccion: `Femenino : ${porSexo[0]}` });
      data.push({ seccion: `Masculino : ${porSexo[1]}` });
      data.push({ seccion: `No Binario: ${porSexo[2]}` });
    }

    let columnas = [
      "analfabeto",
      "apellido",
      "circuito",
      "clase",
      "codCircuito",
      "codSeccion",
      "domicilio",
      "estadoActualElector",
      "estadoAfiliacion",
      "fechaAfiliacion",
      "fechaDomicilio",
      "fechaNacimiento",
      "genero",
      "matricula",
      "nombre",
      "profesion",
      "seccion",
      "tipoDocumento",
    ];
    this.dataService.getExportacionExcel(data, columnas, temp[0].seccion);
  }
}
