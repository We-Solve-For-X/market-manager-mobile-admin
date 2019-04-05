import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text } from 'react-native'
import { Heading, Subtitle } from '@shoutem/ui'
import SearchBar from '../components/common/SearchBar'
import axios from 'axios'
//consts & comps
import MerchantCard from '../components/merchants/MerchantCard'
import colors from '../constants/colors'
import layout from '../constants/layout'
import { HostID } from "../config/env";
//API
import { load } from "../networking/nm_sfx_merchants";
//import { pending, merchantsApproved } from "../networking/stubs";

export default class Merchants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      searchInput: '',
      nPending: null,
      nApproved: null,
      pending: [],
      approved: [],
      approvedDisp: []
    }
    this.signal = axios.CancelToken.source()
  }

  componentDidMount = () => {
    this._fetchData()
  }

  // componentWillUnmount() {
  //   this.signal.cancel('API request canceled due to componentUnmount')
  // }

  render() {
    const { navigation } = this.props
    const {searchInput, nPending, pending, nApproved, approved, approvedDisp } = this.state
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={{ marginVertical: 8, padding: 8, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
            <Heading>Merchant Requests</Heading>
            <Subtitle>You have {nPending} pending merchant requests</Subtitle>
          </View>

          <FlatList
            data={pending}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderNewMerch(item)}
            scrollEnabled={false}
            // isLoading={false}
            //ListEmptyComponent={<FlatlistError message={(isKite == 0 && surfAlertsEnabled) ? "No Surfable Spots Found" : (isKite == 1 && kiteAlertsEnabled) ? "No Surfable Spots Found" : "Activate Alerts"} noRetry={false}/>}
          />

          <View style={{ marginVertical: 8, padding: 8, borderRadius: 5, width: '100%', backgroundColor: colors.pWhite, ...styleConsts.viewShadow}}>
            <Heading>All Merchant</Heading>
            <Subtitle>You have {nApproved} registered merchants</Subtitle>
          </View>
          <SearchBar
            placeholder={'Find a Merchant'} 
            onChangeText={ (searchInput) => this._applySearch(searchInput)}
            value={searchInput}
          />

          <FlatList
            data={approvedDisp}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderMerchant(item)}
            scrollEnabled={false}
            removeClippedSubviews={true}
            initialNumToRender={30}
            // isLoading={false}
            //ListEmptyComponent={<FlatlistError message={(isKite == 0 && surfAlertsEnabled) ? "No Surfable Spots Found" : (isKite == 1 && kiteAlertsEnabled) ? "No Surfable Spots Found" : "Activate Alerts"} noRetry={false}/>}
          />
        </ScrollView>
      </View>
    )
  }

  _applySearch = (searchInput) => {
    this.setState({searchInput})
    const { approved } = this.state
    const query = searchInput.toLowerCase().replace(" ", "")
    const approvedDisp = approved.filter(item => {
      const standName = item.name.toLowerCase().replace(" ", "")
      return standName.includes(query)
     })

     this.setState({approvedDisp})
  }

  _renderNewMerch = (merchant) => {
    const navigation = this.props.navigation
    return (
      <MerchantCard navigation={navigation} merchant={merchant} isApproved={false} reloadParent={this._fetchData}/>
      )
  }

  _renderMerchant = (merchant) => {
    const navigation = this.props.navigation
    return (
      <MerchantCard navigation={navigation} merchant={merchant} isApproved={true} reloadParent={this._fetchData}/>
      )
  }

 

  _fetchData = async () => {
    console.log("fetching data")
    //this.setState({pending, merchantsApproved, approvedDisp: merchantsApproved})

    this.setState({ loading: true })

    const response = await load(HostID, this.signal.token)
    console.log('response', response)
    if (response.code == 200) {
      this.setState({
        loading: false,
        nPending: response.data.nPending,
        nApproved: response.data.nApproved,
        pending: response.data.pending,
        approved: response.data.approved,
        approvedDisp: response.data.approved
      }) 
    } else {
      this.setState({
        errorMessage: response.data,
        loading: false
      })
    }
  }

  static navigationOptions = {
    title: 'Merchants',
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg,
    //padding: 10
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'column',
    //justifyContent: 'flex-start',
    //alignItems: 'center',
    padding: 10
  },
});
