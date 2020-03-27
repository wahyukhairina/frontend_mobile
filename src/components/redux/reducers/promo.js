const initialState = {
  promo: [],
  promolebaran: [],
};

export default (promo = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROMO_PENDING':
      return {
        ...state,
      };
    case 'GET_PROMO_REJECTED':
      return {
        ...state,
      };
    case 'GET_PROMO_FULFILLED':
      return {
        ...state,
        promo: action.payload.data.result,
      };
    case 'GET_PROLEBARAN':
      return {
        ...state,
      };
    case 'GET_PROLEBARAN':
      return {
        ...state,
      };
    case 'GET_PROLEBARAN':
      return {
        ...state,
        promolebaran: action.payload.data.result,
      };
    default:
      return state;
  }
});
