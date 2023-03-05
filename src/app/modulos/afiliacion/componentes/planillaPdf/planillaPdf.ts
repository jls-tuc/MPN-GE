import moment from "moment";
import { logoGrilla } from "./logoBas64";

export const generarPlanilla = (planilla?: any, margen?: any) => {
  return {
    pageSize: {
      //esta en pt
      width: 802, //20cm
      height: 1443, //36cm
    },
    pageOrientation: "portrait",
    pageMargins: margen ? margen : [85, 500, 25, 25], //pixeles  224px= 1.9cn
    content: [
      {
        text: `Apellido y Nombre: ${planilla.apellido.toUpperCase()} ${planilla.nombre.toUpperCase()}`,
        bold: false,
        fontSize: 14,
        alignment: "left",
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          {
            width: 400,
            text: `Matrícula (LC/LE/DNI) Nro.: ${planilla.documento}`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },

          {
            width: "auto",
            text: `DM.: ${
              planilla.dm ? planilla.dm.toUpperCase() : ""
            }  Reg.: ${planilla.rg ? planilla.rg.toUpperCase() : ""} Clase.: ${
              planilla.clase
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          {
            width: 60,
            text: `Sexo: ${
              planilla.genero ? planilla.genero.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          {
            width: 340,
            text: `Fecha Nac.:${planilla.fechaNacimiento}`,
            bold: false,
            fontSize: 14,
          },
          {
            width: "auto",
            text: `Lugar Nac.:${
              planilla.lugar ? planilla.lugar.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        alignment: "justify",
        columns: [
          {
            width: 400,
            text: `Profesíon u Oficio : ${
              planilla.profOficio ? planilla.profOficio.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          {
            width: "auto",
            text: `Estado Civil.:${
              planilla.estadoCivil ? planilla.estadoCivil.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 40],
      },
      {
        alignment: "justify",
        columns: [
          { width: 200, text: "" },
          {
            width: "auto",
            text: `Último domicilio      Distrito electoral.: ${
              planilla.ultDomicilio.distritoElec
                ? planilla.ultDomicilio.distritoElec.toUpperCase()
                : ""
            }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        alignment: "justify",
        columns: [
          { width: 200, text: "" },

          {
            width: "auto",
            text: `según doc.cívico     Partido o departamento: ${
              planilla.ultDomicilio.partidoDepto
                ? planilla.ultDomicilio.partidoDepto.toUpperCase()
                : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        alignment: "justify",
        columns: [
          { width: 320, text: "" },
          {
            width: "auto",
            text: `Cuartel o Pedanía: ${
              planilla.ultDomicilio.cuartelPedania
                ? planilla.ultDomicilio.cuartelPedania.toUpperCase()
                : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        alignment: "justify",
        columns: [
          { width: 320, text: "" },
          {
            width: "auto",
            text: `Ciudad, pueblo o localidad: ${
              planilla.ultDomicilio.localidad
                ? planilla.ultDomicilio.localidad.toUpperCase()
                : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        alignment: "justify",
        columns: [
          { width: 320, text: "" },
          {
            width: "auto",
            text: `Domicilio: ${
              planilla.ultDomicilio.calle
                ? planilla.ultDomicilio.calle.toUpperCase()
                : ""
            }   Nro.: ${
              planilla.ultDomicilio.nro
                ? planilla.ultDomicilio.nro.toUpperCase()
                : ""
            }    PI.: ${
              planilla.ultDomicilio.piso
                ? planilla.ultDomicilio.piso.toUpperCase()
                : ""
            }    DP.: ${
              planilla.ultDomicilio.dep
                ? planilla.ultDomicilio.dep.toUpperCase()
                : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 240],
      },
      {
        text: `Apellido y Nombre: ${planilla.apellido.toUpperCase()} ${planilla.nombre.toUpperCase()}`,
        bold: false,
        fontSize: 14,
        alignment: "left",
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          {
            width: 400,
            text: `Matrícula (LC/LE/DNI) Nro.: ${planilla.documento}`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },

          {
            width: "auto",
            text: `DM.: ${
              planilla.dm ? planilla.dm.toUpperCase() : ""
            }  Reg.: ${planilla.rg ? planilla.rg.toUpperCase() : ""} Clase.: ${
              planilla.clase
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          {
            width: 60,
            text: `Sexo: ${
              planilla.genero ? planilla.genero.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          {
            width: 340,
            text: `Fecha Nac.:${planilla.fechaNacimiento}`,
            bold: false,
            fontSize: 14,
          },
          {
            width: "auto",
            text: `Lugar Nac.:${
              planilla.lugar ? planilla.lugar.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        alignment: "justify",
        columns: [
          {
            width: 400,
            text: `Profesíon u Oficio : ${
              planilla.profOficio ? planilla.profOficio.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          {
            width: "auto",
            text: `Estado Civil.:${
              planilla.estadoCivil ? planilla.estadoCivil.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 40],
      },
      {
        alignment: "justify",
        columns: [
          { width: 200, text: "" },
          {
            width: "auto",
            text: `Último domicilio      Distrito electoral.: ${
              planilla.ultDomicilio.distritoElec
                ? planilla.ultDomicilio.distritoElec.toUpperCase()
                : ""
            }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        alignment: "justify",
        columns: [
          { width: 200, text: "" },

          {
            width: "auto",
            text: `según doc.cívico     Partido o departamento: ${
              planilla.ultDomicilio.partidoDepto
                ? planilla.ultDomicilio.partidoDepto.toUpperCase()
                : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        alignment: "justify",
        columns: [
          { width: 320, text: "" },
          {
            width: "auto",
            text: `Cuartel o Pedanía: ${
              planilla.ultDomicilio.cuartelPedania
                ? planilla.ultDomicilio.cuartelPedania.toUpperCase()
                : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        alignment: "justify",
        columns: [
          { width: 320, text: "" },
          {
            width: "auto",
            text: `Ciudad, pueblo o localidad: ${
              planilla.ultDomicilio.localidad
                ? planilla.ultDomicilio.localidad.toUpperCase()
                : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        alignment: "justify",
        columns: [
          { width: 320, text: "" },
          {
            width: "auto",
            text: `Domicilio: ${
              planilla.ultDomicilio.calle
                ? planilla.ultDomicilio.calle.toUpperCase()
                : ""
            }   Nro.: ${
              planilla.ultDomicilio.nro
                ? planilla.ultDomicilio.nro.toUpperCase()
                : ""
            }    PI.: ${
              planilla.ultDomicilio.piso
                ? planilla.ultDomicilio.piso.toUpperCase()
                : ""
            }    DP.: ${
              planilla.ultDomicilio.dep
                ? planilla.ultDomicilio.dep.toUpperCase()
                : ""
            }`,
            bold: false,
            fontSize: 14,
          },
        ],
        margin: [0, 0, 0, 400],
      },
    ],
  };
};

export const generarInfoLote = (data?, nroLte?, fechaP?) => {
  return {
    pageSize: "A4",
    pageOrientation: "portrait",
    content: [
      {
        columns: [
          {
            image: logoGrilla,
            alignment: "left",
            width: 100,
            height: 36,
          },
        ],
      },
      {
        columns: [
          {
            text: "",
            alignment: "left",
            width: 150,
            height: 10,
          },
          {
            text: nroLte ? `Nro.Lote:${nroLte}` : `"Nro.Lote:''`,
            bold: false,
            fontSize: 10,
            alignment: "left",
          },
        ],
        margin: [0, -40, 0, 3],
      },
      {
        columns: [
          {
            text: "",
            alignment: "left",
            width: 150,
            height: 10,
          },
          {
            text: "Referente: JUNTA DE GOBIERNO BETIANA PANES 4/7",
            bold: false,
            fontSize: 10,
            alignment: "left",
          },
        ],
        margin: [0, 0, 0, 3],
      },
      {
        columns: [
          {
            text: "",
            alignment: "left",
            width: 150,
            height: 10,
          },
          {
            text: fechaP ? `Fecha Pres:${fechaP}` : `"Fecha Pres:''`,
            bold: false,
            fontSize: 10,
            alignment: "left",
          },
        ],
        margin: [0, 0, 0, 10],
      },

      getRegistrosObject(
        data.sort((a: any, b: any) => a.documento - b.documento)
      ),
      {
        columns: [
          {
            text: `${moment().format("L")} ${moment().format("LTS")}`,
            bold: false,
            fontSize: 10,
            alignment: "left",
          },
          {
            text: `JUNTA DE GOBIERNO`,
            bold: true,
            fontSize: 10,
            alignment: "center",
          },
          {
            text: `Página`,
            bold: true,
            fontSize: 10,
            alignment: "right",
          },
        ],
        margin: [0, 10, 0, 3],
      },
      {
        text: `MOVIMIENTO POPULAR NEUQUÍNO`,
        bold: true,
        fontSize: 10,
        alignment: "center",
      },
    ],
    styles: {
      tableHeader: {
        fontSize: 12,
        bold: true,
        fillColor: "#0080FF",
      },
      tableBody: {
        fontSize: 10,
        // fillColor: '#fff',
      },
    },
  };
};
const getRegistrosObject = (data) => {
  moment.locale("es-mx");
  const registros = data.map((ex) => {
    return [
      ex.documento,
      ex.nombre.toUpperCase() + " " + ex.apellido.toUpperCase(),
      `${
        ex.domicilioPostal.calle ? ex.domicilioPostal.calle.toUpperCase() : " "
      } ${
        ex.domicilioPostal.nro ? ex.domicilioPostal.nro.toUpperCase() : " "
      } ${ex.domicilioPostal.dep ? ex.domicilioPostal.dep.toUpperCase() : ""}`,
      ex.domicilioPostal.circuito.toUpperCase(),
    ];
  });

  return {
    style: "tableBody",
    table: {
      widths: ["*", "*", "*", "*"],
      body: [
        [
          {
            text: "Doc",
            style: "tableHeader",
          },
          {
            text: "Nombre y Apellido",
            style: "tableHeader",
          },
          {
            text: "Dirección",
            style: "tableHeader",
          },
          {
            text: "Circuito",
            style: "tableHeader",
          },
        ],
        ...registros,
      ],
    },
    layout: {
      fillColor: (rowIndex, node, columnIndex) => {
        return rowIndex % 2 === 0 ? "#e9ecef" : "#f8f9fa";
      },
    },
  };
};
