export function phoneMaskLabel(label) {
  if (label != "" || label != null) {
    let v = label.replace(/\D/g, ""); //Remove tudo o que não é dígito
    if (label.length < 15) {
      v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
      v = v.replace(/^(\d\d)(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
      v = v.replace(/(\d{4})(\d)/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
      return v;
    } else {
      v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
      v = v.replace(/^(\d\d)(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
      v = v.replace(/(\d{5})(\d)/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    }
  }
  return label;
}

export function cepMaskLabel(label) {
  if (label != "" || label != null) {
    let v = label.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^([\d]{2})\.*([\d]{3})-*([\d]{3})/, "$1.$2-$3");
    return v;
  }
  return label;
}

export function ufMaskLabel(label) {
  if (label != "" || label != null) {
    let v = label.toUpperCase();
    v = v.replace(/[A-Z]{5}/, "").substring(0, 2);
    return v;
  }
  return label;
}

export function cpfOrCnpjMaskLabel(v) {
  if (v != "" || v != null) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    if (v.length < 11) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
      return v;
    } else {
      v = v
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
      v = !v[2]
        ? v[1]
        : v[1] +
          "." +
          v[2] +
          "." +
          v[3] +
          "/" +
          v[4] +
          (v[5] ? "-" + v[5] : "");
      return v;
    }
  }
  return v;
}

export function nameMaskLabel(v) {
  if (v != "" || v != null || undefined) {
    console.log(v);
    const text = v
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
    return text;
  }
  return v;
}
