import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
const mystore = createStore(reducer, applyMiddleware(thunk));

export default mystore;