import { AuthModel } from "./auth.model";

export class UserModel extends AuthModel {
  id: String;
  usuario: String;
  password: String;
  activo: boolean;
  fechaAltaUsuario: String;
  fechaBajaUsuario: String;
  lastLogin: String;
  role: String;
  datosPersonales: {
    nombres: String;
    apellido: String;
    dni: String;
    calle: String;
    numero: Number;
    localidad: String;
    email: String;
    telefono: String;
  };
  datosLaborales: {
    legajo: String;
    ministerio: String;
    area: String;
    servicioPuestoPrincipal: String;
  };
  datosElectorales: {
    idCoordinador: String;
    idReferente: String;
    nombreReferente: String;
  };

  setUser(user: any) {
    this.id = user.id;
    this.usuario = user.usuario || "";
    this.password = user.password || "";
    this.datosPersonales.nombres = user.datosPersonales.nombres || "";
    this.datosPersonales.email = user.datosPersonales.email || "";
    this.foto = user.foto || "./assets/images/faces/avatarDefault.jpg";
    this.role = user.roles || [];
    this.datosLaborales.servicioPuestoPrincipal =
      user.datosLaborales.servicioPuestoPrincipal || "";
    this.datosLaborales.ministerio = user.datosLaborales.ministerio || "";
    this.datosPersonales.telefono = user.datosPersonales.telefono || "";
    this.datosPersonales.calle = user.datosPersonales.calle;
    this.datosPersonales.numero = user.datosPersonales.numero;
    this.datosPersonales.localidad = user.datosPersonales.localidad;
  }
}
