export default (dado, lista) => {
    console.log(lista)
  for (let l of lista) {
    if (l.id == dado.id) {
      return true;
    }
  }

  return false;
};
