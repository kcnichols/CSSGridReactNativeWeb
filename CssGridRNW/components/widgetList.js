// shows a list of all available widgets.
// cbClick sends name of widget
import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import widgets from './widgets/index';
import PropTypes from 'prop-types';
import Button from './button';
import { colorGrid } from 's2s-themes';
import * as SVG from 's2s-native-svg-icons';


const widgetIcons = {
  calendar : SVG['CalendarIconSVG'],
  teamlist : SVG['GroupIconSVG'],
  todo : SVG['CheckboxIconSVG'],
  statistics : SVG['EditIconSVG']
}

const styles = StyleSheet.create({
  widgetListContainer : {
    backgroundColor : colorGrid.gray0,
    borderColor : '#dee2e6',
    borderWidth : '1px',
    borderRadius : '8px',
  },
  header : {
    borderBottomWidth : '1px',
    borderBottomColor : '#dee2e6',
    borderBottomStyle : 'solid',
    color : '#212529',
    fontFamily : 'sans-serif',
    fontWeight : '600',
    padding : '16px',
    marginBottom : '16px'
  },
  listArea : {
    display : 'flex',
    flexDirection : 'row',
    flexWrap : 'wrap',
    padding : '16px'
  },
  buttonWrapper : {
    alignItems : 'center',
    display : 'flex',
    flex : 1,
    flexBasis : '50%',
    justifyContent : 'center',
    paddingBottom : '16px'
  },
  buttonLabel : {
    color : colorGrid.gray9
  }
});

export default class WidgetList extends Component {
  constructor(props){
    super(props);
    this.displayName = 'Input';

    this.state = {};

  }

  static propTypes = {
    cbWidgetClick : PropTypes.func,
  };

  static defaultProps = {
    cbWidgetClick: ()=>{console.log('cbWidgetClick is not defined');},
  };

  render () {

    const widgetArray = Object.keys(widgets);

    return(
      <View className = "WidgetListContainer" style = {styles.widgetListContainer} >
      <Text style = {styles.header} > Widget List </Text>
      <View style = {styles.listArea} >
        {widgetArray.map((widget, index)=>{
          const WidgetSVG = widgetIcons[widget.toLowerCase()]
          return (
            <View
                className = "widgetWrapper"
                key = {index}
                onClick={()=>{ this.props.cbWidgetClick(widget); }}
                style = {styles.buttonWrapper}
            >
                <Button key = {index} >
                  <Text style = {styles.buttonLabel}>
                    {
                      <WidgetSVG fill = {colorGrid.gray8} />
                    }
                  </Text>
                </Button>
            </View>
          )
        })}
      </View>
      </View>
    )
  }
}
