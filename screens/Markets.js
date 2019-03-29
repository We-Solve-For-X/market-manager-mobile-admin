import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import { Button, Text, Icon } from '@shoutem/ui'
//import axios from 'axios'
//consts & comps
import MarketCard from '../components/markets/MarketCard'
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
import layout from '../constants/layout'
//API
import { markets } from "../networking/stubs";

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

        <Button style={{marginVertical: 10, marginHorizontal: 15, ...styleConsts.buttonBorder}} onPress={() => this.props.navigation.navigate('MarketAdd')}>
          <Icon name="add-event" />
          <Text>CREATE NEW MARKET</Text>
        </Button>

        <FlatList
          data={markets}
          //keyExtractor={(item) => item.spotSummary.spotId}
          renderItem={({item}) => this._renderMarket(item)}
          scrollEnabled={false}
          // isLoading={false}
          //ListEmptyComponent={<FlatlistError message={(isKite == 0 && surfAlertsEnabled) ? "No Surfable Spots Found" : (isKite == 1 && kiteAlertsEnabled) ? "No Surfable Spots Found" : "Activate Alerts"} noRetry={false}/>}
        />

      </ScrollView>
        
      </View>
    )
  }

  _renderMarket = (market) => {
    const navigation = this.props.navigation
    return (
      <MarketCard navigation={navigation} market={market}/>
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
    paddingHorizontal: 10,
  },
});
