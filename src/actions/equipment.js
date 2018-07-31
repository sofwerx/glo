// import fetch from 'isomorphic-fetch';

import EQUIPMENT from '../data/equipment';

export function loadEquipment() {
  return {
    type: "EQUIPMENT_LOADED",
    data: EQUIPMENT
  };
}
