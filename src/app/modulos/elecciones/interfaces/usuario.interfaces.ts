export interface Iusuario {
  usuario: String;
  password: String;
  activo: String;
  fechaAltaUsuario: String;
  fechaBajaUsuario: String;
  lastLogin: String;
  role: String;
  referentes: { idReferente: String };
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
}
