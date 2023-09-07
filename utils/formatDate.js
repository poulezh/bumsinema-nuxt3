const formatDate = (date) => {
  const minutes = date;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} ч ${remainingMinutes} мин`;
};

export default formatDate;
