import React, {Component} from 'react';
import { colorGrid } from 's2s-themes';

export default class Circle extends Component {
    render () {
        return(
          <div
            style = {{
              alignItems : 'center',
              backgroundColor : colorGrid.gray0,
              border : '2px solid' + colorGrid.gray4,
              borderRadius : '50%',
              cursor : 'pointer',
              display : 'flex',
              height : '50px',
              justifyContent : 'center',
              width : '50px',
              padding : '16px',
            }}
          >
            {this.props.children}
          </div>
      )
    }
}
