import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LayoutControls from '../components/layoutControls';
import WidgetList from '../components/widgetList';
import importedWidgets from '../components/widgets/index';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      widgetsInView : [],
      rows : '',
      columns : '',
    };
  }

  render () {

    console.log('this.state', this.state)

      return (
        <div
          style = {{
            display : 'grid',
            gridTemplateColumns : '300px 1fr',
            gridTemplateRows : 'calc(100vh - 32px)'
          }}
        >
          <div className = "SIDEBAR"
            style = {{
              display : 'grid',
              gridTemplateRows : '250px 1fr',
              marginRight : '8px'
            }}
          >
            <LayoutControls
                cbRowChange = {(rowValue)=>{
                  this.setState((prevState)=>{
                    return {...prevState, rows : rowValue };
                  })

                }}
                cbColumnChange = {(columnValue)=>{
                  this.setState((prevState)=>{
                    return {...prevState, columns : columnValue };
                  })

                }}
            />
            <WidgetList
              cbWidgetClick={(widget)=>{
                this.setState((prevState)=>{
                  return {...prevState, widgetsInView : this.state.widgetsInView.concat([widget]) }
                });
              }}
            />
          </div>
          <div
            className = "WORKSPACEPREVIEW"
            style = {{
              border : '1px solid #dee2e6',
              borderRadius : '8px',
              display : 'grid',
              gridTemplateRows : this.state.rows,
              gridTemplateColumns : this.state.columns,
              padding : '16px',
            }}
          >

            {this.state.widgetsInView.map((widgetInView, index)=>{
              const WidgetPreview = importedWidgets[widgetInView];
              return <WidgetPreview key = {index} />
            })}

          </div>
        </div>
      )
  }
}
