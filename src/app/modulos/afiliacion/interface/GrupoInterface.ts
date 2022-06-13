export interface IGrupoAfiliacion {
  _id?: string;
  nro: string;
  usuarioResponsable: {
    apellido: string;
    nombres: string;
    dni: string;
    telefono: string;
    email: string;
  };
  lugarAfiliacion: {
    localidad: string;
    nombreEdificio: string;
    calle: string;
    numero: string;
    telefono: string;
  };
  planillas: [
    {
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
  ];
  fechaInicioAfiliacion: string;
  fechaFinAfiliacion: string;
  estadoAfiliacion: string;
  datosJusElc: {
    fechaIngresoJunta: string;
    fechaRespuestaJunta: string;
    estadoJunta: string;
    obserJunta: string;
  };
}

export interface IGruposAfiliados extends Array<IGrupoAfiliacion> {}
