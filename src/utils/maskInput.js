export function phoneMask(target) {
  let v = target.value;
  let elem = target.id;
  if (v.length < 15) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d\d)(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    document.getElementById(elem).value = v.substring(0, 15);
    return v;
  } else {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d\d)(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d{5})(\d)/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    document.getElementById(elem).value = v.substring(0, 15);
  }
}

export function cepMask(target) {
  let v = target.value;
  let elem = target.id;

  v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
  v = v.replace(/^([\d]{2})\.*([\d]{3})-*([\d]{3})/, "$1.$2-$3");
  document.getElementById(elem).value = v.substring(0, 10);
  return v;
}

export function ufMask(target) {
  let v = target.value.toUpperCase();
  let elem = target.id;

  v = v.replace(/[A-Z]{5}/, "");
  document.getElementById(elem).value = v.substring(0, 2);
  return v;
}

export function cpfOrCnpjMask(target) {
  let v = target.value;
  let elem = target.id;
  if (v.length < 15) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
    document.getElementById(elem).value = v.substring(0, 15);
    return v;
  } else {
    v = v
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    v = !v[2]
      ? v[1]
      : v[1] + "." + v[2] + "." + v[3] + "/" + v[4] + (v[5] ? "-" + v[5] : "");

    document.getElementById(elem).value = v.substring(0, 18);
    return v;
  }
}

export function nameMask(target) {
  let v = target.value;
  let elem = target.id;

  const text = v
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  document.getElementById(elem).value = text;
  return text;
}
