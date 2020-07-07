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

  getLatestOrSelectedDateDataForCounty: (county, selectedDate) => {

    let dateToUse = selectedDate;
    if (!dateToUse) {
      // const dates = county.stats.map((s) => s.TimeStampDate);
      const dates = county.stats.map((s) => s.TimeStamp);
      dateToUse = Math.max(...dates.map((d) => d));
    }

    const newestData = county.stats.filter(
      // (s) => s.TimeStampDate === dateToUse
      (s) => s.TimeStamp=== dateToUse
    );

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
  selectAttributeWithThisFieldName: (attributes, fieldName) => {
    return attributes.map((a) => {
      if (a.fieldName === fieldName) {
        a.selected = true;
      } else {
        a.selected = false;
      }
      return a;
    });
  },
};

export const sharedUtil = {
  getLatestDate: (county) => {

    //const dates = county.stats.map((s) => s.TimeStampDate);
    const dates = county.stats.map((s) => s.TimeStamp); // renamed seventh july
    const newestDate = Math.max(...dates.map((d) => d));

    return newestDate;
    // const dates = removeFromNestedAttributes(county, 'stats')
  },

  getDataByFieldName: (data, fieldName, fieldValue) => {
    return data.filter((s) => s[fieldName] === fieldValue);
  },

  removeFromNestedAttributes: (data, attr = 'attributes') => {
    return data.map((d) => {
      let obj = {};
      for (const key in d[attr]) {
        obj[key] = d[attr][key];
      }
      return obj;
    });
  },
  maxDate: (specificDate, data, specificDateFieldName) => {
    let dateToUse = specificDate;
    if (!dateToUse) {
      const dates = data.map((s) => s[specificDateFieldName]);
      dateToUse = Math.max(...dates.map((d) => d));
    }
    return dateToUse;
  },
  getLatestDataOrDataOnSpecificDate: (
    data,
    specificDate,
    specificDateFieldName
  ) => {
    const dateToUse = sharedUtil.maxDate(
      specificDate,
      data,
      specificDateFieldName
    );
    const newestData = sharedUtil.getDataByFieldName(
      data,
      specificDateFieldName,
      dateToUse
    );
    return newestData[0];
  },
  prepArrayToShowInTextBox: graph => {
    
    return graph.selectedAttributeNames.map((name) => {
      const title = graph.avail.filter((a) => a.fieldName === name)[0].name;
      const color = graph.avail.filter((a) => a.fieldName === name)[0].color;

      const ans = {};

      ans[name] = graph.selectedDateData[name];
      ans.color = color;
      ans.title = title;
      ans.fieldName = name;
      ans.value = graph.selectedDateData[name];

      return ans;
    });
  }
};

export const contactUtil = {
  isProbablyEmail: (str) => {
    var re = /\S+@\S+\.\S+/;
    if (str.length < 50) {
      return re.test(str);
    }
    return false;
  },

  // function from netlify docs
  encode: (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&');
  },

  validate: (val, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = val.trim() !== '' && isValid;
    }
    if (rules.min) {
      isValid = val.length >= rules.min && isValid;
    }
    if (rules.max) {
      isValid = val.length <= rules.max && isValid;
    }
    if (rules.isProbablyEmail) {
      isValid = contactUtil.isProbablyEmail(val) && isValid;
    }
    return isValid;
  },
};
