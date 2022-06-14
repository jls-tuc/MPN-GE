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
            text: `DM.: ${planilla.dm ? planilla.dm.toUpperCase() : ""
              }  Reg.: ${planilla.rg ? planilla.rg.toUpperCase() : ""} Clase.: ${planilla.clase
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
            text: `Sexo: ${planilla.genero ? planilla.genero.toUpperCase() : ""
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
            text: `Lugar Nac.:${planilla.lugar ? planilla.lugar.toUpperCase() : ""
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
            text: `Profesíon u Oficio : ${planilla.profOficio ? planilla.profOficio.toUpperCase() : ""
              }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          {
            width: "auto",
            text: `Estado Civil.:${planilla.estadoCivil ? planilla.estadoCivil.toUpperCase() : ""
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
            text: `Último domicilio      Distrito electoral.: ${planilla.ultDomicilio.distritoElec
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
            text: `según doc.cívico     Partido o departamento: ${planilla.ultDomicilio.partidoDepto
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
            text: `Cuartel o Pedanía: ${planilla.ultDomicilio.cuartelPedania
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
            text: `Ciudad, pueblo o localidad: ${planilla.ultDomicilio.localidad
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
            text: `Domicilio: ${planilla.ultDomicilio.calle
              ? planilla.ultDomicilio.calle.toUpperCase()
              : ""
              }   Nro.: ${planilla.ultDomicilio.nro
                ? planilla.ultDomicilio.nro.toUpperCase()
                : ""
              }    PI.: ${planilla.ultDomicilio.piso
                ? planilla.ultDomicilio.piso.toUpperCase()
                : ""
              }    DP.: ${planilla.ultDomicilio.dep
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
            text: `DM.: ${planilla.dm ? planilla.dm.toUpperCase() : ""
              }  Reg.: ${planilla.rg ? planilla.rg.toUpperCase() : ""} Clase.: ${planilla.clase
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
            text: `Sexo: ${planilla.genero ? planilla.genero.toUpperCase() : ""
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
            text: `Lugar Nac.:${planilla.lugar ? planilla.lugar.toUpperCase() : ""
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
            text: `Profesíon u Oficio : ${planilla.profOficio ? planilla.profOficio.toUpperCase() : ""
              }`,
            bold: false,
            fontSize: 14,
            alignment: "left",
          },
          {
            width: "auto",
            text: `Estado Civil.:${planilla.estadoCivil ? planilla.estadoCivil.toUpperCase() : ""
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
            text: `Último domicilio      Distrito electoral.: ${planilla.ultDomicilio.distritoElec
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
            text: `según doc.cívico     Partido o departamento: ${planilla.ultDomicilio.partidoDepto
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
            text: `Cuartel o Pedanía: ${planilla.ultDomicilio.cuartelPedania
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
            text: `Ciudad, pueblo o localidad: ${planilla.ultDomicilio.localidad
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
            text: `Domicilio: ${planilla.ultDomicilio.calle
              ? planilla.ultDomicilio.calle.toUpperCase()
              : ""
              }   Nro.: ${planilla.ultDomicilio.nro
                ? planilla.ultDomicilio.nro.toUpperCase()
                : ""
              }    PI.: ${planilla.ultDomicilio.piso
                ? planilla.ultDomicilio.piso.toUpperCase()
                : ""
              }    DP.: ${planilla.ultDomicilio.dep
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
