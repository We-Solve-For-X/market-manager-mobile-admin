import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, RefreshControl, KeyboardAvoidingView } from 'react-native'
import { Heading, Subtitle } from '@shoutem/ui'
import SearchBar from '../components/common/SearchBar'
import axios from 'axios'
//consts & comps
import ErrorLine from "../components/common/ErrorLine"
import ViewSwitch from "../components/common/ViewSwitch"
import MerchantCard from '../components/merchants/MerchantCard'
import NoContent from "../components/common/NoContent"
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
      loading: false,
      searchInput: '',
      nPending: null,
      nApproved: null,
      pending: [],
      approved: [],
    }
    this.signal = axios.CancelToken.source()
  }

  componentDidMount = () => {
    this._fetchData()
  }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    const { navigation } = this.props
    const {searchInput, nPending, pending, nApproved, approved, loading, errorMessage } = this.state
    return (
      <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView contentContainerStyle={styles.scrollContainer} 
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => this._fetchData()}
            />
          }
          >
          <ErrorLine errorMessage={errorMessage}/>
          <ViewSwitch hide={!nPending}>
            <View style={styles.tileCont}>
              <Heading>Merchant Requests</Heading>
              <Subtitle>There are {nPending} merchant requests pending</Subtitle>
            </View>
            <FlatList
              data={pending}
              //keyExtractor={(item) => item.spotSummary.spotId}
              renderItem={({item}) => this._renderNewMerch(item)}
              scrollEnabled={false}
            />
          </ViewSwitch>
          
          <ViewSwitch style={styles.tileCont} hide={!nApproved}>
            <Heading>All Merchant</Heading>
            <Subtitle>There are {nApproved ? nApproved : '0'} approved merchants on the system</Subtitle>
          </ViewSwitch>
          <SearchBar
            placeholder={'Find a Merchant'} 
            onChangeText={ (searchInput) => this.setState({searchInput})}
            value={searchInput}
          />

          <FlatList
            data={this._applySearch(approved)}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderMerchant(item)}
            scrollEnabled={false}
            removeClippedSubviews={true}
            initialNumToRender={30}
            ListEmptyComponent={<NoContent refresh={true}/>}
            />
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }

  _applySearch = (merchants = []) => {
    const { searchInput } = this.state
    const query = searchInput.toLowerCase().replace(" ", "")
    return merchants.filter(item => {
      const standName = item.name.toLowerCase().replace(" ", "")
      return standName.includes(query)
     })
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
    this.setState({ loading: true })
    const response = await load(HostID, this.signal.token)
    if (response.code == 200) {
      this.setState({
        loading: false,
        nPending: response.data.nPending,
        nApproved: response.data.nApproved,
        pending: response.data.pending,
        approved: response.data.approved,
        errorMessage: null
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
  tileCont: {
    marginVertical: 8, 
    padding: 8, 
    borderRadius: 5, 
    width: '100%', 
    backgroundColor: colors.pWhite, 
    ...styleConsts.viewShadow
  }
});
