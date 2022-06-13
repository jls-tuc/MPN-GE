export const generarPlanilla = (planilla?: any) => {
  return {
    pageSize: {
      //esta en pt
      width: 1771, //20cm
      height: 3189, //36cm
    },
    pageOrientation: "portrait",
    pageMargins: [224, 1405, 5, 400], //pixeles  224px= 1.9cn
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
            width: 300,
            text: `Matrícula (LC/LE/DNI) Nro.: ${planilla.documento}`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          { width: 230, text: "" },
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
            width: 100,
            text: `Sexo: ${
              planilla.genero ? planilla.genero.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          {
            width: 150,
            text: `Fecha Nac:.${planilla.fechaNacimiento}`,
            bold: false,
            fontSize: 14,
          },
          { width: 280, text: "" },

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
            width: 250,
            text: `Profesíon u Oficio : ${
              planilla.profOficio ? planilla.profOficio.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          { width: 280, text: "" },
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
          { width: 100, text: "" },
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
          { width: 100, text: "" },

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
          { width: 220, text: "" },
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
          { width: 220, text: "" },
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
          { width: 220, text: "" },
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
            width: 300,
            text: `Matrícula (LC/LE/DNI) Nro.: ${planilla.documento}`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          { width: 230, text: "" },
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
            width: 100,
            text: `Sexo: ${
              planilla.genero ? planilla.genero.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          {
            width: 150,
            text: `Fecha Nac:.${planilla.fechaNacimiento}`,
            bold: false,
            fontSize: 14,
          },
          { width: 280, text: "" },

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
            width: 250,
            text: `Profesíon u Oficio : ${
              planilla.profOficio ? planilla.profOficio.toUpperCase() : ""
            }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          { width: 280, text: "" },
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
          { width: 100, text: "" },
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
          { width: 100, text: "" },

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
          { width: 220, text: "" },
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
          { width: 220, text: "" },
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
          { width: 220, text: "" },
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
        margin: [0, 0, 0, 10],
      },
    ],
  };
};
