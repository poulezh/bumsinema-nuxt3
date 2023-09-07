const convertToString = (data) => {
  const names = data.map((item) => item.name);
  const result = names.join(', ') + '.';
  return result;
};

export default convertToString;
