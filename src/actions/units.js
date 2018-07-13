// import fetch from 'isomorphic-fetch';

import UNITS from '../data/units';


export function loadUnits() {
  return {
    type: "UNITS_LOADED",
    data: UNITS
  };
}
