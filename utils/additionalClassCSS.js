const additionalClassCSS = (param) => {
  const obj = {};
  if (param) {
    if (Array.isArray(param)) {
      param.forEach((theme) => {
        obj[`_${theme}`] = true;
      });
    } else {
      obj[`_${param}`] = true;
    }
  }
  return obj;
};

export default additionalClassCSS;
