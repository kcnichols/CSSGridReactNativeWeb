import React, {Component} from 'react';
import { colorGrid } from 's2s-themes';
import { View, Text, StyleSheet } from 'react-native';

export default class Button extends Component {
    render () {
        return(
          <View
            style = {{
              alignItems : 'center',
              backgroundColor : colorGrid.gray0,
              borderColor : colorGrid.gray4,
              borderStyle : 'solid',
              borderWidth : '2px',
              borderRadius : '50%',
              cursor : 'pointer',
              display : 'flex',
              height : '50px',
              justifyContent : 'center',
              padding : '48px',
              width : '50px',
            }}
          >
            {this.props.children}
          </View>
      )
    }
}
