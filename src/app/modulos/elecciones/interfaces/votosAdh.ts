export interface IvotoADH {
  dni: string;
  sexo: string;
  apellido: string;
  nombre: string;
  clase: string;
  genero: string;
  telefono: string;
  tipo_voto: string;
  afiliado: string;
  localidad: string;
  dom_estableimiento: string;
  establecimiento: string;
  mesa: string;
  orden: string;
  resPlanilla: {
    idResPlanilla: string;
    idCoordinador: string;
    idReferente: string;
  };
}
