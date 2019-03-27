import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native'
import { Title, Subtitle, Text, Icon } from '@shoutem/ui'
import moment from 'moment'
import colors from '../../constants/colors';

export default class CommunicCard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        //this.signal = axios.CancelToken.source()
    }


  render() {
    const { navigation, message } = this.props
    const { topic, text, fromName, toName, createdAt } = message
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('CommunicationView', {message: message})}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <Title style={styles.topic} numberOfLines={1}>{topic}</Title>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.time} numberOfLines={1}>{moment(createdAt).format("ddd Do MMM HH:mm")}</Text>
            <Icon name="right-arrow" style={{color: colors.pWhite}}/>
          </View>
          
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <Subtitle style={styles.from} numberOfLines={1}>{fromName}</Subtitle>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginBottom: 4}}>
          <Text style={styles.text} numberOfLines={2}>{text}</Text>
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
      borderRadius: 3
    },
    topic: {
      fontSize: 15,
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
    text: {
      fontSize: 12,
      //fontWeight: 'bold',
      color: colors.pWhite
    }
  });