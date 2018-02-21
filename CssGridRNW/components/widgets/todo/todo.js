import React, { Component } from 'react';
import { View, ScrollView,Text, StyleSheet, Picker } from 'react-native';
import { fromJS } from "immutable";
import { colorGrid } from 's2s-themes';
import TodoItem from './todoItem';
import PropTypes from 'prop-types';
import objectMerge from 'object-merge';

const styles = StyleSheet.create({
  tasksContainerStyle : {
    backgroundColor : colorGrid.gray2,
    borderColor : colorGrid.gray3,
    borderRadius : '8px',
    borderWidth: '1px',
    flex: 1
  },
  tasksHeaderStyle : {
    backgroundColor : colorGrid.gray0,
    borderTopLeftRadius : '8px',
    borderTopRightRadius : '8px',
    flexDirection : 'row',
    justifyContent : 'space-around',
    padding : '12px'
  },
  tasksHeaderTextStyle : {
    alignItems : 'center',
    backgroundColor : colorGrid.gray0,
    borderTopLeftRadius : '8px',
    borderTopRightRadius : '8px',
    borderWidth: '2px',
    color : colorGrid.gray9,
    display : 'flex',
    fontSize : '12px',
    fontWeight : '600',
    justifyContent : 'flex-start',
    padding : '12px'
  },
  filterContainerStyle : {
    alignItems : 'center',
    backgroundColor : colorGrid.gray0,
    flexDirection : 'row',
    flex : 5,
    justifyContent : 'flex-end'
  },
  filterTextStyle : {
    backgroundColor : colorGrid.gray0,
    color : colorGrid.gray6,
    fontWeight: '600'
  },
  scrollViewStyle : {
    backgroundColor : colorGrid.gray2,
    padding : '6px'
  },
  bottomContainerStyle : {
    alignItems : 'center',
    backgroundColor : colorGrid.gray3,
    borderBottomLeftRadius : '8px',
    borderBottomRightRadius : '8px',
    display : 'flex',
    flexDirection : 'row',
    paddingRight : '8px'// So that button isn't smashed against the right edge
  },
  inputContainerStyle : {
    backgroundColor : colorGrid.gray0,
    flex : 1,
    margin : '12px'
  }
});

class Todo extends Component {
  constructor(props){
      super(props);
      // console.log('TODOS  - metadata', props.metadata);
      this.state = {
        currentFilter : 'all',
        items: props.hasOwnProperty("metadata") && props.metadata.hasOwnProperty("items")  ? props.metadata.items: []
      };

      this.addTodoItem = this.addTodoItem.bind(this);
      this.filterList = this.filterList.bind(this);
      this.changeStatus = this.changeStatus.bind(this);
      this.save = this.save.bind(this);


  }

  // static propTypes = {
  //   metadata : PropTypes.object,
  //   cbUpdateMetadata: PropTypes.func
  // };
  //
  // static defaultProps = {
  //   metadata : { title : 'Tasks', items: [] }
  // };
  //
  // static svg_icon = "CheckboxIconSVG" // TODO update with appropriate svg once Brian has added them

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  filterList(filter){
    const filterTerm = filter.toLowerCase();

    // Setting state to display new filtered list
    this.setState((prevState)=>{
      return { ...prevState,  currentFilter : filterTerm };
    })
  }

  save(){
    //console.log('calling save on todo widget')
    if ( typeof(this.props.cbUpdateMetadata) === 'function'){
      this.props.cbUpdateMetadata(objectMerge({}, this.props.metadata, {items: objectMerge([], this.state.items)}));
    }
  }

  addTodoItem(item){

    if (!this.inputValue){
      return;
    }

    this.setState((prevState)=>{
      const newUUID =  Utilities.getInstance().generateUUID();

      const newTodoItem = {
        uuid : newUUID.toString(),
        status : 'active',
        title : this.inputValue
      }
      this.inputValue = undefined;

      const newState = objectMerge({}, prevState);

      newState.items = newState.items.concat(newTodoItem);
      setTimeout(this.save, 0);
      return newState;
    })
  }

  changeStatus(uuid, newStatus){

    this.setState((prevState)=>{
      const newState = objectMerge({}, prevState);
      //TODO KC ... ok but what would be better
      newState.items = newState.items.map((item,index)=>{
        if(item.uuid === uuid) {
          //console.log('xxxxxx')
          return {
            uuid : item.uuid,
            status : newStatus,
            title : item.title
          }
        } else {
          return item
        }
      });

      //console.log('x******', newItems)
      setTimeout(this.save, 0);
      return newState;
    })

  }

  renderTodoList(){
    let listItems = this.state.items;

    if(this.state.currentFilter !== 'all'){
      listItems = this.state.items.filter((item, index)=>{
        return item.status === this.state.currentFilter;
      })
    }

    return listItems.map((item, index)=>{
      return (
        <TodoItem
          cbChangeStatus = {this.changeStatus}
          key = {index + 1}
          order = {index + 1}
          uuid = {item.uuid}
          status = {item.status}
          title = {item.title}
        />
      )
    })
  }

  getDefaultStyle(styleName, props, state) {
    return defaultComponentStyle(styleName, props, state);
  }

  render () {
    //console.log('xxxxxxxxx', this.state.list )
    return (
        <View style={styles.tasksContainerStyle} >
          <View style = {styles.tasksHeaderStyle} >
          <Text style = {styles.tasksHeaderTextStyle} >TODO</Text>
          <View style = {styles.filterContainerStyle} >
            <Text style = {styles.filterTextStyle} >Filter: </Text>
            <Picker
              selectedValue={this.state.currentFilter}
              onValueChange={this.filterList}
            >
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Active" value="active" />
              <Picker.Item label="Completed" value="completed" />
            </Picker>
          </View>
          </View>
          <ScrollView style = {styles.scrollViewStyle} /*onClick = {(e)=>{ e.stopPropagation(); }}*/>
            {this.renderTodoList()}
          </ScrollView>
          <View style = {styles.bottomContainerStyle} >
            <View style = {styles.inputContainerStyle} >
              <input
                onChange={(i)=>{
                  this.inputValue = i;
                }}
                //cbOnEnter = {this.addTodoItem}
                //hasSVG={false}
                placeholder = "Enter your next task..."
              />
            </View>
            <button
              onClick = {this.addTodoItem}
            />
          </View>
        </View>
    );
  }
}



export default Todo;
