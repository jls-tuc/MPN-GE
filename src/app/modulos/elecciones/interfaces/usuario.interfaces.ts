export interface Iusuario {
  usuario: String;
  password: String;
  activo: boolean;
  fechaAltaUsuario: String;
  fechaBajaUsuario: String;
  lastLogin: String;
  role: String;
  idCoordinador: String;
  idReferente: String;
  seccional?: String;
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
    areaResponsable: String;
  };
}
