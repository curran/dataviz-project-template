

export default function (data, props) {
  const {
    dateRange,
    year2011Filter,
    year2012Filter,
    dayTypeWorkingFilter,
    dayTypeNonWorkingFilter,
    weatherSit1Filter,
    weatherSit2Filter,
    weatherSit3Filter,
    unfilteredOpacity
  } = props;

  console.log("filterData executing...")


    //apply filters to data set based on state of toggle buttons on screen
  let filteredData = [];
  data.forEach(d =>{
      //if(d.dteday<dateRange[0] || d.dteday>dateRange[1]) {d.filterOpacity=0.0}
      if(d.yr==0 && year2011Filter==false) {return}
      else if(d.yr==1 && year2012Filter==false) {return}
      else if(d.workingday==1 && dayTypeWorkingFilter==false) {return}
      else if(d.workingday==0 && dayTypeNonWorkingFilter==false) {return}
      else if(d.weathersit==1 && weatherSit1Filter==false) {return}
      else if(d.weathersit==2 && weatherSit2Filter==false) {return}
      else if(d.weathersit==3 && weatherSit3Filter==false) {return}
      else filteredData.push(d);
    });
  //console.log(data);
return filteredData};
