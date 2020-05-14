import axios from 'axios';

export const removeNulls = (resp, fieldName) => {
  const noNulls = resp.filter((m) => {
    return m.attributes[fieldName] !== null;
  });
  return noNulls;
};

// export const removeFromNestedAttributes = (data) => {
//   return data.map((d) => {
//     let obj = {};
//     for (const key in d.attributes) {
//       obj[key] = d.attributes[key];
//     }
//     return obj;
//   });
// };

export const successfullyGotDataForEachSelectedAttr = (sectionAvail) => {
  const selected = sectionAvail.map((attr) => (attr.selected ? true : false));
  const fetched = sectionAvail.map((attr) => (attr.data.length ? true : false));

  const selectedButDataNotFetched = selected.map((s, i) => {
    if (s && !fetched[i]) return false;
    return true;
  });

  // ie fail if any false
  return selectedButDataNotFetched.filter((w) => !w).length === 0;
};

export const baseUrl = (specificUrlPart) =>{
  return `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=${specificUrlPart}&returnGeometry=false&outSR=4326&f=json`;
}
export const getOne = async (part) => {
  try {
    const response = await axios.get(baseUrl(part));
    return response.data.features;
  } catch (e) {
    return false;
  }
};