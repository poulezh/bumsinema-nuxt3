const getPersonsByProfession = (persons, profession, count) => {
  return persons
    .filter((person) => person.enProfession === profession)
    .slice(0, count)
    .map((person) => ({ id: person.id, photo: person.photo, name: person.name }));
};

export default getPersonsByProfession;
