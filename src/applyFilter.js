

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

  console.log("applyFilter")
  console.log(dateRange,
    year2011Filter,year2012Filter,
    dayTypeWorkingFilter,dayTypeNonWorkingFilter,
    weatherSit1Filter,weatherSit2Filter,weatherSit3Filter, unfilteredOpacity)

  //reset filters
  data.forEach(d=>d.filterOpacity=unfilteredOpacity);

  //apply filters to data set based on state of toggle buttons on screen
  data.forEach(d =>{
      //if(d.dteday<dateRange[0] || d.dteday>dateRange[1]) {d.filterOpacity=0.0}
      if(d.yr==0 && year2011Filter==false) {d.filterOpacity=0.0}
      else if(d.yr==1 && year2012Filter==false) {d.filterOpacity=0.0}
      else if(d.workingday==1 && dayTypeWorkingFilter==false) {d.filterOpacity=0.0}
      else if(d.workingday==0 && dayTypeNonWorkingFilter==false) {d.filterOpacity=0.0}
      else if(d.weathersit==1 && weatherSit1Filter==false) {d.filterOpacity=0.0}
      else if(d.weathersit==2 && weatherSit2Filter==false) {d.filterOpacity=0.0}
      else if(d.weathersit==3 && weatherSit3Filter==false) {d.filterOpacity=0.0}
      });
  //console.log(data);
};
