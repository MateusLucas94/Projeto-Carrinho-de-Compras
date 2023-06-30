const fetchProducts = async (endpointDaChamada) => {
  try {
    if (endpointDaChamada === undefined) {
      throw new Error('You must provide an url');
    }
  const minhaApi = `https://api.mercadolibre.com/sites/MLB/search?q=${endpointDaChamada}`;
  const resultadoDaChamada = await fetch(minhaApi);
  const data = await resultadoDaChamada.json();
  return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
