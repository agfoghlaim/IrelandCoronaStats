// import { initStore } from './store';
import { initStore } from '../../Store/store';
import * as d3 from 'd3';
const colorScale = d3
  .scaleSequential()
  .domain([0, 100])
  .interpolator(d3.interpolateRainbow);

const sortIntoArraysByCounty = (data, field = 'CountyName') => {
  // data in = [{galway},{galway},{longford}]
  // want data out = [[{galway},{galway}],[{longford}]]
  const usedCountyNames = [];
  const newData = [];
  data.forEach((d) => {
    // new county
    if (!usedCountyNames.includes(d[field])) {
      usedCountyNames.push(d[field]);
      newData.push([d]);
    } else {
      // find county in array of arrays and push new one in
      const correctArray = newData.filter((n) => n[0][field] === d[field])[0];
      correctArray.push(d);
    }
  });
  return newData;
};

// Shared with dailyAlt-store
const removeFromNestedAttributes = (data) => {
  return data.map((d) => {
    let obj = {};
    for (const key in d.attributes) {
      obj[key] = d.attributes[key];
    }
    return obj;
  });
};

// const removeFromNestedField = (data, field) => {
//   return data.map((d) => {
//     let obj = {};
//     for (const key in d[field]) {
//       obj[key] = d[field][key];
//     }
//     return obj;
//   });
// };
const getLatestDate = county => {
  const dates = county.stats.map((s) => s.TimeStampDate);
  const newestDate = Math.max(...dates.map((d) => d));
  return newestDate;
}
const getLatestForCounty = (county) => {
  const dates = county.stats.map((s) => s.TimeStampDate);
  const newestDate = Math.max(...dates.map((d) => d));
  const newestData = county.stats.filter((s) => s.TimeStampDate === newestDate);
  return newestData[0];
};

const turnArraysIntoNiceObjects = (data) => {
  return data.map((n, i) =>
    createManagableObjectAndSetFirstCountyToSelected(n, i)
  );
};

const doTediousStuff = (features) => {
  return [
    removeFromNestedAttributes,
    sortIntoArraysByCounty,
    turnArraysIntoNiceObjects,
  ].reduce((features, fn) => {
    return fn(features);
  }, features);
};

const createManagableObjectAndSetFirstCountyToSelected = (n, i) => {
  const obj = {};
  obj.name = n[0].CountyName;
  obj.selected = false;
  obj.stats = [...n];
  obj['color'] = colorScale(n[0].PopulationCensus16);
  if (i === 0) {
    obj['selected'] = true;
  }
  return obj;
};
const configureStore = () => {
  const actions = {
    SET_ALL_DATA: (curState, response) => {
      console.log("counties-store")
      const copy = curState.sections;
      const allCounties = doTediousStuff(response);
      copy[0].allCounties = allCounties;

      // default selectedCounty & selectedCountyLatestData
      copy[0].newSelectedCounty = allCounties[0];
      const latestDate = getLatestDate(allCounties[0])
      copy[0].selectedCountyLatestData = getLatestForCounty(allCounties[0]);
      copy[0].selectedDate = latestDate;
  
      return { sections: copy };
    },
    SET_ALL_COUNTIES_LATEST_DATA: (curState, response) =>{

      const withoutNestedAttributes = removeFromNestedAttributes(response);
      const copy = curState.sections;
      copy[0].allCountiesLatestData = withoutNestedAttributes;
    },
    SELECT_ATTRIBUTE: (curState, fieldName) => {
      const sectionUpdate = curState.sections[0].avail.map((a) => {
        if (a.fieldName === fieldName) {
          a.selected = true;
        } else {
          a.selected = false;
        }
        return a;
      });
      const update = curState.sections;
      update[0].avail = sectionUpdate;
      
      // also set just the name
      update[0].selectedAttributeName = fieldName;

      return { sections: update };
    },
    SELECT_COUNTY: (curState, county) => {
      const copy = curState.sections;

      const selectedCounty = copy[0].allCounties.filter(
        (a) => a.name === county
      )[0];
      const latestData = getLatestForCounty(selectedCounty);

      copy[0].newSelectedCounty = selectedCounty;

      // also set selectedCountyLatestData
      copy[0].selectedCountyLatestData = latestData;

      // and set selected bool in allCounties
      copy[0].allCounties = copy[0].allCounties.map((all) => {
        if (all.name === county) {
          all.selected = true;
        } else {
          all.selected = false;
        }
        return all;
      });

      return { sections: copy };
    },
    SELECT_DATE: (curState, date) => {

      // want to set selectedCountyLatest data to whatever is in newSelectedCounty ie find correct one by date in newSelectedCounty.state
      const copy = curState.sections;
      const ans = copy[0].newSelectedCounty.stats.filter(county=>county.TimeStampDate===date)[0]

      copy[0].selectedCountyLatestData = ans;
      copy[0].selectedDate = date;
      return {sections:copy}
    }
  };
  initStore(actions, {
    sections: [
      {
        name: 'Counties Time',
        sectionName: 'Counties',
        allCounties: [],
        allCountiesLatestData: [],
        newSelectedCounty: {},
        xAxisAttribute: 'TimeStampDate',
        selectedDate: '',
        selectedCountyLatestData: {}, // Rename, may as well use this for selected date data as well
        selectedAttributeName: 'ConfirmedCovidCases',
        dateFieldName: 'TimeStampDate',
        avail: [
          {
            name: 'Total Number of Cases',
            fieldName: 'ConfirmedCovidCases',
            yAxisAttribute: 'CountyName',
            xAxisDescription: 'Number of Confirmed Cases',
            selected: true,
            color: 'var(--purple)',
            data: [],
          },
          {
            name: 'Cases per 100,000',
            fieldName: 'PopulationProportionCovidCases',
            yAxisAttribute: 'CountyName',
            xAxisDescription: 'Cases per 100,000 of Population',
            selected: false,
            color: 'var(--green)',
            data: [],
          },
          {
            name: 'Population 2016',
            fieldName: 'PopulationCensus16',
            yAxisAttribute: 'Population 2016',
            xAxisDescription: 'Population 2016',
            selected: false,
            color: 'var(--orange)',
            data: [],
          },
        ],
      },
      
    ],
  });
};

export default configureStore;
