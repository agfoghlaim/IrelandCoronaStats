import * as d3 from 'd3';

export const countiesStoreUtil = {
  colorScale: d3
  .scaleSequential()
  .domain([0, 100])
  .interpolator(d3.interpolateRainbow),

  sortIntoArraysByCounty: (data, field = 'CountyName') => {
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
  },

  removeFromNestedAttributes: (data) => {
    return data.map((d) => {
      let obj = {};
      for (const key in d.attributes) {
        obj[key] = d.attributes[key];
        
      }
      return obj;
    });
  },
  getLatestOrSelectedDateDataForCounty: (county, selectedDate) => {
    let dateToUse = selectedDate;
    if(!dateToUse){
      const dates = county.stats.map((s) => s.TimeStampDate);
      dateToUse = Math.max(...dates.map((d) => d));
    }
    
    const newestData = county.stats.filter((s) => s.TimeStampDate === dateToUse);
    return newestData[0];
  },



  turnArraysIntoNiceObjects: (data) => {

    const createManagableObjectAndSetFirstCountyToSelected = (n, i) => {
      const obj = {};
      obj.name = n[0].CountyName;
      // should add reg
      obj.selected = false;
      obj.stats = [...n];
      obj['color'] = countiesStoreUtil.colorScale(n[0].PopulationCensus16);
      if (i === 0) {
        obj['selected'] = true;
      }
      return obj;
    };

    return data.map((n, i) =>
      createManagableObjectAndSetFirstCountyToSelected(n, i)
    );
  },
  selectAttributeWithThisFieldName: (attributes, fieldName)=> {
    return attributes.map((a) => {
      if (a.fieldName === fieldName) {
        a.selected = true;
      } else {
        a.selected = false;
      }
      return a;
    });
  }
  
 
}

export const sharedUtil = {

  getLatestDate: (county) => {
    const dates = county.stats.map((s) => s.TimeStampDate);
    const newestDate = Math.max(...dates.map((d) => d));
    return newestDate;
  }

}