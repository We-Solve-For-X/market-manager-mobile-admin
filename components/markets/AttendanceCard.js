import React from 'react';
import { StyleSheet, View, TouchableOpacity, Switch } from 'react-native'
import {  Text, Icon, Button, TextInput } from '@shoutem/ui'
import styleConsts from "../../constants/styleConsts";
import colors from '../../constants/colors';

export default class AttendanceCard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
          isExpanded: false,
          dummyIsActive: true,
          verifyDelete: false,

          paymentMethod: null,
          confirmPayment: false,
          paymentComment: ''
        }
        //this.signal = axios.CancelToken.source()
    }


  render() {
    const { navigation, attendance, isCreate } = this.props
    const { isExpanded, dummyIsActive } = this.state
    const { id, standId, merchant, invoice} = attendance

    const { } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.topBox} onPress={() => this.setState({isExpanded: !isExpanded})}>
          <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}} >
            <Text style={styles.textMain}>{merchant.name}</Text>
            <Text style={styles.textSub}>{merchant.repName} {merchant.repSurname}</Text>
            <Text style={styles.textSub}>{' 4 - R230 (Payment Bracket)'}</Text>
            {isCreate ? 
            null
            :
            <View>
              <Text style={styles.textSub}>{`R${invoice.amount} - ${invoice.status}`}</Text>
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
          {this._renderExpand(isCreate, id, merchant.id)}
        </View>)
        }
      </View>
    )
  }

  _renderExpand = (isCreate = false, attId = '', merchId = '') => {
    if(isCreate){
      return(
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '95%'}}>
          { this.state.verifyDelete ? 
          (<View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{marginVertical: 10, marginHorizontal: 15, ...styleConsts.buttonBorder}} onPress={() => this.setState({verifyDelete: false})}>
              <Text>CONFIRM</Text>
              <Icon name="add-event" />
            </Button>
            <Button style={{marginVertical: 10, marginHorizontal: 15, ...styleConsts.buttonBorder}} onPress={() => this.setState({verifyDelete: false})}>
              <Text>CANCELL</Text>
              <Icon name="add-event" />
            </Button>
          </View>)
          : (<View>
            <Button style={{marginVertical: 10, marginHorizontal: 15, borderColor: colors.secondary, ...styleConsts.buttonBorder}} onPress={() => this.props.removeAttendance(merchId)}>
              <Text>REMOVE</Text>
              <Icon name="plus-button" />
            </Button>
          </View>) }
        </View>
      )
    } else {
      return(
      <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          
            <Button style={{marginVertical: 10, marginHorizontal: 5, ...styleConsts.buttonBorder, ...{backgroundColor: this.state.paymentMethod == 'card' ? colors.pGreen : colors.pWhite}}} onPress={() => this.setState({paymentMethod: 'card'})}>
              <Text>CARD</Text>
              <Icon name="add-event" />
            </Button>
            <Button style={{marginVertical: 10, marginHorizontal: 5, ...styleConsts.buttonBorder, ...{backgroundColor: this.state.paymentMethod == 'cash' ? colors.pGreen : colors.pWhite}}} onPress={() => this.setState({paymentMethod: 'cash'})}>
              <Text>CASH</Text>
              <Icon name="add-event" />
            </Button>
          
            <Button style={{marginVertical: 10, marginHorizontal: 5, borderColor: colors.secondary, ...styleConsts.buttonBorder, ...{backgroundColor: this.state.paymentMethod == 'eft' ? colors.pGreen : colors.pWhite}}} onPress={() => this.setState({paymentMethod: 'eft'})}>
              <Text>EFT</Text>
              <Icon name="plus-button" />
            </Button>

        </View>


        {this.state.paymentMethod != null ? 
        (<View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%'}}>
          <TextInput
            placeholder={'Additional payment information'}
            onChangeText={(paymentComment) => this.setState({paymentComment})}
            style={styles.textInput}
            maxLength={150}
            value={this.state.paymentComment}
          />
          <Button style={{marginVertical: 10, marginHorizontal: 5, borderColor: colors.secondary, ...styleConsts.buttonBorder}} onPress={() => {console.log('conf payment')}}>
            <Text>CONFIRM</Text>
            <Icon name="plus-button" />
          </Button>

        </View>)
        :
        (null)}

        

        <View style={{height: 1, width: '96%', backgroundColor: colors.pWhite}}/>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '99%'}}>
          { this.state.verifyDelete ? 
          (
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button 
              style={{marginVertical: 5, marginHorizontal: 15, ...styleConsts.buttonBorder}} 
              onPress={() => this.setState({verifyDelete: false})}>
              <Text>CONFIRM</Text>
              <Icon name="add-event" />
            </Button>
            <Button 
              style={{marginVertical: 5, marginHorizontal: 15, ...styleConsts.buttonBorder}} 
              onPress={() => this.setState({verifyDelete: false})}>
              <Text>CANCELL</Text>
              <Icon name="add-event" />
            </Button>
          </View>)
          : (
          <View>
            <Button 
              style={{marginVertical: 5, marginHorizontal: 15, borderColor: colors.secondary, backgroundColor: colors.pRed , ...styleConsts.buttonBorder}} 
              onPress={() => this.setState({verifyDelete: true})}>
              <Text>REMOVE</Text>
              <Icon name="plus-button" />
            </Button>
          </View>) }

        </View>

      </View>
      )
    }
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