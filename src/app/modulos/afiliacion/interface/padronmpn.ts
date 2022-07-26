export interface Ipadronmpn {
  _id?: string;
  seccion: string,
  codSeccion: string,
  circuito: string,
  codCircuito: string,
  apellido: string,
  nombre: string,
  genero: string,
  tipoDocumento: string,
  matricula: string,
  fechaNacimiento: string,
  clase: string,
  estadoActualElector: string,
  estadoAfiliacion: string,
  fechaAfiliacion: string,
  analfabeto: string,
  profesion: string,
  fechaDomicilio: string,
  domicilio: string,
}

export interface Ilocalidades {
  localidad: string,
  totalFemenino: number,
  totalMasculino: number,
  totalNoBinario: number,
  empadronados: Ipadronmpn[]
}

export interface Idepartamentos {
  departamento: string,
  total: number,
  totalFemenino: number,
  totalMasculino: number,
  totalNoBinario: number,
  localidades: Ilocalidades[]
}