const initialState = {
    isLoading: false,
    shipping: [],
  };
  const cost = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
     
      case "POST_COST_PENDING":
        return {
          ...state
        };
  
      case "POST_COST_REJECTED":
        return {
          ...state
        };
  
      case "POST_COST_FULFILLED":
        console.log(action.payload.data[0].costs[0], 'ini action payload');
        const costAdd = [action.payload.data[0].costs[0]];
        return {
          ...state,
          shipping: costAdd
        };
  
      default:
        return state;
    }
  };
  
  export default cost;