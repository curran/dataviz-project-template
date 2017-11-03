

export default function (div, props) {
  const {
    dataDay,
    dataHour,
    filterStatus,
    startDate,
    endDate
  } = props;

  //updateFilterStatus is called whenever
  //one of the html checkbox/toggle buttons
  //changes state.
  //it reads the state of all buttons,
  //and sets the filterStatus by pushing
  //the value corresponding to the toggle buttons
  //to an array fo
  const updateFilterStatus=()=>{
    console.log("updateFilterStatus")
    echoFilterStatus
    //initialize filterStatus state
  let filterStatus = {
      year:[],
      dayType:[],
      weatherSit:[]
    };
    console.log(filterStatus)
    //read button states (variables initialized in local scope only)

    //set filterStatus for each button
    if (year0.value == "on") {filterStatus.year.push(0)};
    if (year1.value == "on") {filterStatus.year.push(1)};
    if (dayType0.value == "on") {filterStatus.dayType.push(0)};
    if (dayType1.value == "on") {filterStatus.dayType.push(1)};
    if (weatherSit1.value == "on") {filterStatus.dayType.push(1)};
    if (weatherSit2.value == "on") {filterStatus.dayType.push(2)};
    if (weatherSit3.value == "on") {filterStatus.dayType.push(3)};
    echoFilterStatus
    console.log("button status");
    console.log(year0,year1,dayType0,dayType1,weatherSit1,weatherSit2,weatherSit3);
    console.log(filterStatus);

    // filterData adds/sets the filter opacity
    // for each record in the dataDay and dataHour
    // data sets, based on the filterStatus
    // (from html buttons),
    // startDate and endDate (from line chart brush)
    // uses forEach array property to set
    // filter status to 1 if specified column contains
    // any of the values contained in the corresponding
    // filterObjects array
      const filterData = () => {
        const setFilterOpacity= d => {
          //initialize filters to zero
          let f1=0, f2=0, f3=0, f4 =0;
          if (d.dteday >= startDate && d.dteday <= endDate){filter1 = 1};
          if (filterStatus.year.include(d.year)){filter2=1};
          if (filterStatus.dayType.include(d.workingday)){filter3=1};
          if (filterStatus.weatherSit.include(d.weathersit)){filter4=1};
          d.filterOpacity = (f1 * f2 * f3 * f4);
        };

        dataHour.forEach(setFilterOpacity);
        dataDay.forEach(setFilterOpacity);
      };

    //apply filters to hourly and daily data

    filterData();
    console.log(dataHour[0],dataDay[0])
    //render visualization
  };
};
