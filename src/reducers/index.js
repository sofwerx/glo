import { combineReducers } from "redux";
import counter from "./counter";
import authentication from "./authentication";
import units from './units';

export default combineReducers({
  counter,
  authentication,
  units
});
