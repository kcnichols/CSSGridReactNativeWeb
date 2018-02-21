import React, { Component } from 'react';
import { fromJS } from "immutable";
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { colorGrid } from 's2s-themes';
import moment from 'moment';


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

  // static propTypes = {
  //   metadata: PropTypes.object,
  // };
  //
  // static defaultProps = {
  //   statProperties : ["total", "confirmed", "reschedule", "cancelled"],
  //   metadata : {
  //     "displayMode" : "text",
  //   }
  // };
  //
  // static displayName = 'List Statistics';

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

    // NOTE : StatObj.color is not being defined in metadata so

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

Statistics.propTypes = {
    metadata: PropTypes.object,
};
Statistics.defaultProps = {
  statProperties : ["total", "confirmed", "reschedule", "cancelled"],
  metadata : {
    "displayMode" : "text",
    apptDate : Date.now(),

  }
};

export default Statistics;
