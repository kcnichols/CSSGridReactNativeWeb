import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import * as Icons from 's2s-native-svg-icons';
import { fromJS } from "immutable";
import { colorGrid } from 's2s-themes';

const getSVGFill = (props, state) => {
  let fill = colorGrid.gray9;
  if (state.showingError || state.isFocus) {
    fill = colorGrid.gray0;
  } else if (state.onHover) {
    fill = colorGrid.gray9;
  } else {
    fill = colorGrid.gray9;
  }

  return fill;
}

const styles = StyleSheet.create({
    alertSvg: {
      display: 'flex',
      fill: '#f8f9fa',
      height: '24px',
      margin: '2px 4px 2px 2px',
      width: '24px'
    },
    alertSvgArea: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      paddingLeft: '5px',
      width: '40px'
    },
    disabledInput: {
      backgroundColor: '#e9ecef',
      borderBottomWidth: '1px',
      borderBottomColor: '#dee2e6',
      borderLeftColor: 'transparent',
      borderRightWidth: '1px',
      borderRightColor: '#dee2e6',
      borderTopWidth: '1px',
      borderTopColor: '#dee2e6',
      borderBottomRightRadius: '2px',
      borderTopRightRadius: '2px',
      cursor: 'not-allowed',
      flex: 1,
      fontSize: '14px',
      lineHeight: '40px',
      paddingLeft: '10px',
      outline: 'none'
    },
    disabledInputNoSVG: {
      backgroundColor: '#e9ecef',
      borderBottomColor: '#dee2e6',
      borderBottomWidth: '1px',
      borderLeftColor: '#dee2e6',
      borderLeftWidth: '1px',
      borderRightColor: '#dee2e6',
      borderRightWidth: '1px',
      borderTopColor: '#dee2e6',
      borderTopWidth: '1px',
      borderBottomRightRadius: '2px',
      borderTopRightRadius: '2px',
      cursor: 'not-allowed',
      flex: 1,
      fontSize: '14px',
      lineHeight: '40px',
      paddingLeft: '10px',
      outline: 'none'
    },
    errorText: {
      color: '#f8f9fa',
      display: 'flex',
      flex: 10,
      fontSize: '12px',
      lineHeight: '24px',
      margin: '0',
      paddingTop: '5px',
      paddingRight: '5px',
      paddingBottom: '5px',
      paddingLeft: '0px'
    },
    inputAlert: {
      alignItems: 'center',
      backgroundColor: '#e03131',
      borderLeftColor: '#e03131',
      borderLeftWidth: '1px',
      borderBottomColor: '#e03131',
      borderBottomWidth: '1px',
      borderRightColor: '#e03131',
      borderRightWidth: '1px',
      borderBottomLeftRadius: '2px',
      borderBottomRightRadius: '2px',
      display : 'none',
      //display: state.isErrorVisible && props.errorText !== undefined ? 'flex' : 'none',
      flexDirection: 'row'
    },
    inputField: {
      backgroundColor: '#faf8f9',
      borderBottomColor: '#dee2e6',
      borderBottomWidth: '1px',
      borderLeftColor: 'transparent',
      borderRightColor: '#dee2e6',
      borderRightWidth: '1px',
      borderTopColor: '#dee2e6',
      borderTopWidth: '1px',
      borderStyle: 'solid',
      borderBottomRightRadius: '2px',
      borderTopRightRadius: '2px',
      flex: 1,
      fontSize: '14px',
      lineHeight: '40px',
      paddingLeft: '10px',
      outline: 'none'
    },
    inputFieldNoSVG: {
      borderBottomColor: '#dee2e6',
      borderBottomWidth: '1px',
      borderLeftColor: '#dee2e6',
      borderLeftWidth: '1px',
      borderRightColor: '#dee2e6',
      borderRightWidth: '1px',
      borderTopColor: '#dee2e6',
      borderStyle: 'solid',
      borderTopWidth: '1px',
      borderBottomLeftRadius: '2px',
      borderBottomRightRadius: '2px',
      borderTopLeftRadius: '2px',
      borderTopRightRadius: '2px',
      flex: 1,
      fontSize: '14px',
      lineHeight: '40px',
      paddingLeft: '10px',
      outline: 'none'
    },
    inputFieldWithError: {
      borderBottomColor: '#e03131',
      borderBottomWidth: '2px',
      borderLeftColor: 'transparent',
      borderRightColor: '#e03131',
      borderRightWidth: '2px',
      borderTopColor: '#e03131',
      borderStyle: 'solid',
      borderTopWidth: '2px',
      borderTopRightRadius: '2px',
      cursor: 'text',
      flex: 1,
      fontSize: '14px',
      lineHeight: '40px',
      paddingLeft: '10px',
      outline: 'none'
    },
    inputFieldWithErrorNoSVG: {
      borderBottomColor: '#e03131',
      borderBottomWidth: '1px',
      borderLeftColor: '#e03131',
      borderLeftWidth: '1px',
      borderRightColor: '#e03131',
      borderRightWidth: '1px',
      borderTopColor: '#e03131',
      borderStyle: 'solid',
      borderTopWidth: '1px',
      borderTopLeftRadius: '2px',
      borderTopRightRadius: '2px',
      cursor: 'text',
      flex: 1,
      fontSize: '12px',
      lineHeight: '40px',
      paddingLeft: '10px',
      outline: 'none'
    },
    inputFieldWithHover: {
      backgroundColor: '#e9ecef',
      borderBottomColor: '#adb5bd',
      borderBottomWidth: '2px',
      borderLeftColor: 'transparent',
      borderRightColor: '#adb5bd',
      borderRightWidth: '2px',
      borderTopColor: '#adb5bd',
      borderStyle: 'solid',
      borderTopWidth: '2px',
      borderTopRightRadius: '2px',
      borderBottomRightRadius: '2px',
      flex: 1,
      fontSize: '14px',
      lineHeight: '40px',
      paddingLeft: '10px',
      outline: 'none'
    },
    inputFieldWithHoverNoSVG: {
      backgroundColor: '#e9ecef',
      borderBottomColor: '#adb5bd',
      borderBottomWidth: '2px',
      borderLeftColor: '#adb5bd',
      borderLeftWidth: '2px',
      borderRightColor: '#adb5bd',
      borderRightWidth: '2px',
      borderTopColor: '#adb5bd',
      borderStyle: 'solid',
      borderTopWidth: '2px',
      borderTopLeftRadius: '2px',
      borderBottomLeftRadius: '2px',
      borderTopRightRadius: '2px',
      borderBottomRightRadius: '2px',
      flex: 1,
      fontSize: '14px',
      lineHeight: '40px',
      paddingLeft: '10px',
      outline: 'none'
    },
    inputFieldWithFocus: {
      backgroundColor: '#faf8f9',
      borderBottomColor: '#228ae6',
      borderBottomWidth: '2px',
      borderLeftColor: 'transparent',
      borderRightColor: '#228ae6',
      borderRightWidth: '2px',
      borderTopColor: '#228ae6',
      borderStyle: 'solid',
      borderTopWidth: '2px',
      borderTopRightRadius: '2px',
      borderBottomRightRadius: '2px',
      flex: 1,
      fontSize: '14px',
      lineHeight: '40px',
      paddingLeft: '10px',
      outline: 'none'
    },
    inputFieldWithFocusNoSVG: {
      borderBottomColor: '#228ae6',
      borderBottomWidth: '2px',
      borderLeftColor: '#228ae6',
      borderLeftWidth: '2px',
      borderRightColor: '#228ae6',
      borderRightWidth: '2px',
      borderTopColor: '#228ae6',
      borderStyle: 'solid',
      borderTopWidth: '2px',
      borderTopLeftRadius: '2px',
      borderBottomLeftRadius: '2px',
      borderTopRightRadius: '2px',
      borderBottomRightRadius: '2px',
      flex: 1,
      fontSize: '14px',
      lineHeight: '40px',
      paddingLeft: '10px',
      outline: 'none'
    },
    inputComponent: {
      display: 'flex',
      flexDirection: 'column',
      flex : 1,
      //width: '100%',

    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',

    },
    // inputContainerWithFocus: {
    //   borderTop: 'solid 2px #228ae6',
    //   borderLeftWidth: 'solid 2px #228ae6',
    //   borderBottom: 'solid 2px #228ae6',
    //   borderRight: 'solid 2px #228ae6',
    //   borderTopLeftRadius: '2px',
    //   borderBottomLeftRadius: '2px',
    //   borderTopRightRadius: '2px',
    //   borderBottomRightRadius: '2px'
    // },
    showHide: {
      alignItems: 'center',
      backgroundColor: 'inherit',
      color: '#868e96',
      //display: props.inputType === 'password' ? 'flex' : 'none',
      display : 'none',
      fontFamily : 'sans-serif',
      fontSize: '12px',
      justifyContent: 'center',
      lineHeight: '40px',
      position: 'absolute',
      right: '2px',
      //textDecoration: 'none',
      top: '2px',
      width: '48px'
    },
    showHideWithError: {
      color: '#dee2e6',
      fontFamily : 'sans-serif'
    },
    // showHideWithHover: {
    //   color: '#e9ecef'
    // },
    svgArea: {
      alignItems: 'center',
      backgroundColor: '#f1f3f5',
      borderTopColor: '#dee2e6',
      borderTopWidth: '1px',
      borderLeftColor: '#dee2e6',
      borderLeftWidth: '1px',
      borderBottomColor: '#dee2e6',
      borderBottomWidth: '1px',
      borderRightColor: '#dee2e6',
      borderRightWidth: '1px',
      borderTopLeftRadius: '2px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      width: '40px',

    },
    noSVGArea: {
      display: 'none'
    },
    svgAreaWithError: {
      alignItems: 'center',
      backgroundColor: '#e03131',
      borderTopColor: '#e03131',
      borderTopWidth: '2px',
      borderLeftColor: '#e03131',
      borderLeftWidth: '2px',
      borderBottomColor: '#e03131',
      borderBottomWidth: '2px',
      borderRightColor: '#e03131',
      borderRightWidth: '2px',
      borderBottomLeftRadius: '0px',
      borderTopLeftRadius: '2px',
      display: 'flex',
      justifyContent: 'center',
      width: '40px'
    },
    svgAreaWithFocus: {
      alignItems: 'center',
      backgroundColor: '#228ae6',
      borderTopColor: '#228ae6',
      borderTopWidth: '2px',
      borderLeftColor: '#228ae6',
      borderLeftWidth: '2px',
      borderBottomColor: '#228ae6',
      borderBottomWidth: '2px',
      borderRightColor: '#228ae6',
      borderRightWidth: '2px',
      borderTopLeftRadius: '2px',
      borderBottomLeftRadius: '2px',
      display: 'flex',
      justifyContent: 'center',
      width: '40px'
    },
    svgAreaWithHover: {
      alignItems: 'center',
      backgroundColor: '#e9ecef',
      borderTopColor: '#adb5bd',
      borderTopWidth: '2px',
      borderLeftColor: '#adb5bd',
      borderLeftWidth: '2px',
      borderBottomColor: '#adb5bd',
      borderBottomWidth: '2px',
      borderRightColor: '#adb5bd',
      borderRightWidth: '2px',
      borderTopLeftRadius: '2px',
      display: 'flex',
      justifyContent: 'center',
      width: '40px'
    },
    svgStyle: {
      fill: '#212529',
      height: '24px',
      margin: '2px',
      width: '24px'
    },
    svgStyleChange: {
      fill: '#f8f9fa',
      height: '24px',
      margin: '2px',
      width: '24px'
    },
    svgStyleWithHover: {
      fill: '#212529',
      height: '24px',
      margin: '2px',
      width: '24px'
    },
    noSvgStyle: {
      height: '24px',
      margin: '2px',
      width: '24px'
    }
  });

const svgDefaultMap ={
  'email' : 'AvatarIconSVG',
  'password': 'LockIconSVG',
  'text': 'ChatIconSVG'
};

class Input extends Component {
  constructor(props){
    super(props);
    this.displayName = 'Input';

    this.state = {
      'inputValue': this.props.value,
      'isFocus': false,
      'onHover': false,
      'showHideControl' : { 'showHidePwdLabel': "Show",'passwordTypeOverride': 'password' },
      'showingError': this.props.hasError
    };

    this.clearVisibleError = this.clearVisibleError.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleCbIconClick = this.handleCbIconClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSvgAreaOnKeyDown = this.handleSvgAreaOnKeyDown.bind(this);
    this.setSVGAreaStyle = this.setSVGAreaStyle.bind(this);
    this.togglePwdShowHide = this.togglePwdShowHide.bind(this);

    this.showPwString = "Show";
    this.hidePwString = "Hide";

  }

  // get value(){
  //   return this.refs.input.value;
  // }

  static propTypes = {
    cbIconClick : PropTypes.func,
    cbOnChange: PropTypes.func,
    cbOnEnter: PropTypes.func,
    cbOnFocus: PropTypes.func,
    compStyle: PropTypes.object,
    errorText: PropTypes.string,
    hasError: PropTypes.bool,
    hasSVG: PropTypes.bool,
    inputType: PropTypes.oneOf(['email', 'password', 'text']),
    isDisabled: PropTypes.bool,
    placeholder: PropTypes.string,
    svgOverride: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    cbOnEnter: ()=>{/*console.log('cbOnEnter is not defined');*/},
    cbOnChange: ()=>{/*console.log('cbOnChange is not defined');*/},
    cbOnFocus: ()=>{/*console.log('cbOnFocus is not defined');*/},
    errorText: undefined,
    hasError: false,
    hasSVG: true,
    inputType: 'text',
    isDisabled: false,
    placeholder: undefined,
    value: ''
  };

  shouldComponentUpdate(nextProps, nextState) {
    //this component does not use state so it does not need to be checked in here
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  componentWillReceiveProps(nextProps, nextState) { //ensures on a new render that the state will match the passed in prop

    this.setState((prevState, props)=>{
      let newState = { ...prevState };
      //console.log('cwrp:',props.hasError )
      if (props.hasOwnProperty('hasError')) {
          newState = { ...newState, 'showingError': props.hasError };
      }

      if (props.hasOwnProperty('value')) {

        if ( prevState.inputValue !== props.value ){
          //console.log('cwrp:', prevState.inputValue, nextProps.value )
          newState = { ...newState, 'inputValue': props.value };
        }
      }
      return newState;
    });

  }

  getDefaultStyle(styleName, props, state)  {
    //console.log('getDefaultStyle', props, state)
    return defaultComponentStyle(styleName, props, state);
  }

  getSvg() { // this sets the svg to allow an over ride and appropriate defaults. Is called in the render at DynamicSvg Const.
    return this.props.svgOverride ? (this.props.svgOverride) : (svgDefaultMap[this.props.inputType]);
  }

  togglePwdShowHide() { //switches the show hide control appropriatly and reveals or conceals the password
    this.setState((prevState, props)=>{
      if (prevState.showHideControl.showHidePwdLabel === this.showPwString) {
        return {...prevState, 'showHideControl': {'showHidePwdLabel': this.hidePwString, 'passwordTypeOverride': 'text'}};
      }

      return {...prevState, 'showHideControl':  {'showHidePwdLabel': this.showPwString, 'passwordTypeOverride': 'password'}};
    });


  }

  handleKeyDown(e){
    switch (e.keyCode){
      case 32:
        this.togglePwdShowHide();
        break;
      default:
        break;
    }
  }

  clearVisibleError() { //onChange clears the error visibly
    this.setState((prevState, props)=>{
      return {...prevState, 'showingError': false};
    });
  }

  handleChange(e){
    let targetValue;
    // wrap in try catch so it will continue
    try{
      targetValue = decodeURI(encodeURI(e.target.value));
    } catch(e){
      targetValue = e.target.value;
    }
    this.clearVisibleError();
    if (this.props.cbOnChange){
      //console.log(e.target.value, e.nativeevent, e);
      this.props.cbOnChange(targetValue);
    }

    this.setState((prevState, props)=>{
      return {...prevState, 'inputValue': targetValue};
    });
  }

  handleFocus() {
    if (!this.props.isDisabled) {
      this.setState((prevState, props)=>{
        return {...prevState, 'isFocus': true};
      });
      //this.props.cbOnFocus(true);
    }
  }

  handleBlur() {
    this.setState((prevState, props)=>{
      return {...prevState, 'isFocus': false};
    });
    //this.props.cbOnFocus(false);
  }

  handleKeyUp(e){
    if (e.nativeEvent.key === "Enter") {
      // console.log('this.refs.input.value', this.refs.input.value)
      // console.log("state.inputValue", this.state.inputValue)
      //this.props.cbOnEnter(this.refs.input.value);
      this.props.cbOnEnter(this.state.inputValue);
    }
    return true;
  }

  handleMouseEnter() {
    if (!this.props.isDisabled) {
      this.setState((prevState, props)=>{
        return {...prevState, 'onHover': true};
      });
    }
  }

  handleMouseLeave() {
    if (!this.props.isDisabled) {
      this.setState((prevState, props)=>{
        return {...prevState, 'onHover': false};
      });
    }
  }

  setSVGAreaStyle() {
    let dynamicStyleStates;
    if(this.props.hasSVG){
        if (this.state.showingError) {
          dynamicStyleStates = this.svgAreaWithError;
        } else if (this.state.isFocus) {
          dynamicStyleStates = this.svgAreaWithFocus;
        } else if (this.state.onHover) {
          dynamicStyleStates = this.svgAreaWithHover;
        } else {
          dynamicStyleStates = this.svgArea;
        }
    } else if (!this.props.hasSVG){
      dynamicStyleStates = this.noSVGArea;
    }
    return dynamicStyleStates;
  }

  setInputFieldStyle() {
    let dynamicInputStates;
    if (this.state.showingError) {
      dynamicInputStates = this.props.hasSVG ? styles.inputFieldWithError : styles.inputFieldWithErrorNoSVG;
    } else if (this.state.isFocus) {
      dynamicInputStates = this.props.hasSVG ? styles.inputFieldWithFocus : styles.inputFieldWithFocusNoSVG;
    } else if (this.state.onHover) {
      dynamicInputStates = this.props.hasSVG ? styles.inputFieldWithHover : styles.inputFieldWithHoverNoSVG;
    } else if (this.props.isDisabled) {
      dynamicInputStates = this.props.hasSVG ? styles.disabledInput : styles.disabledInputNoSVG;
    } else {
      dynamicInputStates = this.props.hasSVG ? styles.inputField: styles.inputFieldNoSVG;
    }
      return dynamicInputStates;
  }

  handleCbIconClick() {
    if (this.props.cbIconClick) {
         this.props.cbIconClick();
    } else {
      console.log('cbIconClick is not defined');
    }
  }

  handleSvgAreaOnKeyDown(e){
    switch (e.keyCode){
      case 32:
        this.props.cbIconClick();
        break;
      case 13:
        this.props.cbIconClick();
        break;
      default:
        break;
    }
  }

  render(){
    const AlertSvg = Icons['AlertIconSVG'];
    const inputType = this.props.inputType === 'password' ? this.state.showHideControl.passwordTypeOverride : this.props.inputType;
    const DynamicSvg = Icons[this.getSvg()];

    // Add guard against svg not being found.

    let svgToRender;
    if (DynamicSvg) {
      svgToRender = (<DynamicSvg
          className = "dynamicSvg"
          fill = {colorGrid.gray5}
          scale = ".75"
      />);
    } else {
      // show empty div is svg does not exist.
      console.warn('SVG icon for input component not found.', this.getSvg());
      svgToRender = <View style={styles.noSvgStyle} />;
    }

    const inputContainer = this.state.showingError ? [styles.inputContainer, { borderBottomColor : 'transparent' } ]: [styles.inputContainer, { borderBottomColor : 'transparent', borderBottomWidth: '1px' } ];
    const showHide = this.props.inputType === 'password' ? [styles.showHide, {display: 'flex'} ]: [styles.showHide, {display: 'none'}];
    const inputAlert = this.state.showingError && this.props.errorText !== undefined ? [styles.inputAlert, {display: 'flex'} ]: [styles.inputAlert, {display: 'none'}];

    let dynamicSvgArea;
    if ( !this.props.cbIconClick ) {
      dynamicSvgArea = (
        <View
            aria-label = 'Icon Area'
            className = "svgArea"
            style = {this.setSVGAreaStyle()}
        >
          {svgToRender}
       </View>
     );
   } else {
      dynamicSvgArea = (
        <View
            aria-label = 'Icon Area'
            className = "svgArea"
            onClick = {this.handleCbIconClick}
            onBlur = {this.handleBlur}
            onMouseEnter = {this.handleMouseEnter}
            onMouseLeave = {this.handleMouseLeave}
            onFocus = {this.handleFocus}
            onKeyDown = {this.handleSvgAreaOnKeyDown}
            role = "button"
            tabIndex = {0}
            style = {this.setSVGAreaStyle()}
        >
          {svgToRender}
        </View>
      );
   }

    return(
      <View
          className = "inputComponent"
          style = {styles.inputComponent}
      >
        <View
            className = "inputContainer"
            style = {inputContainer}
        >
          <TextInput
              aria-label = 'Input'
              className = "inputField"
              disabled = {this.props.isDisabled}
              onBlur = {this.handleBlur}
              onChange = {this.handleChange}
              onFocus = {this.handleFocus}
              onKeyPress = {this.handleKeyUp}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              //placeholder = {}
              //ref = "input"
              style = {this.setInputFieldStyle()}
              type = {inputType}
              secureTextEntry = {inputType === "password"}
              value = {this.state.inputValue}
          />
          <Text
              href = "#"
              className = "showHide"
              onClick = {this.togglePwdShowHide}
              onKeyDown = {this.handleKeyDown}
              role = "button"
              style = {!this.state.showingError ? showHide : [showHide, styles.showHideWithError]}
          >
              {this.state.showHideControl.showHidePwdLabel}
          </Text>
        </View>
        <View
            className = "inputAlert"
            style =  {inputAlert}
        >
          <View
              className = "alertSvgArea"
              style = {styles.alertSvgArea}
          >
            <AlertSvg
              className = "alertSvg"
              fill="#faf8f9"
            />
          </View>
          <Text
              className = "errorText"
              style = {styles.errorText}
          >
              {this.props.errorText}
          </Text>
        </View>
      </View>
    );
  }
}



export default Input;
