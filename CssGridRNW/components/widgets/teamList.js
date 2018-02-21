import React, { Component } from 'react';
import { View, ScrollView,Text, StyleSheet } from 'react-native';
import { fromJS } from "immutable";
import { colorGrid } from 's2s-themes';
import PropTypes from 'prop-types';
import objectMerge from 'object-merge';

const styles = StyleSheet.create({
  teamContainerStyle : {
    backgroundColor : colorGrid.gray2,
    borderColor : colorGrid.gray3,
    borderRadius : '8px',
    borderWidth: '1px',
    flex: 1,
    // maxHeight:'300px',
    // width : '239px'
  },
  teamHeaderStyle : {
    backgroundColor : colorGrid.gray0,
    borderTopLeftRadius : '8px',
    borderTopRightRadius : '8px',
    flexDirection : 'row',
    justifyContent : 'space-around',
    padding : '12px'
  },
  teamHeaderTextStyle : {
    alignItems : 'center',
    backgroundColor : colorGrid.gray0,
    borderTopLeftRadius : '8px',
    borderTopRightRadius : '8px',
    borderWidth: '2px',
    color : colorGrid.gray9,
    display : 'flex',
    fontSize : '12px',
    fontWeight : '600',
    justifyContent : 'flex-start'
  },
  scrollViewStyle : {
    backgroundColor : colorGrid.gray2,
    padding : '6px'
  },
  memberItemStyle : {
    alignItems : 'center',
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  memberNameStyle : {
    justifyContent : 'flex-start',
    overflow : 'hidden',
    paddingRight : '12px',
    textOverflow : 'ellipsis',
    whiteSpace : 'nowrap'
  },
  contactMethodAreaStyle : {
    flexDirection : 'row'
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
})

class TeamList extends Component {
  constructor(props){
    super(props);
    this.state = {
      teamMemberModalDisplayed : false
    };
    this.renderTeamList = this.renderTeamList.bind(this);
    this.handleReceiveTeamData = this.handleReceiveTeamData.bind(this);
    this.renderTeamMemberConfirmationDisplayed = this.renderTeamMemberConfirmationDisplayed.bind(this);

  }

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName, props, state) {
    return defaultComponentStyle(styleName, props, state);
  }

  contactMember(member) {
    // TODO Do something when clicking contact method.
    // Currently taking in whole member object...
    console.log('Contacting a Team Member: member', member);
  }

  handleReceiveTeamData(error, userInfo) {
    // If there is data, confirm with user to add, then add to teamList (push team member object to state)
    // team member object = {first_name, last_name, user_uuid, email, type}
    console.log("hanmData", error, userInfo)
    if(!error){
      console.log("handleReceiveTeamData")
      this.userInfo = userInfo;
      this.setState((prevState)=>{
        return objectMerge(prevState, { 'teamMemberModalDisplayed' : true });
      });
    }else{
      console.log("ERROR RECEIVING TEAM DATA", error);
    }

  }

  renderTeamList(){
    // console.log('TEAM LIST', this.props.metadata.teamList);
    if (this.props.metadata && this.props.metadata.teamList && this.props.metadata.teamList.length > 0) {
      return this.props.metadata.teamList.map((item, index)=>{

        // guard against api madness...
        if (!item) {return undefined}

        let memberName = `${item.user.first_name} ${item.user.last_name}`;

        return (
          <View
            className = "memberItem"
            key = {index}
            style = {style.memberItemStyle}
          >
            <Text className = "MemberName" style = {styles.memberNameStyle} > {memberName} </Text>
            <View className = "ContactMethodArea" style = {styles.contactMethodAreaStyle} >
              <button
              />
            </View>
          </View>
        )
      });
    } else {
      return (
        <Text>No Team Members</Text>
      )
    }

  }

  renderTeamMemberConfirmationDisplayed(){
    // TODO doesn't necessarily have to be a modal temp design
    if(this.state.teamMemberModalDisplayed === true) {
      const btnLabel=(this.userInfo !== undefined || {}) && this.userInfo.properties !== undefined  ? "Add user to team" : "Confirm create guest account"
      return (
        <View className = "TeamMemberConfirmation"
            style = {{
              backgroundColor : colorGrid.gray0,
              borderColor : colorGrid.gray3,
              borderWidth : '1px'
            }}
        >
          <Text> {(this.userInfo !== undefined || {}) && this.userInfo.properties !== undefined  ? "User found" : "User not found"}</Text>
          <button
            buttonLabel = {btnLabel}
            buttonType = "primaryGreen"
            obClick={()=>{
              if((this.userInfo !== undefined || {}) && this.userInfo.properties !== undefined ) {

                // const teamMember = {
                //   'first_name' : this.userInfo.properties.first_name,
                //   'last_name' : this.userInfo.properties.last_name,
                //   'email' : this.userInfo.properties.email !== undefined ? this.userInfo.properties.email : this.userInfo.username,
                //   'user_uuid' : this.userInfo.uuid,
                //   'type': this.userInfo.type.hasOwnProperty('user') ? 'user' : 'guest' // TODO - should we assume guest if not user??
                // }

                // TODO: Update store.
                this.setState((prevState)=> {
                  let newState = objectMerge({}, prevState);

                  //newState.teamList = newState.teamList.concat(teamMember);
                  newState.teamMemberModalDisplayed = false;
                  return newState;
                })
                // clear the email value
                this.userEmail = '';
              } else {
                // actions.app.createGuestIdentity({ 'username' : this.userEmail, 'callback' : this.handleReceiveTeamData });
                // this.setState((prevState)=> {
                //   // chose this over objectMerge because of circular reference error when adding a second person
                //   return {...prevState, teamMemberModalDisplayed : false };
                // })
              }

            }}
          />
          <button
            buttonLabel = "Cancel"
            buttonType = "primaryRed"
            onClick={()=>{
              this.setState((prevState)=> {
                return objectMerge(prevState, { teamMemberModalDisplayed : false });
              })
            }}
          />
        </View>
      )
    }
  }


  render () {

    //console.log('teamlist render', this.props, this.state)
    return (
        <View
            className = "TeamListContainer"
            //onClick = {(e)=>{ e.stopPropagation(); }}
            style={styles.teamContainerStyle}
        >
            <View className = "TeamHeader" style = {styles.teamHeaderStyle} >
              <Text className = "TeamHeaderText" style = {styles.teamHeaderTextStyle} > Team List </Text>
            </View>
            <ScrollView className = "TeamListScrollView" style = {styles.scrollViewStyle} >
              {this.renderTeamList()}
            </ScrollView>
            <View style = {styles.bottomContainerStyle} >
              <View style = {styles.inputContainerStyle} >
                <input
                  onChange={(i)=>{
                    this.userEmail = i;
                  }}
                  // cbOnEnter = {()=>{
                  //   // Clicking this button will take the value that is in LabelledInput and call the action lookupIdentity
                  //   const emailRegex = '.+@.+..+'; //'.+\@.+\..+';
                  //   if(this.userEmail !== undefined && this.userEmail.match(emailRegex) !== null) {
                  //     actions.app.lookupIdentity({
                  //       'username' : this.userEmail,
                  //       'callback' : this.handleReceiveTeamData
                  //     })
                  //   }
                  // }}
                  placeholder = "Enter an email..."
                />
              </View>
              <button
                onClick = {()=>{
                  // Clicking this button will take the value that is in LabelledInput and call the action lookupIdentity
                  const emailRegex = '.+@.+..+'; //'.+\@.+\..+';
                  if(this.userEmail !== undefined && this.userEmail.match(emailRegex) !== null) {
                    actions.app.lookupIdentity({
                      'username' : this.userEmail,
                      'callback' : this.handleReceiveTeamData
                    })
                  }
                }}

              />
              {this.renderTeamMemberConfirmationDisplayed()}
            </View>
        </View>
    );
  }
}



export default TeamList;
