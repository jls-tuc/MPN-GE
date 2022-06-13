export interface IPlanillaAfilia {
  _id?: string;
  nombre: string;
  apellido: string;
  documento: string;
  dm: string;
  rg: string;
  clase: string;
  genero: string;
  fechaNacimiento: string;
  lugar: string;
  profOficio: string;
  estadoCivil: string;
  ultDomicilio: {
    distritoElec: string;
    partidoDepto: string;
    cuartelPedania: string;
    localidad: string;
    calle: string;
    nro: string;
    piso: string;
    dep: string;
  };
  domicilioPostal: {
    barrio: string;
    circuito: string;
    localidad: string;
    calle: string;
    nro: string;
    piso: string;
    dep: string;
    telPar: string;
    telTrab: string;
    contacto: string;
    observaciones: string;
  };
}
