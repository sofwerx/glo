import { combineReducers } from "redux";
import counter from "./counter";
import authentication from "./authentication";

export default combineReducers({
  counter,
  authentication
});
