import { initStore } from '../../Store/store';
import { countiesStoreUtil as util, sharedUtil } from '../../util-functions';

// Leaving this function here so one can easily see what it's doing.
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
    INIT_COUNTY_DATA: (curState, response) => {
      const copy = curState.sections;

      const allCounties = doTediousStuff(response);
      copy[0].allCounties = allCounties;

      // Init Default selected county to first county in array
      copy[0].allStatsAboutSelectedCounty = allCounties[0];
      copy[0].selectedCountyDataForSelectedDate = util.getLatestOrSelectedDateDataForCounty(
        allCounties[0],
        undefined
      );

      // Init Default date to date of latest available data for first county in array
      copy[0].selectedDate = sharedUtil.getLatestDate(allCounties[0]);

      return { sections: copy };
    },
    INIT_ALL_COUNTIES_LATEST_DATA: (curState, response) => {
      const withoutNestedAttributes = util.removeFromNestedAttributes(response);
      const copy = curState.sections;
      copy[0].allCountiesLatestData = withoutNestedAttributes;
    },

    // When selected date changes...
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
      const copy = curState.sections;

      const withThisFieldNameSelected = util.selectAttributeWithThisFieldName(
        copy[0].avail,
        fieldName
      );

      copy[0].avail = withThisFieldNameSelected;

      // also set just the name
      copy[0].selectedAttributeName = fieldName;

      return { sections: copy };
    },

    
    SELECT_COUNTY: (curState, county) => {
      const copy = curState.sections;

      const selectedCounty = copy[0].allCounties.filter(
        (a) => a.name === county
      )[0];

      const selectedDate = copy[0].selectedDate || ''; 
      const latestData = util.getLatestOrSelectedDateDataForCounty(
        selectedCounty,
        selectedDate
      );

      copy[0].allStatsAboutSelectedCounty = selectedCounty;
      copy[0].selectedCountyDataForSelectedDate = latestData;

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
      // want to set selectedCountyLatest data to whatever is in allStatsAboutSelectedCounty ie find correct one by date in allStatsAboutSelectedCounty.stats
      const copy = curState.sections;
      const ans = copy[0].allStatsAboutSelectedCounty.stats.filter(
        (county) => county.TimeStampDate === date
      )[0];

      copy[0].selectedCountyDataForSelectedDate = ans;
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
        allCounties: [], // allCountiesAllResultsConfirmedCasesMoreThanZero 
        allCountiesLatestData: [], // [{county}x26]
        allStatsAboutSelectedCounty: {}, // Is one {} from allCounties[]
        xAxisAttribute: 'TimeStampDate',
        selectedDate: '',
        selectedCountyDataForSelectedDate: {}, // Rename, may as well use this for selected date data as well
        selectedAttributeName: 'ConfirmedCovidCases',
      
        avail: [
          {
            name: 'Total Number of Cases',
            fieldName: 'ConfirmedCovidCases',
            yAxisAttribute: 'CountyName',
            xAxisDescription: 'Number of Confirmed Cases',
            selected: true,
            color: 'var(--purple)',
          },
          {
            name: 'Cases per 100,000',
            fieldName: 'PopulationProportionCovidCases',
            yAxisAttribute: 'CountyName',
            xAxisDescription: 'Cases per 100,000 of Population',
            selected: false,
            color: 'var(--green)',
          },
          {
            name: 'Population 2016',
            fieldName: 'PopulationCensus16',
            yAxisAttribute: 'Population 2016',
            xAxisDescription: 'Population 2016',
            selected: false,
            color: 'var(--orange)',
          },
        ],
      },
    ],
  });
};

export default configureStore;
