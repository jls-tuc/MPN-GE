import { AuthModel } from "./auth.model";

export class UserModel extends AuthModel {
  id: String;
  usuario: String;
  password: String;
  activo: String;
  fechaAltaUsuario: String;
  fechaBajaUsuario: String;
  lastLogin: String;
  role: String;
  idReferente: String;
  datosPersonales: {
    nombres: String;
    apellido: String;
    dni: String;
    sexo: String;
    calle: String;
    foto: String;
    numero: Number;
    provincia: String;
    localidad: String;
    email: String;
    telefono: String;
  };

  setUser(user: any) {
    this.id = user.id;
    this.usuario = user.usuario || "";
    this.password = user.password || "";
    this.datosPersonales.nombres = user.datosPersonales.nombres || "";
    this.datosPersonales.email = user.datosPersonales.email || "";
    this.foto = user.foto || "./assets/images/faces/avatarDefault.jpg";
    this.role = user.roles || [];

    this.datosPersonales.telefono = user.datosPersonales.telefono || "";
    this.datosPersonales.calle = user.datosPersonales.calle;
    this.datosPersonales.numero = user.datosPersonales.numero;
    this.datosPersonales.localidad = user.datosPersonales.localidad;
  }
}
