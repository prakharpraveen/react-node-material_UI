import { combineReducers } from "redux";
import authorReducer from "./authorReducer";
import userReducer from "./userReducer";

export default combineReducers({
    authorReducer,
    userReducer
});
