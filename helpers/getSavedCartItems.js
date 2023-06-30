const getSavedCartItems = () => {
  const pegarItensStorage = localStorage.getItem('cartItems');
  return pegarItensStorage;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
