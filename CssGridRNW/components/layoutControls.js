// controls to create a layout with available widget
import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colorGrid } from 's2s-themes';

const styles = StyleSheet.create({
  layoutControlsContainer : {
    backgroundColor : colorGrid.gray0,
    borderWidth : '1px',
    borderColor : '#dee2e6',
    borderRadius : '8px',
    marginBottom : '8px'
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
  controlsContainer : {
    padding : '16px',
  },
  inputLabelsContainer : {
    alignItems : 'center',
    display : 'flex',
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'center',
    paddingBottom : '8px'
  },
  label : {
    fontWeight : '600'
  },
  input : {

  }
});

export default class LayoutControls extends Component {
  constructor(props){
    super(props);

    this.state = {

    };
  }

  static propTypes = {
    cbRowChange : PropTypes.func,
    cbColumnChange : PropTypes.func
  };

  static defaultProps = {
    cbRowChange: ()=>{console.log('cbRowChange is not defined');},
    cbColumnChange: ()=>{console.log('cbColumnChange is not defined');},
  };

  render () {
      return(
        <View className = "LayoutControlsContainer" style = {styles.layoutControlsContainer} >
          <Text style = {styles.header} > Layout Controls </Text>
          <View style = {styles.controlsContainer} >
            <View style = {styles.inputLabelsContainer} >
              <Text style = {styles.label}>Rows :</Text>
              <input onChange={(e)=>{ this.props.cbRowChange(e.target.value); }} />
            </View>
            <View style = {styles.inputLabelsContainer} >
              <Text style = {styles.label}> Columns : </Text>
              <input onChange={(e)=>{ this.props.cbColumnChange(e.target.value); }} />
            </View>
          </View>
        </View>)
  }
}
