const initialstate = {
    user:[]
}

export default (user = (state=initialstate,action) =>{
    switch (action.type) {
        case 'POST_USER_PENDING' :
            return {
                ...state,
            }
        case 'POST_USER_REJECTED' :
            return {
                ...state
            }
        case 'POST_USER_FULFILLED' :
            const newDataUser = [...state.user, action.payload.data.result]
            return {
                ...state,
                user : newDataUser
            }
            case 'EDIT_USER_PENDING':
                return{
                    ...state
                }
            case 'EDIT_USER_REJECTED':
                return{
                    ...state
                }
            case 'EDIT_USER_FULFILLED':
                const newUserEdit=state.user.map(user=>{
                    if(user.id === action.payload.data.result.id){
                        return action.payload.data.result
                    }
                    return user
                })
                return {
                    state,
                    user:newUserEdit
                }
                case 'GET_USER_PENDING':
                    return {
                      ...state,
                    };
                  case 'GET_USER_REJECTED':
                    return {
                      ...state,
                    };
                  case 'GET_USER_FULFILLED':
                    return {
                      ...state,
                      user: action.payload.data.result,
                    };

        default:
            return state;
    }
})