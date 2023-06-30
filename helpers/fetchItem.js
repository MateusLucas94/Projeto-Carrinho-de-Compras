const fetchItem = async (endPoint) => {
  try {
  const apiItens = `https://api.mercadolibre.com/items/${endPoint}`;
  const pegarRespostaFetch = await fetch(apiItens);
  const dadosDaResposta = await pegarRespostaFetch.json();
  return dadosDaResposta;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
