import React from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator  } from 'react-native'
import {  Text, Icon, Button, TextInput } from '@shoutem/ui'
import styleConsts from "../../constants/styleConsts";
import colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default class AttendanceAddCard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
          isExpanded: false,
          sending: false
        }
        //this.signal = axios.CancelToken.source()
    }


  render() {
    const { navigation, merchant, isCreate } = this.props
     const { isExpanded, dummyIsActive } = this.state
    // const { id, hostId, authId, status, isActive, name, surname, email, cell, standName, businessName, standDescription} = merchant

    const { } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.topBox} onPress={() => this.setState({isExpanded: !isExpanded})}>
          <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}} >
            <Text style={styles.textMain}>{'standName'}</Text>
            <Text style={styles.textSub}>{'rep name'} {'surname'}</Text>
            <Text style={styles.textSub}>{' 4 - R230 (Payment Bracket)'}</Text>
            {true ? 
            null
            :
            <View>
              <Text style={styles.textSub}>{'PENDING (Payment Status)'}</Text>
              <Text style={styles.textSub}>{'MREP120409 (Payment Ref)'}</Text>
            </View>}
          </View>

          <TouchableOpacity 
            style={{marginHorizontal: 7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%'}} 
            onPress={() => this.setState({isExpanded: !isExpanded})}>
            <View style={{height: '87%', width: 1, backgroundColor: colors.pWhite}}/>
            <Icon name="unfriend" style={{color: colors.pWhite, marginHorizontal: 20}}/>
          </TouchableOpacity>

          
        </View>
        {!isExpanded ?
        null:
        (<View style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 4, backgroundColor: colors.primary, borderBottomLeftRadius: 3, borderBottomRightRadius: 3}}>
          {/* <View style={styles.divider}/> */}
          {this._renderExpand(isCreate, dummyIsActive)}
        </View>)
        }
      </View>
    )
  }

  _renderExpand = () => {
      return(
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '95%'}}>
            <Button style={{marginVertical: 10, marginHorizontal: 15, borderColor: colors.secondary, ...styleConsts.buttonBorder}} onPress={() => this.setState({sending: true})}>
              <Text>ADD</Text>
              {this.state.sending ? 
              <ActivityIndicator size="small" color={colors.pBlack} />
              : 
              <Icon name="plus-button" />
              }
            </Button>
        </View>
      )
  }

  _toggleMerchant = async () => {
    this.setState({dummyIsActive: !this.state.dummyIsActive})
  }
}

const styles = StyleSheet.create({
    container:{
      width: '100%',
      //backgroundColor: colors.secondary,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 8,
      // paddingHorizontal: 4,
      // paddingVertical: 4,
      borderRadius: 3
    },
    topBox: {
      width: '100%',
      //height: 100,
      backgroundColor: colors.secondary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      //marginBottom: 8,
      paddingHorizontal: 7,
      paddingVertical: 7,
      //borderRadius: 3
    },
    textMain: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.pWhite,
      paddingVertical: 3
    },
    textSub: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.pWhite,
      paddingVertical: 2
    },
    divider: {
      width: '97%', 
      height: 0.5, 
      backgroundColor: colors.pWhite
    },
    titleBox: {
      width: 80,
      //marginLeft: 12
    },
    isActiveText: {
      fontSize: 15,
      color: colors.pWhite
    },
    textInput: {
      backgroundColor: 'transparent', 
      height: 42, 
      paddingVertical: 0,
      width: '50%'
    },
  })