import React, { Component} from 'react';
import { fromJS } from "immutable";
import PropTypes from 'prop-types';
import {
  View,
  Text, StyleSheet
} from 'react-native';
import { colorGrid } from 's2s-themes';
import moment from 'moment';
import objectMerge from 'object-merge';

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor : colorGrid.gray0,
    borderColor : colorGrid.gray3,
    borderRadius : '8px',
    borderWidth: '1px',
    display: 'flex',
    flex : 1
  },
  headerContainerStyle : {
    alignItems : 'flex-start',
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    padding : '12px'
  },
  headerTextStyle : {
    alignItems : 'center',
    color : colorGrid.gray9,
    display : 'flex',
    flex : 7,
    fontSize : '16px',
    fontWeight : '600',
    justifyContent : 'center'
  },
  dayOfWeekStyle : {
    alignItems : 'center',
    color : '#868e96',
    display : 'flex',
    justifyContent: 'center',
    paddingBottom: '12px',
    paddingTop : '12px',
    //width : '14%'
  },
  daysOfWeekContainerStyle : {
    borderBottomColor : '#dee2e6',
    borderBottomWidth : '1px',
    display : 'grid',
    //flexDirection : 'row',
    gridTemplateColumns : '14% 14% 14% 14% 14% 14% 14%',
    gridTemplateRows : '100%'
    // justifyContent : 'space-around',
    //padding : '12px'
  },
  daysOfMonthContainerStyle : {
    display : 'grid',
    flex:1,
    gridTemplateColumns : '14% 14% 14% 14% 14% 14% 14%'
    // flexDirection : 'row',
    // flexWrap : 'wrap',
    // justifyContent: 'flex-start'
  },
  dayOfMonthStyle : {
    alignItems : 'center',
    backgroundColor : '#faf8f9',
    borderRadius : '4px',
    cursor : "pointer",
    display : 'flex',
    flexBasis : '13%',
    justifyContent : 'center',
    // paddingBottom: '12px',
    // paddingTop : '12px',
    marginLeft : '2px', // NOTE: Initially tried 8px / 4px margin but it really messes with the flexbox alignment between days of the week / days of the month
    marginRight : '2px',
  //  width : '13%'
  }

});

const daysOfWeek = [
  'Sun',
  'Mon',
  'Tues',
  'Wed',
  'Thurs',
  'Fri',
  'Sat'
]

class Calendar extends Component {
  constructor(props){
      super(props);

      this.state = {
        selectedDate : this.props.metadata && this.props.metadata.selectedDate !== undefined ? this.props.metadata.selectedDate : Date.now(),
        todaysDate : Date.now(),
        displayDate : Date.now()
      };
      this.displayName = 'Calendar';

      this.getDays = this.getDays.bind(this);
      this.prev = this.prev.bind(this);
      this.next = this.next.bind(this);
      this.renderHeader = this.renderHeader.bind(this);


      this.moment = moment();

  }

  static propTypes = {
    cbDayClick : PropTypes.func,
    metadata: PropTypes.object,
  };

  static defaultProps = {
    //cbDayClick : ()=>{ console.log('Default function for cbDayClick fired')},
    "metadata":{
      "title": "Not Specified"
    }
  };

  static svg_icon = "CalendarIconSVG";

  static filename = 's2s-native-calendar';
  static displayName = 'Calendar';

  shouldComponentUpdate(nextProps, nextState) {
    // No state so not checking it
    return !fromJS(nextProps).equals(fromJS(this.props))  || !fromJS(nextState).equals(fromJS(this.state));
  }

  componentWillReceiveProps(nextProps){
    if(this.props.hasOwnProperty("metadata") && this.props.metadata.hasOwnProperty("selectedDate")) {
      this.setState((prevState)=>{
        return objectMerge(prevState, { selectedDate : this.props.metadata.selectedDate });
      })
    }
  }

  getDefaultStyle(styleName, props, state)  {
    return defaultComponentStyle(styleName, props, state);
  }

  next(e){
    this.setState((prevState)=>{
      const nextDate = moment(this.state.displayDate).clone().add(1, 'months').valueOf();
      return objectMerge(prevState, { "displayDate" : nextDate  });
    })
  }

  prev(e){
    this.setState((prevState)=>{
      const prevDate = moment(this.state.displayDate).clone().subtract(1, 'months').valueOf();
      return objectMerge(prevState, { "displayDate" : prevDate });
    })
  }

  renderHeader(){
    return (
      <View style={styles.headerContainerStyle} >

          <Text   style={styles.headerTextStyle} >
              {moment(this.state.displayDate).format('MMMM')} {moment(this.state.displayDate).format('YYYY')}
          </Text>
          <View style={{  display: 'flex', flex: 3, flexDirection : 'row', justifyContent: 'flex-end' }}>
              <button
                  label = "<"
                  onClick = {this.prev}
              />
              <button
                  label = ">"
                  onClick = {this.next}
              />
          </View>
      </View>
    )
  }

  renderDaysOfWeek(){
    return daysOfWeek.map((day, index)=>{
      return (
        <Text
            key = {index}
            style = {styles.dayOfWeekStyle}
        >
            {day}
        </Text>
      )
    })

  }

  getDays() {
    const days = []; // array of numbers between 1 - daysInMonth
    const daysInMonth = moment(this.state.displayDate, "x").daysInMonth(); // number
    // So I may know what day the first falls under.
    const startDate = moment(this.state.displayDate, "x").startOf('month').day(); // returns index of the starting day of the week (for the month)
    const endDate = moment(this.state.displayDate, "x").endOf('month').day(); // returns index of the ending day of the week (for the month)
    const prevMonthsLength = moment(this.state.displayDate, "x").clone().subtract(1, 'months').daysInMonth();

    // First pushing days from previous month. Will also help '1' fall under the correct day of the week
    for(var prevMonthDay = 1; prevMonthDay < startDate + 1; prevMonthDay++){
      // prevMonthsLength is the number of days in the previous month. ie: January has 31 days
      // startDate is index of the starting day of the week for the entire month. ie : Februrary 1st is a Thursday so it's day-of-the-week index is 4
      // prevMonthDay so displayText is increased. For example : instead of 28, 28, 28, 28 you will see 28,29,30,31

      days.push(
        {
          displayText : prevMonthsLength - startDate + prevMonthDay,
          prevMonth : true,
          value : moment(this.state.displayDate).subtract(1, 'months').date(prevMonthsLength - startDate + prevMonthDay).valueOf()
        }
      );
    }

    // Now, pushing actual days from current month
    for(var currMonthDay = 1; currMonthDay < (daysInMonth + 1); currMonthDay++){
      //days.push(currMonthDay);
      days.push(
        {
          displayText : currMonthDay,
          value : moment(this.state.displayDate).date(currMonthDay).valueOf()
        }
      );
    }

    // Pushing days for upcoming month
    for(var nextMonthDay = 1; nextMonthDay < (7 - endDate); nextMonthDay++){
      days.push(
        {
          displayText : nextMonthDay,
          nextMonth : true,
          value : moment(this.state.displayDate).add(1, 'months').date(nextMonthDay).valueOf()
        }
      );
    }

    return days;
  }

  renderDaysOfMonth(){

    // NOTE: Not in constructor because constructor is only called once and setting a variable to this.state.selectdDate in the constructor will always make the value :  Date.now() (the initial state value) and not show the updated selectedDate

    return this.getDays().map((day, index)=>{

      // normal days backgroundColor white
      // normal days fontColor black
      let backgroundColor = colorGrid.gray0;
      let fontColor = colorGrid.gray9;


      // previous/next month days backgroundColor light gray
      // previous/next month days font color dark gray
      if((day.prevMonth && day.prevMonth) === true || (day.nextMonth && day.nextMonth) === true){
          backgroundColor = colorGrid.gray1;
          fontColor = '#868e96';
      }
      // todays date backgroundColor black
      // todays date font color is white
      // NOTE: Checking month/day/year matches as well so that calendar will only highlight the day that today. By NOT checking month/year as well, if today were the 13th, the 13th of every month would be highlighted black
      if(moment(day.value).format('MMMMDDYYYY') === moment(this.state.todaysDate).format('MMMMDDYYYY') ){
          backgroundColor = colorGrid.gray9;
          fontColor = colorGrid.gray0
      }

      // OVERRIDE today bg/font color with select bg/font color
      // selected date backgroundColor is blue
      // selected date fontColor is white
      // NOTE: Checking month matches as well so that calendar will only highlight blue the day that is clicked. For Example: February 2018 displays February 1 and March 1. Clicking on February 1 will also highlight March 1 If we do not also check against the month/year.
      if(moment(day.value).format('MMMMDDYYYY') === moment(this.state.selectedDate, "x").format('MMMMDDYYYY') ) {
        backgroundColor = colorGrid.brand5;
        fontColor = colorGrid.gray0;
      }

      return (
        <Text
            key = {index}
            style = {[styles.dayOfMonthStyle, {
              color: fontColor,
              backgroundColor: backgroundColor
              }
            ]}
            onClick={()=>{

              this.setState((prevState)=>{

                // if(this.props.cbDayClick !== undefined) {
                //   this.props.cbDayClick(newDate);
                // }

              return objectMerge(prevState, { 'selectedDate' : day.value, /*'displayDate' : newDate */});
              })
            }}
        >
            {day.displayText}
        </Text>
      )
    })
  }

  render(){

    //console.log('calendar props', this.props)

    return (
      <View style={[styles.viewStyle/*,this.props.metadata.styles*/]} /*onClick = {(e)=>{ e.stopPropagation(); }}*/>
        {this.renderHeader()}
        <View className="daysOfWeekContainer" style={styles.daysOfWeekContainerStyle} >
            {this.renderDaysOfWeek()}
        </View>
        <View className="daysOfMonthContainer" style={styles.daysOfMonthContainerStyle} >
            {this.renderDaysOfMonth()}
        </View>
      </View>
    );
  }
}


export default Calendar;
