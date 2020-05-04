import { initStore } from '../../Store/store';

// TODO shared with counties-store (& profileStats.js=>section.js !)
const removeFromNestedAttributes = (data) => {
  return data.map((d) => {
    let obj = {};
    for (const key in d.attributes) {
      obj[key] = d.attributes[key];
    }
    return obj;
  });
};

const calculateAverageOverTime = (data, ofWhat, numDays, newKeyName) => {
  const appendNewArrayContainingDataToBeAveraged = (theData) => {
    theData.map((d, i) => {
      if (i >= numDays - 1) {
        d[newKeyName] = theData.slice(i - (numDays - 1), i + 1);
      } else {
        d[newKeyName] = null;
      }
      return d;
    });
    return theData;
  };

  const reduceNewArrayToSingleAverageNum = (theData) => {
    const ans = theData.map((d) => {
      // const oldArr = d[newKeyName];
      if (d[newKeyName] && d[newKeyName].length === numDays) {
        const added = d[newKeyName].reduce((acc, e) => {
          acc += e[ofWhat];
          return acc;
        }, 0);
        if (added && !isNaN(added)) {
          d[newKeyName] = added / numDays;
          // d.oldArr = oldArr;
        }
      }
      return d;
    });

    return ans;
  };

  const ans = [
    appendNewArrayContainingDataToBeAveraged,
    reduceNewArrayToSingleAverageNum,
  ].reduce((data, fn) => fn(data), data);

  return ans;
};

const calculatePercentageChangeOf = (data, ofWhat = 'ConfirmedCovidCases') => {
  return data.map((d, i) => {
    const v2 = d[ofWhat];
    if (data[i - 1]) {
      // skip the first
      const v1 = data[i - 1][ofWhat];
      const change = v2 - v1;
      const percentageChange = Math.round((change * 100) / v1);
      d.percentageDailyChange = percentageChange;
    } else {
      d.percentageDailyChange = null;
    }
    return d;
  });
};

const configureStore = () => {
  const actions = {
    SET_ALL_DAILY_GRAPHS: (curState, response) => {
      const copy = curState.dailyGraphsStore;

      const withAverageChangeDailyCases = [
        removeFromNestedAttributes,
        calculatePercentageChangeOf,
      ].reduce((data, fn) => {
        return fn(data);
      }, response);

      const with5DayAverage = calculateAverageOverTime(
        withAverageChangeDailyCases,
        'percentageDailyChange',
        5,
        'percentageDailyChange5DayAverage'
      );

      const withAverageDailyCasesEach5Days = calculateAverageOverTime(
        with5DayAverage,
        'ConfirmedCovidCases',
        5,
        'AverageConfirmedCases'
      );

      // copy[0].all = withAverageDailyCasesEach5Days;
      copy.map((graph) => (graph.all = withAverageDailyCasesEach5Days));
    
      return { dailyGraphsStore: copy };
    },
    SET_DAILY_GRAPHS_SELECTED_DATE_AND_DATA: (curState, latestDate) => {
      const copy = curState.dailyGraphsStore;

      // each graph
      copy.map((graph) => {
        if (!latestDate) {
          latestDate = Math.max(...graph.all.map((c) => c.Date));
        }
        const latestData = graph.all.filter((a) => a.Date === latestDate)[0];
        graph.selectedDate = latestDate;
        graph.selectedDateData = latestData;
        return graph;
      });

      return { dailyAlt: copy };
    },
    SELECT_DAILY_GRAPHS_ATTRS: (curState, { fieldName, graphId }) => {
      // which graph??

      const copy = curState.dailyGraphsStore;

      copy.map((graph) => {
        // .avail bool
        if (graph.id === graphId) {
          const newAvail = graph.avail.map((a) => {
            if (a.fieldName === fieldName) {
              a.selected = !a.selected;
            }
            return a;
          });
          graph.avail = newAvail;

          // .selectedAttributeNames
          const doAttrNames = (oldNames) => {
            // not the right whatever....
            if (!oldNames.includes(fieldName)) {
              oldNames.push(fieldName);
            } else {
              const index = oldNames.indexOf(fieldName);
              if (index > -1) {
                oldNames.splice(index, 1);
              }
            }
            return oldNames;
          };

          graph.selectedAttributeNames = doAttrNames(
            graph.selectedAttributeNames
          );
        }

        return graph;
      });

      return { dailyAlt: copy };
    },
  };
  initStore(actions, {
    dailyGraphsStore: [
      {
        name: 'DailyAlt',
        id: 1,
        sectionName: 'Daily Cases',
        description:
          '5 day average is average of current days new confirmed cases and 4 previous days.',
        xAxisLabel: '# cases',
        xAxisAttribute: 'Date',
        selectedAttributeNames: ['ConfirmedCovidCases'],
        selectedDate: '',
        selectedDateData: [],
        all: [],
        avail: [
          {
            name: 'New Cases',

            fieldName: 'ConfirmedCovidCases',
            xAxisDescription: 'Number of Confirmed Cases',
            xAxisAttribute: 'Date',
            selected: true,
            color: 'var(--purple)',
          },
          {
            name: 'New Cases (5 day avg)',
            fieldName: 'AverageConfirmedCases',
            xAxisAttribute: 'Date',
            xAxisDescription: 'AverageConfirmedCases',
            selected: false,
            color: 'var(--yellow)',
          },
          {
            name: 'Total Cases',
            fieldName: 'TotalConfirmedCovidCases',
            xAxisDescription: 'Total Number of Confirmed Cases',
            xAxisAttribute: 'Date',
            selected: false,
            color: 'var(--blue)',
          },
        ],
      },
      {
        name: 'DailyAlt',
        id: 2,
        sectionName: 'Daily Cases (Percentage Change)',
        description:
          'Percentage Change calculated as (V2 - V1) x 100 / V1. 5 day average is average of current day and 4 previous days. ',
        xAxisLabel: '% change',
        xAxisAttribute: 'Date',
        selectedAttributeNames: ['percentageDailyChange'],
        selectedDate: '',
        selectedDateData: [],
        all: [],
        avail: [
          {
            name: 'New Cases (% change)',
            fieldName: 'percentageDailyChange',
            xAxisAttribute: 'Date',
            xAxisDescription: '% Daily Change (newCases)',
            selected: true,
            color: 'var(--blue)',
          },
          {
            name: 'New Cases (% change) 5 day avg',
            fieldName: 'percentageDailyChange5DayAverage',
            xAxisDescription: 'percentageDailyChange5DayAverage',
            xAxisAttribute: 'Date',
            selected: false,
            color: 'var(--purple)',
          },
        ],
      },
      {
        name: 'DailyAlt',
        id: 3,
        sectionName: 'Deaths',
        description: 'Description of deaths data.',
        xAxisLabel: '# deaths',
        xAxisAttribute: 'Date',
        selectedAttributeNames: ['ConfirmedCovidDeaths'],
        selectedDate: '',
        selectedDateData: [],
        all: [],
        avail: [
          {
            name: 'New Deaths',
            fieldName: 'ConfirmedCovidDeaths',
            xAxisDescription: 'Number of Deaths',
            xAxisAttribute: 'Date',
            selected: true,
            color: 'var(--green)',
          },

          {
            name: 'Total Deaths',
            fieldName: 'TotalCovidDeaths',
            xAxisDescription: 'Total Number of Deaths',
            xAxisAttribute: 'Date',
            selected: false,
            color: 'var(--orange)',
          },
        ],
      },
    ],
  });
};

export default configureStore;
