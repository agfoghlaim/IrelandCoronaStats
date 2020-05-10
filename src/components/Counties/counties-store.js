import { initStore } from '../../Store/store';
import { countiesStoreUtil as util, sharedUtil }  from '../../util-functions';

// Can't think of a better name than doTediousStuff so leaving this function here so one can easily see what it's doing.
const doTediousStuff = (features) => {
  return [
    util.removeFromNestedAttributes,
    util.sortIntoArraysByCounty,
    util.turnArraysIntoNiceObjects,
  ].reduce((features, fn) => {
    return fn(features);
  }, features);
};

const configureStore = () => {
  const actions = {
    SET_ALL_DATA: (curState, response) => {
      const copy = curState.sections;
      const allCounties = doTediousStuff(response);
      copy[0].allCounties = allCounties;

      // default selectedCounty & selectedCountyLatestData
      copy[0].newSelectedCounty = allCounties[0];

    
      copy[0].selectedCountyLatestData = util.getLatestOrSelectedDateForCounty(allCounties[0], undefined);

      // Set selected date to date of latest available data for init
      const latestDate = sharedUtil.getLatestDate(allCounties[0]);
      copy[0].selectedDate = latestDate;

      return { sections: copy };
    },
    SET_ALL_COUNTIES_LATEST_DATA: (curState, response) => {
      const withoutNestedAttributes = util.removeFromNestedAttributes(response);
      const copy = curState.sections;
      copy[0].allCountiesLatestData = withoutNestedAttributes;
    },
    UPDATE_ALL_COUNTIES_LATEST_DATA: (curState, date) => {
      const copy = curState.sections;

      const newAllCountiesLatestData = copy[0].allCounties.map(
        (county) =>
          county.stats.filter((stat) => stat.TimeStampDate === date)[0]
      );
      copy[0].allCountiesLatestData = newAllCountiesLatestData;

      return { sections: copy };
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

      // Should only happen on init, otherwise use selected Date
      const selectedDate = copy[0].selectedDate || '';
      const latestData = util.getLatestOrSelectedDateForCounty(selectedCounty, selectedDate);
      

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
      const ans = copy[0].newSelectedCounty.stats.filter(
        (county) => county.TimeStampDate === date
      )[0];

      copy[0].selectedCountyLatestData = ans;
      copy[0].selectedDate = date;

      // also set allCountiesLatestData
      return { sections: copy };
    },
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
