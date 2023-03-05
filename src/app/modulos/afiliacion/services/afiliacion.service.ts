import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "environments/environment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const apiURL = environment.apiURL;
const EXCEL_TYPE =
  "aplication/vnv.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
  providedIn: "root",
})
export class AfiliacionService {
  constructor(private http: HttpClient) {}

  getAllUsuarios() {
    let url = `${apiURL}/auth/usr`;
    return this.http.get(url);
  }

  getAllLocaNqn() {
    let url = `${apiURL}/locaNqn`;
    return this.http.get(url);
  }
  ////
  getOneLote(nroLte: string) {
    let url = `${apiURL}/afiliaciones/grupo`;
    return this.http.get(url, { params: { nroLte } });
  }

  /// grupo afiliacion servicios exclusivessss

  postGrupo(value: {}) {
    let data: any = {};
    data.data = value;

    let url = `${apiURL}/afiliaciones/grupo`;
    return this.http.post(url, data);
  }

  updGrupo(value: {}, _id) {
    let data: any = {};
    data.upd = value;

    let url = `${apiURL}/afiliaciones/grupo/${_id}`;
    return this.http.patch(url, data);
  }

  getAllGrupos(page?: number, skip?: number) {
    let url = `${apiURL}/afiliaciones/grupos`;
    return this.http.get(url + `/?page=${page}&skip=${skip}`);
  }

  getDniGrupo(value) {
    let data: any = {};
    data.dni = value.dni;
    let url = `${apiURL}/afiliaciones/grupo/dni`;
    return this.http.post(url, data);
  }

  getDniJuntaElectoras(value) {
    let url = `https://sgeafiliados.pjn.gov.ar/afiliado-servicios/api/afiliacion?matricula=${value.dni}&genero=${value.sexo}`;

    return this.http.get(url);
  }

  postPlanilla(value: {}, nroLote: string) {
    let data: any = {};
    data.data = value;
    let url = `${apiURL}/afiliaciones/afilia/${nroLote}`;
    return this.http.post(url, data);
  }

  presentacionLte(value: {}, _id: string, op: string) {
    console.log(_id);
    let data: any = {};
    data.upd = value;
    data.op = op;
    let url = `${apiURL}/afiliaciones/presentacion/${_id}`;
    return this.http.patch(url, data);
  }
  ///udpEstadoPlanilla
  updPlanilla(value: {}, nroLte: string, documento?: string) {
    let data: any = {};
    data.upd = value;
    data.upd.documento = documento;

    let url = `${apiURL}/afiliaciones/updPlanilla/${nroLte}`;
    return this.http.patch(url, data);
  }

  ///indicadores

  getIndica() {
    let url = `${apiURL}/afiliaciones/indica`;
    return this.http.get(url);
  }
  /// planillas de los lotes

  getPlanillas(value: {}) {
    let data: any = {};
    data.data = value;
    let url = `${apiURL}/afiliaciones/planillas`;
    return this.http.post(url, data);
  }

  ///  Obtener seccionales

  getAllSecc() {
    let url = `${apiURL}/getseccionales`;
    return this.http.get(url);
  }

  getListadosMPN() {
    let url = `${apiURL}/afiliaciones/listados_afiliados`;
    return this.http.get(url);
  }

  getExportacionExcel = async (
    data?: any[],
    nombreColumnas?: string[],
    nombreHoja?: any
  ) => {
    /* console.log('datos', datos) */
    let ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    let wb: XLSX.WorkBook = {
      Sheets: { Empadronados: ws },
      SheetNames: ["Empadronados"],
    };
    let excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    this.saveAsExcelFile(excelBuffer, nombreHoja);
  };
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  //obetner un Afiliado

  getAfiliadoJunta(dni: string) {
    let url = `${apiURL}/afiliadoJunta`;
    return this.http.get(url + `/?dni=${dni}`);
  }

  ///
  updEstAfiliado(value: {}, documento: string) {
    let data: any = {};
    data.upd = value;
    data.upd.documento = documento;

    let url = `${apiURL}/updEstadoAfiliado`;
    return this.http.patch(url, data);
  }

  ///indicadore

  estdisticaAfiliado() {
    let url = `${apiURL}/estadisticasAfi`;
    return this.http.get(url);
  }
  grafAfiliadosEstados() {
    let url = `${apiURL}/gafricoBar`;
    return this.http.get(url);
  }
}
