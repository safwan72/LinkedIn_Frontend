import * as actions from "./actionType";
const initstate = {
    token: null,
    id: null,
    username: null,
    email: null,
};
const Reducer = (state = initstate, action) => {
    switch (action.type) {
        case actions.AUTH_SUCCESS:

            return {
                ...state,
                token: action.payload.token,
            }
        case actions.LOG_OUT:
            return {
                ...state,
                token: null,
                id: null,
                username: null,
                email: null,
            }
        case actions.GET_USER_DATA_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
            }

        default:
            return state;
    }
};
export default Reducer;