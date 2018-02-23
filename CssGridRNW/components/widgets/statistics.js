import React, { Component } from 'react';
import { fromJS } from "immutable";
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native-web';
import { colorGrid } from 's2s-themes';
import moment from 'moment';
import jsonata from 'jsonata';
// Fake JSON data for the sole purpose of using JSONata
// TODO move to separate file, feed through prop

const data = {
  "FirstName": "Fred",
  "Surname": "Smith",
  "Age": 28,
  "Address": {
    "Street": "Hursley Park",
    "City": "Winchester",
    "Postcode": "SO21 2JN"
  },
  "Phone": [
    {
      "type": "home",
      "number": "0203 544 1234"
    },
    {
      "type": "office",
      "number": "01962 001234"
    },
    {
      "type": "office",
      "number": "01962 001235"
    },
    {
      "type": "mobile",
      "number": "077 7700 1234"
    }
  ],
  "Email": [
    {
      "type": "office",
      "address": [
        "fred.smith@my-work.com",
        "fsmith@my-work.com"
      ]
    },
    {
      "type": "home",
      "address": [
        "freddy@my-social.com",
        "frederic.smith@very-serious.com"
      ]
    }
  ],
  "Other": {
    "Over 18 ?": true,
    "Misc": null,
    "Alternative.Address": {
      "Street": "Brick Lane",
      "City": "London",
      "Postcode": "E1 6RF"
    }
  }
};

const tempColors = [
  colorGrid.gray9,
  "#40c057",
  "#868e96",
  "#ff6b6b"
]

const styles = StyleSheet.create({
  containerStyle : {
    backgroundColor : colorGrid.gray0,
    borderColor : colorGrid.gray4,
    borderRadius : '8px',
    borderWidth : '1px',
    flex : 1,
    padding : '16px', // changed from 27px
    paddingBottom : '0px',
  },
  headerStyle: {
    display: 'flex',
    flexDirection : 'row'
  },
  titleStyle : {
    color : colorGrid.gray9,
    fontSize : '16px',
    paddingLeft: '16px'
  },
  statsAreaStyle : {
    display : 'flex',
    flexDirection : 'row'
  },
  statObjectStyle : {
    alignItems : 'flex-start',
    borderRightColor : colorGrid.gray3,
    borderRightWidth : '1px',
    display : 'inline-flex',
    flexDirection : 'column',
    justifyContent : 'flex-start',
    marginTop : '16px', // changed from 27
    padding : '16px', // changed from 27
    paddingTop : '0px'
  },
  statNameStyle : {
    color : '#868e96',
    fontSize : '14px',
    paddingBottom : '12px',
    textTransform : 'uppercase',
  },
  statValueStyle : {
    color : colorGrid.gray9,
    display : 'inline-flex',
    fontSize : '18px'
  }
});

class Statistics extends Component {
  constructor(props){
    super(props);

    this.windowWidth = Dimensions.get("window").width;
    this.state = {
      windowWidth : this.windowWidth
    };

    this.displayName = 'List Statistics';

    this.renderTextStats = this.renderTextStats.bind(this);

  }

  // TODO why TF is are my static stuff not working?
  static propTypes = {
    metadata: PropTypes.object,
  };

  static defaultProps = {
    statProperties : ["total", "confirmed", "reschedule", "cancelled"],
    metadata : {
      "displayMode" : "text",
    }
  };

  static displayName = 'List Statistics';

  shouldComponentUpdate(nextProps,nextState) {
    // No state so not checking it
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName, props, state)  {
    return defaultComponentStyle(styleName, props, state);
  }

  renderStatArea(){

    let graphType;

      switch(this.props.metadata.displayMode){
        case "text" :
          graphType = this.renderTextStats();
          break;
        case "pie" :
          console.log('create a pie graph');
          break;
        case "bar" :
          console.log('create a bar graph');
          break;
        default :
          graphType = this.renderTextStats(this.props.metadata.stats);
          break;

      }

    return graphType;
  }

  renderTextStats(){
    const statItems = this.props.statProperties && this.props.statProperties.map((property, index)=>{

      // NOTE : This works but it is hardcoded
      // const all = "$count(Phone)";
      // const home = `$count(Phone[type = "home"])`;
      // const mobile = `$count(Phone[type = "mobile"])`;
      // const office = `$count(Phone[type = "office"])`;

      // const valAll = jsonata(all).evaluate(data); // returns 4
      // const valHome = jsonata(home).evaluate(data); // returns 4
      // const valMobile = jsonata(mobile).evaluate(data); // returns 4
      // const valOffice = jsonata(office).evaluate(data); // returns 4
      //console.log('vals', valAll, valHome, valMobile, valOffice)

      // TODO How can I get Jsonata expression to work with the {property} argument correctly?
      //const fancyExp = `$count(Phone[type = ` + property + ` ])`;
      //console.log('fancy exp',jsonata(fancyExp).evaluate(data))

      const x = {
        name : property,
        color : tempColors[index] !== undefined ? tempColors[index] : tempColors[0]
      }

      if(this.props.metadata && this.props.metadata.apptList && this.props.metadata.apptList.items) {
        if(property === "total") {
          x.value = this.props.metadata.apptList.items.length
        } else {
          x.value = this.props.metadata && this.props.metadata.apptList && this.props.metadata.apptList.items && this.props.metadata.apptList.items.filter((statItem, index)=>{
           //console.log('statItem response',  statItem.response)
           return statItem.response === property;
         }).length
        }
      }
      return x;
    });


    return statItems.map((statObj, index)=>{
      return (
        <View style = {[styles.statObjectStyle, {
          borderRightColor : (index + 1) === statItems.length ? 'transparent' : '#dee2e6' }]} key = {index} >
          <Text style = {styles.statNameStyle} >{statObj.name}</Text>
          <Text style = {[styles.statValueStyle, { color : statObj.color }]}>{statObj.value}</Text>
        </View>
      )
    });
  }

  render(){
    //console.log('first stuff', data.Email, jsonata('$count(Email)').evaluate(data)    ); // 4

    return (
      <View className = "ListStatisticsContainer" style = {styles.containerStyle} >
        <Text className = "title" style = {styles.titleStyle} >Overview for {moment(this.props.metadata.apptDate, "x").format("MMMM D, YYYY")} </Text>
        <View className = "statsArea" style = {styles.statsAreaStyle}>
          {this.renderStatArea()}
        </View>
      </View>

    );
  }
}

export default Statistics;
