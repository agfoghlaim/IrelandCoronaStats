import { initStore } from '../../Store/store';

const MARCH_17_2020 = 1584316800000;
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


const setSelectedDateAndData = (copy, latestDate) => {

  return copy.map((graph) => {
    const dateField = graph.xAxisAttribute;
    if (!latestDate) {
 
      latestDate = Math.max(...graph.all.map((c) => c[dateField]));
    }
    const latestData = graph.all.filter((a) => a[dateField] === latestDate)[0];
    graph.selectedDate = latestDate;
    graph.selectedDateData = latestData;
    return graph;
  });
}

// Statistic profile data doesn't exist before this date but the keys are still included with null values. Remove them. I can't figure out how to query the api properly. 
const removeResultsWithDateBefore = (data) => {
  return data.filter(d=> d.StatisticsProfileDate > MARCH_17_2020);
};

// Split the response up into the relevant it's relevant store.avail[].attrData[]
const splitIntoAttrData = ( storeData ) => {

  const ans = storeData.map( graph => {

    graph.avail = graph.avail.map( avail => {
     
      // pull out corresponding from all
      const curFieldName = avail.fieldName;
      
      const ans = graph.all.map(r=>{
    
        const field = {};
          // Or empty string because things go wrong later if there's any empty field {}'s in the array. 
          field[curFieldName]= r[curFieldName] || '';
          field[graph.xAxisAttribute]= r[graph.xAxisAttribute] || ''
         
        return field;
      });
    
      avail.attrData = ans;
      return avail;
    })
    return graph;
  })

  
  return ans;
}

const processDailyData = ( graphsCopy, response ) => {
 
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
  
  // TODO graph.all is the same for every graph. Should be pulled up or outside somewhere. I've added 'allSliceData' to the two store slices for it but i  It was used all over the place in components but I've split the data instead into it's own store.avail[].attrData[]. It's now used only in this file (I'm nearly sure) - I still need it ONCE to actually get the data split properly in splitIntoAttrData(), but I don't need a copy of it for every graph.
  graphsCopy.map((graph) => (graph.all = withAverageDailyCasesEach5Days));
  graphsCopy = splitIntoAttrData(graphsCopy);

  return graphsCopy;
}

const configureStore = () => {
  const actions = {
    SET_ALL_DAILY_GRAPHS: (curState, response) => {
 
      const graphsCopy = curState.dailyGraphsStore.graphs;
      
      const ans = processDailyData(graphsCopy, response);

      
      return { graphs: ans };
  
    },
    SET_ALL_PROFILE_STATS: (curState, response) => {
      const copy = curState.profileStatsStore.graphs;

      const withoutAttributesAndAfterMarch17 = [
        removeFromNestedAttributes,
        removeResultsWithDateBefore
      ].reduce((data, fn) => {
        return fn(data);
      }, response);
      
      let ans = copy.map((graph) => (graph.all = withoutAttributesAndAfterMarch17));

      ans = splitIntoAttrData(copy);
   
      return { graphs: ans };
    },
    // shared
    SET_DAILY_STORE_DATE_AND_DATA: (curState, {latestDate, storeName}) => {

      const copy = curState[storeName].graphs;

      const ans = setSelectedDateAndData(copy, latestDate)

      return { graphs: ans };
    },
    // shared
    SELECT_DAILY_GRAPHS_ATTRS: (curState, { fieldName, graphId, storeName }) => {
  
      const copy = curState[storeName].graphs;

      copy.map((graph) => {

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

      return { dailyAlt: copy.graphs };
    },
  };
  initStore(actions, {
    dailyGraphsStore: {
      description:
          '',
      allSliceData: [],
      graphs: [
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
            color: 'var(--green)',
            attrData: [],
          },
          {
            name: 'New Cases (5 day avg)',
            fieldName: 'AverageConfirmedCases',
            xAxisAttribute: 'Date',
            xAxisDescription: 'AverageConfirmedCases',
            selected: false,
            color: 'var(--yellow)',
            attrData: [],
          },
          {
            name: 'Total Cases',
            fieldName: 'TotalConfirmedCovidCases',
            xAxisDescription: 'Total Number of Confirmed Cases',
            xAxisAttribute: 'Date',
            selected: false,
            color: 'var(--white)',
            attrData: [],
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
            attrData: [],
          },
          {
            name: 'New Cases (% change) 5 day avg',
            fieldName: 'percentageDailyChange5DayAverage',
            xAxisDescription: 'percentageDailyChange5DayAverage',
            xAxisAttribute: 'Date',
            selected: false,
            color: 'var(--purple)',
            attrData: [],
          },
        ],
      },
      {
        name: 'DailyAlt',
        id: 3,
        sectionName: 'Deaths',
        description: '',
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
            attrData: [],
          },

          {
            name: 'Total Deaths',
            fieldName: 'TotalCovidDeaths',
            xAxisDescription: 'Total Number of Deaths',
            xAxisAttribute: 'Date',
            selected: false,
            color: 'var(--orange)',
            attrData: [],
          },
        ],
      },
      ],
    },
    //===================================
    profileStatsStore: {
      description:
          'This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center. New data is released each evening and dates back to 12am two days previously.',
      allSliceData: [],
      graphs: [
      {
        name: 'transmissionType',
        id: 1,
        sectionName: 'Transmission Type',
        description: '',
        xAxisLabel: '#Cases',
        xAxisAttribute: 'StatisticsProfileDate',
        selectedAttributeNames: ['CommunityTransmission'],
        selectedDate: '',
        selectedDateData: [],
        all: [],
        avail: [
          {
            name: 'Community Transmission',
            fieldName: 'CommunityTransmission',
            xAxisDescription: '#Cases',
            xAxisAttribute: 'StatisticsProfileDate',
            selected: true,
            color: 'var(--green)',
            attrData: [],
          },
          {
            name: 'Close Contact',
            fieldName: 'CloseContact',
            xAxisDescription: '#Cases',
            xAxisAttribute: 'StatisticsProfileDate',
            selected: false,
            color: 'var(--blue)',
            attrData: [],
          },
          {
            name: 'Travel Abroad',
            fieldName: 'TravelAbroad',
            xAxisDescription: '#Cases',
            xAxisAttribute: 'StatisticsProfileDate',
            selected: false,
            color: 'var(--yellow)',
            attrData: [],
          },
          {
            name: 'Under Investigation',
            fieldName: 'UnderInvestigation',
            xAxisDescription: '#Cases',
            xAxisAttribute: 'StatisticsProfileDate',
            selected: false,
            color: 'var(--orange)',
            attrData: [],
          },
          {
            name: 'Analysis based on #cases',
            fieldName: 'CovidCasesConfirmed',
            xAxisDescription: '#Cases',
            xAxisAttribute: 'StatisticsProfileDate',
            selected: false,
            color: 'var(--white)',
            attrData: [],
          },
        ],
      },
      {
        name: 'hospitalisations',
        id: 2,
        sectionName: 'Hospitalisations',
        description:'',
        xAxisLabel: '#Cases Hospitalised',
        xAxisAttribute: 'StatisticsProfileDate',
        selectedAttributeNames: ['HospitalisedCovidCases'],
        selectedDate: '',
        selectedDateData: [],
        all: [],
        avail: [
          {
            name: 'Hospitalised',
            fieldName: 'HospitalisedCovidCases',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases Hospitalised',
            selected: true,
            color: 'var(--yellow)',
            attrData: [],
          },
          {
            name: 'Requiring ICU',
            fieldName: 'RequiringICUCovidCases',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases Hospitalised',
            selected: false,
            color: 'var(--green)',
            attrData: [],
          },
    
          {
            name: 'Analysis based on #cases',
            fieldName: 'CovidCasesConfirmed',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases Hospitalised',
            selected: false,
            color: 'var(--white)',
            attrData: [],
          },
        ],
      },
      {
        name: 'genderProfiles',
        id: 3,
        sectionName: 'Gender Profiles',
        description: '',
        xAxisLabel: '# Cases',
        xAxisAttribute: 'StatisticsProfileDate',
        selectedAttributeNames: ['Female'],
        selectedDate: '',
        selectedDateData: [],
        all: [],
        avail: [
          {
            name: 'Female',
            fieldName: 'Female',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '# Cases',
            selected: true,
            color: 'var(--yellow)',
            attrData: [],
          },
          {
            name: 'Male',
            fieldName: 'Male',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '# Cases',
            selected: false,
            color: 'var(--green)',
            attrData: [],
          },
          {
            name: 'Unknown',
            fieldName: 'Unknown',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '# Cases',
            selected: false,
            color: 'var(--blue)',
            attrData: [],
          },
          {
            name: 'Analysis based on #cases',
            fieldName: 'CovidCasesConfirmed',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '# Cases',
            selected: false,
            color: 'var(--white)',
            attrData: [],
          },
        ],
      },
      {
        name: 'ageProfiles',
        id: 4,
        sectionName: 'Age Profiles',
        description: '',
        xAxisLabel: '#Cases in Age Group',
        xAxisAttribute: 'StatisticsProfileDate',
        selectedAttributeNames: ['Aged65up'],
        selectedDate: '',
        selectedDateData: [],
        all: [],
        avail: [
          {
            name: 'Aged 65 and up',
            fieldName: 'Aged65up',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases in Age Group',
            selected: true,
            color: 'var(--covidPink)',
            attrData: [],
          },
          {
            name: 'Aged 55 to 64',
            fieldName: 'Aged55to64',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases in Age Group',
            selected: false,
            color: 'var(--purple)',
            attrData: [],
          },
          {
            name: 'Aged 45 to 54',
            fieldName: 'Aged45to54',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases in Age Group',
            selected: false,
            color: 'var(--blue)',
            attrData: [],
          },
          {
            name: 'Aged 35 to 44',
            fieldName: 'Aged35to44',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases in Age Group',
            color: 'var(--covidPurple)',
            attrData: [],
            selected: false,
          },
          {
            name: 'Aged 25 to 34',
            fieldName: 'Aged25to34',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases in Age Group',
            selected: false,
            color: 'var(--covidGreen)',
            attrData: [],
          },
          {
            name: 'Aged 15 to 24',
            fieldName: 'Aged15to24',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases in Age Group',
            selected: false,
            color: 'var(--yellow)',
            attrData: [],
          },
          {
            name: 'Aged 5 to 14',
            fieldName: 'Aged5to14',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases in Age Group',
            selected: false,
            color: 'var(--green)',
            attrData: [],
          },
          {
            name: 'Aged 1 to 4',
            fieldName: 'Aged1to4',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases in Age Group',
            selected: false,
            color: 'var(--orange)',
            attrData: [],
          },
          {
            name: 'Aged 1',
            fieldName: 'Aged1',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases in Age Group',
            selected: false,
            color: 'var(--covidOrange)',
            attrData: [],
          },
          {
            name: 'Analysis based on #cases',
            fieldName: 'CovidCasesConfirmed',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases in Age Group',
            selected: false,
            color: 'var(--white)',
            attrData: [],
          },
        ],
      },
      {
        name: 'hospitalisedAgeProfiles',
        id: 5,
        sectionName: 'Age Profiles - Hospitalised',
        description: '',
        xAxisLabel: '#Hospitalised in Age Group',
        xAxisAttribute: 'StatisticsProfileDate',
        selectedAttributeNames: ['HospitalisedAged65up'],
        selectedDate: '',
        selectedDateData: [],
        all: [],
        avail: [
          {
            name: 'Hospitalised Aged 65 and up',
            fieldName: 'HospitalisedAged65up',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Hospitalised in Age Group',
            selected: true,
            color: 'var(--covidPink)',
            attrData: [],
          },
          {
            name: 'Hospitalised Aged 55 to 64',
            fieldName: 'HospitalisedAged55to64',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Hospitalised in Age Group',
            selected: false,
            color: 'var(--purple)',
            attrData: [],
          },
          {
            name: 'Hospitalised Aged 45 to 54',
            fieldName: 'HospitalisedAged45to54',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Hospitalised in Age Group',
            selected: false,
            color: 'var(--covidBlue)',
            attrData: [],
          },
          {
            name: 'Hospitalised Aged 35 to 44',
            fieldName: 'HospitalisedAged35to44',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Hospitalised in Age Group',
            color: 'var(--covidPurple)',
            attrData: [],
            selected: false,
          },
          {
            name: 'Hospitalised Aged 25 to 34',
            fieldName: 'HospitalisedAged25to34',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Hospitalised in Age Group',
            selected: false,
            color: 'var(--covidGreen)',
            attrData: [],
          },
          {
            name: 'Hospitalised Aged 15 to 24',
            fieldName: 'HospitalisedAged15to24',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Hospitalised in Age Group',
            selected: false,
            color: 'var(--yellow)',
            attrData: [],
          },
          {
            name: 'Hospitalised Aged 5 to 14',
            fieldName: 'HospitalisedAged5to14',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Hospitalised in Age Group',
            selected: false,
            color: 'var(--green)',
            attrData: [],
          },
          {
            name: 'Hospitalised Aged 5',
            fieldName: 'HospitalisedAged5',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Hospitalised in Age Group',
            selected: false,
            color: 'var(--orange)',
            attrData: [],
          },
          {
            name: 'Total Hospitalised',
            fieldName: 'HospitalisedCovidCases',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Hospitalised in Age Group',
            selected: false,
            color: 'var(--covidOrange)',
            attrData: [],
          },
          {
            name: 'Total Requiring ICU',
            fieldName: 'RequiringICUCovidCases',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Hospitalised in Age Group',
            selected: false,
            color: 'var(--yellow)',
            attrData: [],
          },
          {
            name: 'Analysis based on #cases',
            fieldName: 'CovidCasesConfirmed',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Hospitalised in Age Group',
            selected: false,
            color: 'var(--white)',
            attrData: [],
          },
        ],
      },
      {
        name: 'hospitalisedAndCasesAgeProfiles',
        id: 6,
        sectionName: 'Age Profiles - Hospitalised & Cases',
        description: '',
        xAxisLabel: '#Cases vs #Hospitalised in Age Group',
        xAxisAttribute: 'StatisticsProfileDate',
        selectedAttributeNames: ['HospitalisedAged65up'],
        selectedDate: '',
        selectedDateData: [],
        all: [],
        avail: [
          {
            name: 'Aged 65 and up (Hospitalised)',
            fieldName: 'HospitalisedAged65up',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: true,
            color: 'var(--covidPink)',
            attrData: [],
          },
          {
            name: 'Aged 65 and up (Cases)',
            fieldName: 'Aged65up',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            useDifferentShape: true,
            color: 'var(--covidPink)',
            attrData: [],
          },
          {
            name: 'Aged 55 to 64 (Hospitalised)',
            fieldName: 'HospitalisedAged55to64',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            color: 'var(--purple)',
            attrData: [],
          },
          {
            name: 'Aged 55 to 64 (Cases)',
            fieldName: 'Aged55to64',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            useDifferentShape: true,
            color: 'var(--purple)',
            attrData: [],
          },
          {
            name: 'Aged 45 to 54 (Hospitalised)',
            fieldName: 'HospitalisedAged45to54',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            color: 'var(--blue)',
            attrData: [],
          },
          {
            name: 'Aged 45 to 54 (Cases)',
            fieldName: 'Aged45to54',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            useDifferentShape: true,
            color: 'var(--blue)',
            attrData: [],
          },
          {
            name: 'Aged 35 to 44 (Hospitalised) ',
            fieldName: 'HospitalisedAged35to44',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            color: 'var(--covidPurple)',
            attrData: [],
            selected: false,
          },
          {
            name: 'Aged 35 to 44 (Cases)',
            fieldName: 'Aged35to44',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            color: 'var(--covidPurple)',
            attrData: [],
            selected: false,
            useDifferentShape: true,
          },
          {
            name: 'Aged 25 to 34 (Hospitalised)',
            fieldName: 'HospitalisedAged25to34',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            color: 'var(--covidGreen)',
            attrData: [],
          },
          {
            name: 'Aged 25 to 34 (Cases)',
            fieldName: 'Aged25to34',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            useDifferentShape: true,
            color: 'var(--covidGreen)',
            attrData: [],
          },
          {
            name: 'Aged 15 to 24 (Hospitalised)',
            fieldName: 'HospitalisedAged15to24',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            color: 'var(--yellow)',
            attrData: [],
          },
          {
            name: 'Aged 15 to 24 (Cases)',
            fieldName: 'Aged15to24',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            useDifferentShape: true,
            color: 'var(--yellow)',
            attrData: [],
          },
          {
            name: 'Aged 5 to 14 (Hospitalised)',
            fieldName: 'HospitalisedAged5to14',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            color: 'var(--green)',
            attrData: [],
          },
          {
            name: 'Aged 5 (Hospitalised)',
            fieldName: 'HospitalisedAged5',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            color: 'var(--orange)',
            attrData: [],
          },
          {
            name: 'Aged 1 to 4 (Cases)',
            fieldName: 'Aged1to4',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            color: 'var(--orange)',
            attrData: [],
          },
          {
            name: 'Analysis based on #cases',
            fieldName: 'CovidCasesConfirmed',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '#Cases vs #Hospitalised in Age Group',
            selected: false,
            color: 'var(--white)',
            attrData: [],
          },
        ],
      },
      {
        name: 'clusters',
        id: 7,
        sectionName: 'Clusters',
        description: '',
        xAxisLabel: '# Clusters Notified',
        xAxisAttribute: 'StatisticsProfileDate',
        selectedAttributeNames: ['ClustersNotified'],
        selectedDate: '',
        selectedDateData: [],
        all: [],
        avail: [
          {
            name: 'Clusters',
            fieldName: 'ClustersNotified',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '# Clusters Notified',
            selected: true,
            color: 'var(--yellow)',
            attrData: [],
          },
        ],
      },
      {
        name: 'medianAge',
        id: 8,
        sectionName: 'Median Age',
        description: '',
        xAxisLabel: '# Median age of Cases',
        xAxisAttribute: 'StatisticsProfileDate',
        selectedAttributeNames: ['Median_Age'],
        selectedDate: '',
        selectedDateData: [],
        all: [],
        avail: [
          {
            name: 'Median Age',
            fieldName: 'Median_Age',
            xAxisAttribute: 'StatisticsProfileDate',
            xAxisDescription: '# Median age of Cases',
            selected: true,
            color: 'var(--yellow)',
            attrData: [],
          },
         
        ],
      },
      ],
    }
  });
};

export default configureStore;
