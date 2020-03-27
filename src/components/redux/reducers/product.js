const initialState = {
  product: [],
  newProduct: [],
  filterProduct: [],
  searcProduct:[]
};

export default (product = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_PENDING':
      console.log('pending');
      return {
        ...state,
      };
    case 'GET_PRODUCT_REJECTED':
      return {
        ...state,
      };
    case 'GET_PRODUCT_FULFILLED':
      return {
        ...state,
        // product: state.product.concat(action.payload.data.result),
        product:action.payload.data.result

      };
    case 'GET_NEW_PENDING':
      console.log('pending');
      return {
        ...state,
      };
    case 'GET_NEW_REJECTED':
      return {
        ...state,
      };
    case 'GET_NEW_FULFILLED':
      return {
        ...state,
        newProduct: action.payload.data.result,
      };
    case 'FILTER_PRODUCT_PENDING':
      return {
        ...state,
      };
    case 'FILTER_PRODUCT_REJECTED':
      return {
        ...state,
      };
    case 'FILTER_PRODUCT_FULFILLED':
      console.log(action.payload, 'ini reducer');
      return {
        ...state,
        filterProduct: action.payload.data.result,
      };
    case 'SEARCH_PRODUCT_PENDING':
      return {
        ...state,
      };
    case 'SEARCH_PRODUCT_REJECTED':
      return {
        ...state,
      };
    case 'SEARCH_PRODUCT_FULFILLED':
      return {
        ...state,
        searcProduct: action.payload.data.result,
      };
    case 'SORT_PRODUCT_PENDING':
      return {
        ...state,
      };
    case 'SORT_PRODUCT_REJECTED':
      return {
        ...state,
      };
    case 'SORT_PRODUCT_FULFILLED':
      return {
        ...state,
        product: action.payload.data.result,
      };
    default:
      return state;
  }
});
