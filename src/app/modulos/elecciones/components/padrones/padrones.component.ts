import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";
import { PadronesService } from "../../services/padrones.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { UserModel } from "app/shared/models/user.model";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-padrones",
  templateUrl: "./padrones.component.html",
  styleUrls: ["./padrones.component.scss"],
})
export class PadronesComponent implements OnInit {
  userData$: Observable<UserModel>;
  datosUser: any;
  loadingTime = 2000;
  resPadronNac: any = {};
  resPadronPar: any = {};
  sexo: string[] = ["F", "M"];
  title = "Consultado la base de datos";
  padronNac: boolean = false;
  padronPart: boolean = false;
  public itemForm: FormGroup;
  constructor(
    public auhService: JwtAuthService,
    private loader: AppLoaderService,
    private padronService: PadronesService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    (this.userData$ = this.auhService.currentUserSubject.asObservable()),
      (this.datosUser = this.userData$);
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.itemForm = this.fb.group({
      dni: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(8),
        ],
      ],
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
    (this.padronPart = false), (this.padronNac = false);
    const params: {} = `documento=${this.itemForm.get("dni").value}&sexo=${
      this.itemForm.get("sexo").value
    }`;
    await this.padronService
      .getPadronNqn(params)
      .subscribe(async (res: any) => {
        this.resPadronNac = {
          padronNac: "si",
          documento: res.data.documento,
          apellido: res.data.apellido,
          nombre: res.data.nombre,
          domicilio: res.data.domicilio,
          tipo_ejemplar: res.data.ejemplar,
          seccion: res.data.seccion,
          circuito: res.data.circuito,
          mesa: res.data.mesa,
          orden: res.data.orden,
          establecimiento: res.data.establecimiento,
          direccion: res.data.dom_estableimiento,
          localidad: res.data.localidad,
          fec_afiliacion: res.data.fec_afiliacion,
        };
        this.padronNac = true;

        await this.padronService.getAfiliado(params).subscribe((res: any) => {
          if (res.ok) {
            this.resPadronPar = {
              padronPart: "si",
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
            this.padronPart = true;
          }
        });
      });
    this.itemForm.reset();
  }

  get dniNoValido() {
    return this.itemForm.get("dni").invalid && this.itemForm.get("dni").touched;
  }

  get sexoNoValido() {
    return (
      this.itemForm.get("sexo").invalid && this.itemForm.get("sexo").touched
    );
  }
  closeWindows() {
    if (
      this.datosUser.source._value.role === "user-Adminafilia" ||
      this.datosUser.source._value.role === "user-afilia"
    ) {
      this.router.navigateByUrl("afiliacion/analitica");
    } else if (
      this.datosUser.source._value.role === "user-coord" ||
      this.datosUser.source._value.role === "user-ref" ||
      this.datosUser.source._value.role === "user-resp"
    ) {
      this.router.navigateByUrl("elecciones/referentes");
    }
  }
}
