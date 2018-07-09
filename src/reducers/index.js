import { combineReducers } from "redux";
import counter from "./counter";
import authentication from "./authentication";
import units from './units';
import operation from './operation';
import equipment from './equipment';
import people from './people';
import location from './location';

export default combineReducers({
  counter,
  authentication,
  units,
  people,
  equipment,
  operation,
  location
});
