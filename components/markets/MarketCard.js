import React from 'react';
import { Icon } from 'expo';
import { StyleSheet, View } from 'react-native'

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
    const { navigation } = this.props
    const { } = this.state
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      width: '100%',
      height: 40,
      backgroundColor: colors.secondary,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });