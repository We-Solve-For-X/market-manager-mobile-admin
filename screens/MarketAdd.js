import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { Button, Text, Icon, Subtitle, TextInput } from '@shoutem/ui'
import ButtonFloat from '../components/common/ButtonFloat'
import AttendanceCard from '../components/markets/AttendanceCard'
import SearchBar from '../components/common/SearchBar'
import DatePicker from 'react-native-datepicker'
//import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API

export default class MarketAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      searchInput: '',
      verifySubmit: false,
      viewDetails: false,

      mName: '',
      mDateStart: ''
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
    const {loading, searchInput, verifySubmit, viewDetails, mName, mDateStart } = this.state
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* submit */}
          { verifySubmit ? 
          (<View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{marginVertical: 10, marginHorizontal: 15}} onPress={() => this.setState({verifySubmit: true})}>
              <Text>YES, ADD IT</Text>
              <Icon name="add-event" />
            </Button>
            <Button style={{marginVertical: 10, marginHorizontal: 15}} onPress={() => this.setState({verifySubmit: false})}>
              <Text>WAIT - CANCEL</Text>
              <Icon name="add-event" />
            </Button>
          </View>)
          : (<View>
            <Button style={{marginVertical: 10, marginHorizontal: 15, borderWidth: 0.5, borderColor: colors.secondary}} onPress={() => this.setState({verifySubmit: true})}>
              <Text>ADD MARKET</Text>
              <Icon name="plus-button" />
            </Button>
          </View>) }


          {/* drop down details */}
          <TouchableOpacity onPress={() => this.setState({viewDetails: !viewDetails})} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 50, backgroundColor: colors.secondary, paddingHorizontal: 17}}>
            <Subtitle>Market Details</Subtitle>
            <Icon name={!viewDetails ? "down-arrow" : "up-arrow"}/>
          </TouchableOpacity>
          

          {/* details text in */}
          {!viewDetails ?
          (<View >
            <View style={styles.lineContainer}>
              <View style={{marginRight: 0}}>
                <Text>Name: </Text>
              </View>
              <TextInput
                placeholder={'Market Name'}
                onChangeText={(mName) => this.setState({mName})}
                style={styles.textInput}
                maxLength={35}
                value={mName}
              />
            </View>
            <View style={styles.lineContainer}>
              <View style={{marginRight: 0}}>
                <Text>Take Note: </Text>
              </View>
              <TextInput
                placeholder={'Take Note'}
                onChangeText={(mName) => this.setState({mName})}
                style={styles.textInput}
                maxLength={35}
                value={mName}
              />
            </View>

            <DatePicker
              style={{width: 200, height: 60, padding: 0, margin: 0}}
              date={mDateStart}
              mode="datetime"
              placeholder="select a date"
              format="MMM Do YYYY, h:mm a"
              minDate="2019-01-01"
              maxDate="2040-12-01"
              confirmBtnText="Select"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  marginLeft: 36, 
                  borderWidth: 0,
                  flexDirection: 'row', 
                  justifyContent: 'flex-start',
                  padding: 0, margin: 0
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(mDateStart) => {this.setState({mDateStart: mDateStart})}}
            />


            
          </View>)
          :
          (null)
          }
          
          {/* search */}
          <View>
            <SearchBar
              placeholder={'Find a Merchant'} 
              onChangeText={(searchInput) => this.setState({searchInput})}
              value={searchInput}/>
          </View>

          {/* cards */}
          <FlatList
            data={[{a: 'Market 1'}, {a : 'Market 2'}]}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderAttendance()}
            scrollEnabled={false}
            // isLoading={false}
            //ListEmptyComponent={<FlatlistError message={(isKite == 0 && surfAlertsEnabled) ? "No Surfable Spots Found" : (isKite == 1 && kiteAlertsEnabled) ? "No Surfable Spots Found" : "Activate Alerts"} noRetry={false}/>}
          />
        
        </ScrollView>
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _renderAttendance = () => {
    const navigation = this.props.navigation
    return (
      <AttendanceCard/>
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
    title: 'Links',
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg,
  },
  lineContainer: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  textInput: {
    backgroundColor: 'transparent', 
    height: 42, 
    paddingVertical: 0
  }
});
