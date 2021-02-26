import moment from "moment";
import "moment/locale/pt-br";

export default class Utils {
  static NameFormatter(params) {
    //Marcos Alberto Martins
    const { value } = params;

    const words = value.toLowerCase().split(" ");

    console.log(value);

    try {
      const result = words
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");

      return result;
    } catch (e) {
      console.log(e);
    }
  }

  static PhoneFormatter(params) {
    //Marcos Alberto Martins
    const { value } = params;

    let textoAjustado;
    let phoneClean = value
      .split(".")
      .join("")
      .split("-")
      .join("")
      .split("/")
      .join("")
      .split(" ")
      .join("")
      .split("(")
      .join("")
      .split(")")
      .join("");

    if (phoneClean.length === 11) {
      const parte1 = phoneClean.slice(0, 2);
      const parte2 = phoneClean.slice(2, 7);
      const parte3 = phoneClean.slice(7, 11);
      textoAjustado = `(${parte1}) ${parte2}-${parte3}`;
    } else {
      const parte1 = phoneClean.slice(0, 2);
      const parte2 = phoneClean.slice(2, 6);
      const parte3 = phoneClean.slice(6, 10);
      textoAjustado = `(${parte1}) ${parte2}-${parte3}`;
    }

    return textoAjustado;
  }

  static GridDateFormatterNasc(params) {
    moment.locale("pt-br");
    return moment(params.value).format("LL");
  }

  static GridDateFormatterCad(params) {
    return moment(params.value).fromNow();
  }

  static GridCurrencyFormatter(params) {
    return "R$ " + parseFloat(params.value).toLocaleString("pt");
  }

  static GridCpfCnpjFormatter(params) {
    let x = params.value.replace(/[^\d]/g, "");

    if (x.length === 11) {
      let cpf = params.value;
      // retira os caracteres indesejados...
      cpf = cpf.replace(/[^\d]/g, "");
      // realizar a formatação...
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    if (x.length === 14) {
      let cnpj = params.value;
      // retira os caracteres indesejados...
      cnpj = cnpj.replace(/[^\d]/g, "");
      // realizar a formatação...
      return cnpj.replace(/(\d{2})(\d{6})(\d{4})(\d{2})/, "$1.$2/$3-$4");
    }
  }

  static CpfCnpjFormatter(value) {
    if (value === null || value === undefined) return value;

    if (value.length === 11) {
      // retira os caracteres indesejados...
      let cpf = value.replace(/[^\d]/g, "");
      // realizar a formatação...
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    if (value.length === 14) {
      // retira os caracteres indesejados...
      let cpf = value.replace(/[^\d]/g, "");
      // realizar a formatação...
      return cpf.replace(/(\d{2})(\d{6})(\d{4})(\d{2})/, "$1.$2/$3-$4");
    }
  }

  static DateFormatter(value) {
    // 2005-03-10T10:07:06.000Z
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.000Z$/.test(value)) {
      console.log("valor original", value);
      const datePart = value.split("T")[0];
      console.log("date part", datePart);
      const timePart = value.split("T")[1];
      console.log("time part", timePart);
      const dateArray = datePart.split("-");
      const timeArray = timePart.split(":");

      return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]} ${timeArray[0]}:${timeArray[1]}`;
    }

    return value;
  }

  static DateFormatterCustom(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let formatterDay;
    if (day < 10) {
      formatterDay = "0" + day;
    } else {
      formatterDay = day;
    }

    let formatterMonth;
    if (month < 10) {
      formatterMonth = "0" + month;
    } else {
      formatterMonth = month;
    }

    let dateFormatted =
      year + "/" + formatterMonth + "/" + formatterDay + " 00:00:00";

    return dateFormatted;
  }

  static DateParser(value) {
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const dateArray = value.split("/");
      return new Date(dateArray[2], parseInt(dateArray[1]) - 1, dateArray[0]);
    }

    if (/^\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{1,2}$/.test(value)) {
      const dateTemp = value.split(" ")[0];
      const hourTemp = value.split(" ")[1];
      const dateArray = dateTemp.split("/");
      const timeArray = hourTemp.split(":");

      return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]} ${timeArray[0]}:${timeArray[1]}:00`;
    }

    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.000Z$/.test(value)) {
      console.log("date parser");
      console.log("valor original", value);
      const datePart = value.split("T")[0];
      console.log("date part", datePart);
      const timePart = value.split("T")[1];
      console.log("time part", timePart);
      const dateArray = datePart.split("-");
      const timeArray = timePart.split(":");

      const dataFormatada = `${dateArray[0]}/${dateArray[1]}/${dateArray[2]} ${timeArray[0]}:${timeArray[1]}:00`;
      console.log("valor retornar", dataFormatada);
      return dataFormatada;
    }

    return value;
  }
}
