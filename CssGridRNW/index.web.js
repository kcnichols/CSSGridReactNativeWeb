import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LayoutControls from './components/layoutControls';
import WidgetList from './components/widgetList';
import importedWidgets from './components/widgets/index';
import { colorGrid } from 's2s-themes';

const styles = StyleSheet.create({
  app : {
    display : 'grid',
    backgroundColor : colorGrid.gray2,
    gridRowGap : '8px',
    gridTemplateColumns : '300px 1fr',
    gridTemplateRows : ' 100px 1fr',
    height : '100vh',
    padding : '16px'
  },
  header : {
    alignItems : 'center',
    backgroundColor : colorGrid.brand5,
    borderColor : colorGrid.brand7,
    borderStyle : 'solid',
    borderWidth : '5px',
    borderRadius : '8px',
    display : 'flex',
    color : colorGrid.gray0,
    gridColumnStart : '1',
    gridColumnEnd : '3',
    fontSize : '2em',
    justifyContent : 'center'
  },
  sidebar : {
    display : 'grid',
    gridTemplateRows : '250px 1fr',
    marginRight : '8px'
  },
  workspacePreviewContainer : {
    backgroundColor : colorGrid.gray0,
    borderWidth : '1px',
    borderColor : '#dee2e6',
    borderRadius : '8px',
    display : 'grid',
    gridColumnGap : '8px',
    gridRowGap : '8px',
  },
  modalContainer : {
    backgroundColor : 'rgba(34, 138, 230, 0.24)',
    width : "calc(100vw)",
    height : 'calc(100vh)',
    position: 'absolute' // yes
  },
  modal : {
    backgroundColor : colorGrid.gray0,
    borderRadius : '8px',
    display : 'flex',
    flexDirection : 'column',
    height : '400px',
    width : '350px',
    position : 'absolute',
    left : '40vw',
    top : '30vh'
  },
  headerText : {
    backgroundColor : colorGrid.brand5,
    borderColor : colorGrid.brand8,
    borderWidth : '2px',
    borderTopLeftRadius : '8px',
    borderTopRightRadius : '8px',
    color : colorGrid.gray0,
    padding : '16px'
  },
  // styles the input labels in modal
  inputLabelsContainer : {
    padding : '16px',
    paddingTop : '24px'
  },
  inputContainers : {
    paddingBottom : '16px'
  },
  labels : {
    fontWeight : '600',
    paddingBottom : '8px'
  },
  emptyAreaText : {
    alignItems : 'center',
    color : colorGrid.gray4,
    display : 'flex',
    flexDirection : 'row',
    fontSize: '1.5em',
    justifyContent : 'center'
  },
  deleteButton : {
    backgroundColor : colorGrid.red5,
    borderRadius : '8px',
    padding : '8px'
  },
  submitButton : {
    backgroundColor : colorGrid.green5,
    borderRadius : '8px',
    padding : '8px'
  },
  buttonText : {
    color : colorGrid.gray0
  }

});

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      modalIsVisible : false,
      widgetToBeEdited : undefined,
      widgetsInView : [],
      templateRows : '',
      templateColumns : '',
    };

    this.renderEmptyAreaText = this.renderEmptyAreaText.bind(this);
    this.renderWidgets = this.renderWidgets.bind(this);
    this.renderModal =  this.renderModal.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.updateColumn = this.updateColumn.bind(this);
    this.addWidget = this.addWidget.bind(this);
    this.deleteWidget = this.deleteWidget.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  updateRow(rowValue){
    this.setState((prevState)=>{
      return {...prevState, templateRows : rowValue };
    })
  }

  updateColumn(columnValue){
    this.setState((prevState)=>{
      return {...prevState, templateColumns : columnValue };
    })
  }

  addWidget(widget){
    this.setState((prevState)=>{
      return {...prevState, widgetsInView : this.state.widgetsInView.concat([{ name : widget}]) }
    });
  }

  deleteWidget(widget){
    this.setState((prevState)=>{

      // I am unsure of this - KCN
      const newWidgetsArray = this.state.widgetsInView;
      newWidgetsArray.splice(widget.index, 1) // fix is splicing all

      return {
        ...prevState,
        modalIsVisible : false,
        widgetsInView : newWidgetsArray
      };
    });
  }

  updateWidget(widget){
    this.setState((prevState)=>{
      //console.log('>>>>>>>>>>>>>>>>>>>>>',this.state.widgetsInView[widget.index]);

      // add properties to restyled widget gridRow, gridColumn
      const restyledWidget = this.state.widgetsInView[widget.index]
      restyledWidget.gridColumnStart = this.widgetGridColumnStart ;
      restyledWidget.gridColumnStart = this.widgetGridColumnStart ;
      restyledWidget.gridRowStart = this.widgetGridRowStart;
      restyledWidget.gridRowEnd = this.widgetGridRowEnd;

      //remove widget with same index


      // add restyled widget to widgetsInView


      // Is this gonna suck?
      let newWidgetsArray = this.state.widgetsInView
      if(widget.index > 0) {
        //console.log('iffing')
        newWidgetsArray.slice(widget.index, widget.index +1)
        newWidgetsArray.concat(newWidgetsArray.slice(0, widget.index)).concat(restyledWidget).concat(widget.index, newWidgetsArray.length -1)
      } else {
        console.log('OR ELSE')
      }

      return {
        ...prevState,
        modalIsVisible : false,
        widgetsInView : newWidgetsArray
      };
    })
  }

  openModal(widgetInView, index){
    this.setState((prevState)=>{
      return { ...prevState,
          modalIsVisible : true,
          widgetToBeEdited : {
            widget : widgetInView.name,
            index : index
          }
      }
    });
  }

  closeModal(){
    this.setState((prevState)=>{
      return {
        ...prevState,
        modalIsVisible : false,
        widgetToBeEdited : undefined
      };
    });
  }

  renderModal(widget){
    return (
      <View onClick = {this.closeModal} style = {styles.modalContainer} >
        <View onClick = {(e)=>{ e.stopPropagation(); /* so clicking here doesn't close modal */}}  style = {styles.modal} >
            <Text style = {styles.headerText} > {`${widget.widget} Properties`} </Text>
            <View style = {styles.inputLabelsContainer} >
              <View style = {styles.inputContainers}>
                <Text style = {styles.labels} > Row Start: </Text>
                <input onChange={(e)=>{ this.widgetGridRowStart = e.target.value }} />
              </View>
              <View style = {styles.inputContainers}>
                <Text style = {styles.labels} > Row End: </Text>
                <input onChange={(e)=>{ this.widgetGridRowEnd = e.target.value }} />
              </View>
              <View style = {styles.inputContainers} >
                <Text style = {styles.labels} > Column Start: </Text>
                <input onChange={(e)=>{ this.widgetGridColumnStart = e.target.value; }} />
              </View>
              <View style = {styles.inputContainers} >
                <Text style = {styles.labels} > Column End: </Text>
                <input onChange={(e)=>{ this.widgetGridColumnEnd = e.target.value; }} />
              </View>
            </View>
            <TouchableOpacity onPress = {()=>{this.deleteWidget(widget);}}  style = {styles.deleteButton} ><Text style = {styles.buttonText} >Delete</Text></TouchableOpacity>
            <TouchableOpacity onPress = {()=>{ this.updateWidget(widget);  }} style = {styles.submitButton} ><Text style = {styles.buttonText} >Submit</Text></TouchableOpacity>
        </View>
      </View>
    )
  }

  renderEmptyAreaText(){
    return (
      <Text style = {styles.emptyAreaText}>Select a widget from the list</Text>
    )
  }

  renderWidgets(){
    return this.state.widgetsInView.map((widgetInView, index)=>{
      const WidgetPreview = importedWidgets[widgetInView.name];
      return (
          <View
            key = {index}
            style = {{
              gridRowStart : widgetInView.gridRowStart,
              gridRowEnd : widgetInView.gridRowEnd,
              gridColumnStart : widgetInView.gridColumnStart,
              gridColumnEnd : widgetInView.gridColumnEnd
            }}
            onClick = {()=>{ this.openModal(widgetInView,index); }}
          >
              <WidgetPreview />
          </View>
      )
    })
  }

  render () {

      return (
        <View className = "APPCONTAINER" style = {styles.app} >
          <Text style={styles.header}>React Native Web + CSS Grid</Text>
          <View className = "SIDEBAR" style = {styles.sidebar} >
            <LayoutControls cbRowChange = {this.updateRow} cbColumnChange = {this.updateColumn} />
            <WidgetList cbWidgetClick={this.addWidget} />
          </View>
          <View className = "WORKSPACEPREVIEW" style = {[styles.workspacePreviewContainer, { gridTemplateRows : this.state.templateRows, gridTemplateColumns : this.state.templateColumns}]}>
            {this.state.widgetsInView.length === 0 ? this.renderEmptyAreaText(): this.renderWidgets()}
          </View>
          {this.state.modalIsVisible === true ? this.renderModal(this.state.widgetToBeEdited) : undefined}
        </View>
      )
  }
}


AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('react-app') });
