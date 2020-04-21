// import { initStore } from './store';
import { initStore } from '../../../Store/store';
import * as d3 from 'd3';
const colorScale = d3
  .scaleSequential()
  .domain([0, 100])
  .interpolator(d3.interpolateRainbow);

const sortIntoArraysBy = (data, field) => {
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
const getCountyCases = (data) => {
  const cases = data.map((d) => {
    return {
      CountyName: d.attributes.CountyName,
      ConfirmedCovidCases: d.attributes.ConfirmedCovidCases,
      FID: d.attributes.FID,
      PopulationProportionCovidCases:
        d.attributes.PopulationProportionCovidCases,
      PopulationCensus16: d.attributes.PopulationCensus16,
      TimeStamp: d.attributes.TimeStampDate,
    };
  });

  return cases;
};

const configureStore = () => {
  const actions = {
    SET_ALL_DATA: (curState, response) => {
      const withoutNestedAttributes = getCountyCases(response);
      const nestedArrayPerCounty = sortIntoArraysBy(
        withoutNestedAttributes,
        'CountyName'
      );
      const createManagableObjectAndSetFirstCountyToSelected = (n, i) => {
        const obj = {};
        // obj[`${n[0].CountyName}`] = [...n];
        obj.name = n[0].CountyName;
        obj.selected = false;
        obj.stats = [...n];
        obj['color'] = colorScale(n[0].PopulationCensus16);
        if (i === 0) {
          obj['selected'] = true;
        }
        return obj;
      };
      const update = curState.sections;
      update[0].allData = nestedArrayPerCounty;
      const allCounties = nestedArrayPerCounty.map((n, i) =>
        createManagableObjectAndSetFirstCountyToSelected(n, i)
      );
      update[0].allCounties = allCounties;

      // default selectedCounty
      update[0].newSelectedCounty = allCounties[0];
      return { sections: update };
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

      return { sections: update };
    },
    SELECT_COUNTY: (curState, county) => {
      const copy = curState.sections;
      copy[0].selectedCounty = copy[0].allData.filter(
        (d) => d[0].CountyName === county
      )[0];
      copy[0].newSelectedCounty = copy[0].allCounties.filter(
        (a) => a.name === county
      )[0];

      // also set selected in allCounties
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
  };
  initStore(actions, {
    sections: [
      {
        name: 'Counties Time',
        sectionName: 'Counties',
        allData: [],
        allCounties: [],
        selectedCounty: [],
        newSelectedCounty: {},
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
          // {
          //   name: 'Population 2016',
          //   fieldName: 'PopulationCensus16',
          //   yAxisAttribute: 'Population 2016',
          //   xAxisDescription: 'Population 2016',
          //   selected: false,
          //   color: 'var(--orange)',
          //   data: [],
          // },
        ],
      },
    ],
  });
};

export default configureStore;
