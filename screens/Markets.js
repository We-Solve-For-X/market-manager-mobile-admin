import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import { Button, Text, Icon } from '@shoutem/ui'
//import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API

export default class Markets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    //this.signal = axios.CancelToken.source()
  }

  componentDidMount = () => {
    this._fetchData()
  }

  // componentWillUnmount() {
  //   this.signal.cancel('API request canceled due to componentUnmount')
  // }

  render() {
    const { navigation } = this.props
    const { } = this.state
    return (
      <View style={styles.container}>
      <ScrollView>
        <Button style={{marginVertical: 10, marginHorizontal: 15}} onPress={() => this.props.navigation.navigate('MarketAdd')}>
          <Icon name="add-event" />
          <Text>CREATE NEW MARKET</Text>
        </Button>
        <FlatList/>

      </ScrollView>
        <Text>Markets</Text>
        <Button title="Add Market Instance" onPress={() => this.props.navigation.navigate('MarketAdd')} />
        <Button title="View Market" onPress={() => this.props.navigation.navigate('MarketDetails')} />
      </View>
    )
  }

  _fetchData = async () => {
    console.log("fetching data")
    // this.setState({ loading: true })
    // const response = await fetchLocationDetails(spotId, this.signal.token)
    // if (response.code == 200) {
    //   this.setState({
    //     surfSpot: response.data.spot,
    //     meta: response.data.meta,
    //     loading: false
    //   }) 
    // } else {
    //   this.setState({
    //     errorMessage: response.data,
    //     loading: false
    //   })
    // }
  }

  static navigationOptions = {
    title: 'Markets',
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg,
  },
});
