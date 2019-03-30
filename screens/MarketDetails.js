import React from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, Title, Icon, TextInput } from '@shoutem/ui'
import DatePicker from 'react-native-datepicker'
import SearchBar from '../components/common/SearchBar'
import AttendanceCard from '../components/markets/AttendanceCard'
//import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
import layout from '../constants/layout'
//API
import { merchantsApproved } from "../networking/stubs";

export default class MarketDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      merchants: [],
      merchantsDisp: [],


      searchInput: ''
    }
  }
  

  componentDidMount = () => {
    this._fetchData()
  }

  // componentWillUnmount() {
  //   this.signal.cancel('API request canceled due to componentUnmount')
  // }

  render() {
    const { navigation } = this.props
    const { verifySubmit, name, description, takeNote, setupStart, marketStart, marketEnd, searchInput, merchantsDisp } = this.state

    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={{width: '100%', flexDirection: 'column', alignItems: 'center'}}>

        <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: colors.primary, width: '100%', padding: 10}}>
          <Title style={{color: colors.pWhite}}>Market Information</Title>
        </View>
        
        <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Name: </Text>
            </View>
            <TextInput
              placeholder={'Short name for the market instance'}
              //onChangeText={(name) => this.setState({name})}
              style={styles.textInput}
              maxLength={28}
              value={'name'}
              editable={false}
            />
          </View>

          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Description: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={'description of the market'}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Attendances: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={'163'}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Payments: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={'140 (23)'}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Setup Start: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={'12 April 2019 05:00'}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Market Start: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={'12 April 2019 08:00'}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Market End: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={'12 April 2019 15:00'}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>

          <View style={[styles.lineContainer, {height: 110}]}>
            <View style={styles.titleBox}>
              <Text>Take Note: </Text>
            </View>
            <TextInput
              placeholder={'Description of the market instance'}
              onChangeText={(description) => this.setState({description})}
              style={styles.textInput}
              maxLength={28}
              value={'Information that is relevant to the merchants will be displayed here. '}
              editable={false}
            />
          </View>

          <View style={[styles.divider, {marginBottom: 8}]}/>

          <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: colors.primary, width: '100%', padding: 10}}>
            <Title style={{color: colors.pWhite}}>Attendances</Title>
          </View>

          </View>
          <SearchBar
            placeholder={'Find a Merchant'} 
            onChangeText={ (searchInput) => this._applySearch(searchInput)}
            value={searchInput}
          />

          <FlatList
            data={merchantsDisp}
            //keyExtractor={(item) => item.spotSummary.spotId}
            renderItem={({item}) => this._renderAttendance(item)}
            scrollEnabled={false}
            removeClippedSubviews={true}
            initialNumToRender={30}
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
      <AttendanceCard isCreate={false}/>
      )
  }

  _applySearch = (searchInput) => {
    this.setState({searchInput})
    const { merchants } = this.state
    const query = searchInput.toLowerCase().replace(" ", "")
    const merchantsDisp = merchants.filter(item => {
      const standName = item.standName.toLowerCase().replace(" ", "")
      return standName.includes(query)
     })

     this.setState({merchantsDisp})
  }

  _fetchData = async () => {
    console.log("fetching data")
    this.setState({merchants: merchantsApproved, merchantsDisp: merchantsApproved})
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
    paddingHorizontal: 10,
  },
  lineContainer: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  divider: {
    width: '98%', 
    height: 1, 
    backgroundColor: colors.pBlack
  },
  textInput: {
    backgroundColor: 'transparent', 
    height: 42, 
    paddingVertical: 0,
    width: '90%'
  },
  titleBox: {
    width: 95,
    marginLeft: 12
  },
})