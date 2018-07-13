// import fetch from 'isomorphic-fetch';

import PEOPLE from '../data/people';


export function loadPeople() {
  return {
    type: "PEOPLE_LOADED",
    data: PEOPLE
  };
}
