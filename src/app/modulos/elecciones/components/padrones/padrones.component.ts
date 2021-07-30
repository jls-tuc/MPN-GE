import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";
import { PadronesService } from "../../services/padrones.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Iafiliado, Ipadron } from "../../interfaces/padrones.interfaces";

@Component({
  selector: "app-padrones",
  templateUrl: "./padrones.component.html",
  styleUrls: ["./padrones.component.css"],
})
export class PadronesComponent implements OnInit {
  loadingTime = 2000;
  datosPadron = [];
  sexo: string[] = ["F", "M"];
  title = "Consultado la base de datos";
  public itemForm: FormGroup;
  constructor(
    private loader: AppLoaderService,
    private padronService: PadronesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.itemForm = this.fb.group({
      dni: ["", [Validators.required, Validators.maxLength(8)]],
      sexo: ["", [Validators.required]],
    });
  }

  openLoader() {
    this.loader.open(this.title);
    setTimeout(() => {
      this.loader.close();
    }, this.loadingTime);
  }
  async validarDNI() {
    const params: {} = `documento=${this.itemForm.get("dni").value}&sexo=${
      this.itemForm.get("sexo").value
    }`;

    this.padronService.getPadronNqn(params).subscribe((res: any) => {
      let padronNqn = {
        documento: res.data.documento,
        apellido: res.data.apellido,
        nombre: res.data.nombre,
        domicilio: res.data.domicilio,
        tipo_ejemplar: res.data.tipo_ejemplar,
        seccion: res.data.seccion,
        circuito: res.data.circuito,
        mesa: res.data.mesa,
        orden: res.data.orden,
        escuela: res.data.escuela,
        direccion: res.data.direccion,
        localidad: res.data.localidad,
        fec_afiliacion: res.data.fec_afiliacion,
      };
      this.datosPadron.push(padronNqn);

      this.padronService.getAfiliado(params).subscribe((res: any) => {
        if (res.ok) {
          console.log("No entra");
          let padronNqn = {
            documento: res.data.dni,
            apellido: res.data.apellido,
            nombre: res.data.nombre,
            domicilio: res.data.domicilio,
            tipo_ejemplar: res.data.tipo_ejemplar,
            seccion: res.data.seccion,
            circuito: res.data.circuito,
            mesa: res.data.mesa,
            orden: res.data.orden,
            escuela: res.data.escuela,
            direccion: res.data.direccion,
            localidad: res.data.localidad,
            fec_afiliacion: res.data.fec_afiliacion,
          };
          this.datosPadron.push(padronNqn);
        }
      });
    });
  }

  get dniNoValido() {
    return this.itemForm.get("dni").invalid && this.itemForm.get("dni").touched;
  }

  get sexoNoValido() {
    return (
      this.itemForm.get("sexo").invalid && this.itemForm.get("sexo").touched
    );
  }
}
