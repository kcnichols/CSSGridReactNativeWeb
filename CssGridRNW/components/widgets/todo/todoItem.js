import React, { Component } from 'react';
import { fromJS } from "immutable";
import PropTypes from 'prop-types';
import {
  View, StyleSheet
} from 'react-native';
import { colorGrid } from 's2s-themes';

const styles = StyleSheet.create({
  taskItemContainerStyle : {
    alignItems : 'center',
    backgroundColor : colorGrid.gray0,
    borderColor : colorGrid.gray3,
    borderRadius : '8px',
    borderWidth : '1px',
    display : 'flex',
    flex : 1,
    flexDirection : 'row',
    margin : '6px',
    padding : '8px'
  }
});

class TodoItem extends Component {
  constructor(props){
      super(props);

      this.state = {};
      this.displayName = 'TodoItem';

      this.changeStatus = this.changeStatus.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // No state so not checking it
    return !fromJS(nextProps).equals(fromJS(this.props));
  }

  getDefaultStyle(styleName, props, state) {
    return defaultComponentStyle(styleName, props, state);
  }

  changeStatus(){
    this.props.cbChangeStatus(this.props.uuid, this.props.status === 'active' ? 'completed' : 'active');
  }

  render(){

    return (
      <View style = {styles.taskItemContainerStyle} >
        <checkbox
            onChange = {this.changeStatus}
            //isChecked = {this.props.status === 'completed'}
            label = {this.props.title}
        />
      </View>
    );
  }
}


export default TodoItem;
