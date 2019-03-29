import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native'
import { Title, Subtitle, Text, Icon } from '@shoutem/ui'
import moment from 'moment'
import colors from '../../constants/colors';

export default class MarketCard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        //this.signal = axios.CancelToken.source()
    }


  render() {
    const { navigation, market } = this.props
    const { id, unCode, hostId, name, description, takeNote, setupStart, marketStart, marketEnd, standPrice } = market

    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('MarketDetails')} >
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <Title style={styles.topic} numberOfLines={1}>{moment(marketStart).format("dddd Do MMM YYYY")}</Title>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.time} numberOfLines={1}>{name}</Text>
            <Icon name="right-arrow" style={{color: colors.pWhite}}/>
          </View> */}
        </View>

        <View style={styles.divider}/>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <Text style={styles.from} numberOfLines={1}>{'Merchants Participating: 163'}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <Text style={styles.from} numberOfLines={1}>{'Payments received: '}</Text>
          <Text style={styles.paidY} numberOfLines={1}>{'121 : '}</Text>
          <Text style={styles.paidN} numberOfLines={1}>{'42'}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <Subtitle style={styles.from} numberOfLines={1}>{name}</Subtitle>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginBottom: 4}}>
          <Text style={styles.text} numberOfLines={2}>{description}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      width: '100%',
      //height: 100,
      backgroundColor: colors.cardBg,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 3
    },
    topic: {
      fontSize: 17,
      fontWeight: 'bold',
      color: colors.pWhite
    },
    time: {
      fontSize: 13,
      //fontWeight: 'bold',
      color: colors.pWhite
    }, 
    from: {
      fontSize: 13,
      //fontWeight: 'bold',
      color: colors.pWhite
    }, 
    paidY: {
      fontSize: 13,
      //fontWeight: 'bold',
      color: colors.pGreen
    }, 
    paidN: {
      fontSize: 13,
      //fontWeight: 'bold',
      color: colors.pRed
    }, 
    text: {
      fontSize: 12,
      //fontWeight: 'bold',
      color: colors.pWhite
    },
    divider: {
      width: '99%', 
      height: 0.5, 
      backgroundColor: colors.pWhite,
      marginVertical: 4
    },
  });