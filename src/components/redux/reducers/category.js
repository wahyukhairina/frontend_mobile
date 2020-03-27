const initialState = {
  category: [],
  isLoading: false
};

export default ( category = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_PENDING':
      return {
        ...state,
        isLoading : true
      };
    case 'GET_CATEGORY_REJECTED':
      return {
        ...state,
        isLoading : true
      };
    case 'GET_CATEGORY_FULFILLED':
      return {
        ...state,
        isLoading : false,
        category: action.payload.data.result,
      };
    default:
      return state;
  }
});
