import { initStore } from '../../Store/store';
import { dailyGraphsStore } from './dailyGraphsConfig.js';
import { profileStatsStore } from './profileStatsConfig.js';

const MARCH_17_2020 = 1584316800000;

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
  
  // NOTE graph.all is the same for every graph. Should be pulled up or outside somewhere. I've added 'allSliceData' to the two store slices for it but i just can't be bothered. It was used all over the place in components but I've split the data instead into it's own store.avail[].attrData[] array. It's now used only in this file (I'm nearly sure) - I still need it ONCE to actually get the data split properly in splitIntoAttrData(), but I don't need a copy of it for every graph.
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
    dailyGraphsStore: dailyGraphsStore,
    //===================================
    profileStatsStore: profileStatsStore
  });
};

export default configureStore;
