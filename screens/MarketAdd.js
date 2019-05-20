import React from 'react';
import { View, StyleSheet, FlatList, ScrollView, KeyboardAvoidingView, RefreshControl } from 'react-native'
import { isTablet } from "../constants/platform";
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, Title, Icon, TextInput } from '@shoutem/ui'
import DatePicker from 'react-native-datepicker'
import SearchBar from '../components/common/SearchBar'
import AttendanceCard from '../components/markets/AttendanceCard'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import moment from 'moment'
//consts & comps
import LineInput from "../components/common/LineInput"
import LineView from "../components/common/LineView"
import ViewSwitch from "../components/common/ViewSwitch"
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
import layout from '../constants/layout'
import { HostID } from "../config/env"
import { incompleteFields, systemAlert } from "../services/systemAlerts"
//API
import { loadCreate, createMarket } from "../networking/nm_sfx_markets";
import ViewLoad from '../components/common/ViewLoad';

export default class MarketAdd extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      attendances: [],
      loadCreate: false,

      attendancesNew: [],
      loadingModal: false,

      name: '', 
      description: '', 
      takeNote: '', 
      setupStart: null, 
      marketStart: null, 
      marketEnd: null,
      verifySubmit: false,

      searchInput: ''
    }

    this.signal = axios.CancelToken.source()
  }
  

  componentDidMount = async () => {
    await this._fetchData()
  }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    const { navigation } = this.props
    let { verifySubmit, name, description, takeNote, setupStart, marketStart, marketEnd, searchInput, attendances, loading, loadCreate } = this.state
    return (
      <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80}>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          enabled={false}
        />
      }>

        <View style={styles.containerTop}>
          <View style={styles.containerTopSub}>
            <Title style={{color: colors.pWhite}}>Market Information</Title>
            { verifySubmit ? 
            (<View style={styles.submitContainer}>
              <Button style={styleConsts.button} onPress={() => loadCreate ? null : this._createMarket()}>
              <ViewSwitch hide={!isTablet}>
                <Text>CONFIRM</Text>
              </ViewSwitch>
              <ViewLoad hide={loadCreate}>
                <AntDesign name="check" size={22} style={{paddingHorizontal: 0}} />
              </ViewLoad>

              </Button>
              <Button style={styleConsts.button} onPress={() => loadCreate ? null : this.setState({verifySubmit: false})}>
                <ViewSwitch hide={!isTablet}>
                  <Text>CANCELL</Text>
                </ViewSwitch>
                <AntDesign name="close" size={22} />
              </Button>
            </View>)
            : (<View>
              <Button style={styleConsts.button} onPress={() => this.setState({verifySubmit: true})}>
                <ViewSwitch hide={!isTablet}>
                  <Text>CREATE</Text>
                </ViewSwitch>
                <Icon name="plus-button" />
              </Button>
            </View>) }
          </View>
        
        
          <LineInput title={'Name'}    value={name} onChange={(name) => this.setState({name})}/>
          <View style={styles.divider}/>
          <LineInput title={'Description'}    value={description}  maxLength={60} onChange={(description) => this.setState({description})}/>
          <View style={styles.divider}/>
          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Setup Start: </Text>
            </View>
            <DatePicker
              style={styles.datePicker}
              date={setupStart}
              mode="datetime"
              placeholder="--select a date--"
              format="MMM Do YYYY, h:mm a"
              minDate="2019-03-01"
              maxDate="2025-12-01"
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
              onDateChange={(setupStart) => { this.setState({setupStart})}}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Market Start: </Text>
            </View>
            <DatePicker
              style={styles.datePicker}
              date={marketStart}
              mode="datetime"
              placeholder="--select a date--"
              format="MMM Do YYYY, h:mm a"
              minDate="2019-03-01"
              maxDate="2025-12-01"
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
              onDateChange={(marketStart) => {this.setState({marketStart})}}
            />
          </View>
          <View style={styles.divider}/>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Market End: </Text>
            </View>
            <DatePicker
              style={styles.datePicker}
              date={marketEnd}
              mode="datetime"
              placeholder="--select a date--"
              format="MMM Do YYYY, h:mm a"
              minDate="2019-03-01"
              maxDate="2025-12-01"
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
              onDateChange={(marketEnd) => {this.setState({marketEnd})}}
            />
          </View>
          <View style={styles.divider}/>
          <LineInput title={'Take Note'}    value={takeNote}  maxLength={300} onChange={(takeNote) => this.setState({takeNote})}/>
         

          <View style={[styles.divider, {marginBottom: 8}]}/>
            <View style={styles.attendanceHeading}>
              <Title style={{color: colors.pWhite}}>Attendances</Title>
            </View>
          </View>
          
          <SearchBar
            placeholder={'Find a Merchant'} 
            onChangeText={ (searchInput) => this.setState({searchInput}) } // this._applySearch(searchInput)}
            value={searchInput}
          />

          <FlatList
            data={this._applySearch(attendances)}
            contentContainerStyle={styles.scrollContainer}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => this._renderAttendance(item)}
            scrollEnabled={false}
            removeClippedSubviews={true}
            initialNumToRender={30}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                enabled={false}
              />
            }/>
        </ScrollView>
        </KeyboardAvoidingView>
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _renderAttendance = (attendance = {}) => {
    return (
      <AttendanceCard isCreate={true} attendance={attendance} removeAttendance={this._removeAttendance}/>
      )
  }

  _createMarket = async () => {
    this.setState({ loadCreate: true })
    const { attendances, name, takeNote, description, setupStart, marketStart, marketEnd } = this.state
    let merchsIn = attendances.map((val, ind) => {
      return val.id
    })
    if(attendances.length == 0) {
      systemAlert('Content Required', 'A market must have at least one attendance.')
      this.setState({
        verifySubmit: false,
        loadCreate: false
      })
      return
    }
    if(name == '' || description == '' || setupStart == null || marketStart == null || marketEnd == null){
      incompleteFields()
      this.setState({
        verifySubmit: false,
        loadCreate: false
      })
      return
    }
    const createBody = {
      hostId: HostID,
      name: name,
      description: description,
      takeNote: takeNote,
      merchantIds: merchsIn,
      setupStart: moment(setupStart, "MMM Do YYYY, h:mm a"),
      marketStart: moment(marketStart, "MMM Do YYYY, h:mm a"),
      marketEnd: moment(marketEnd, "MMM Do YYYY, h:mm a")
    }
    const response = await createMarket(createBody, this.signal.token)
    if (response.code == 200) {
      await this.setState({ loadCreate: false, verifySubmit: false }) 
      this.props.navigation.goBack()
    } else {
      this.setState({
        errorMessage: response.data,
        verifySubmit: false,
        loadCreate: false
      })
    }
  }

  _applySearch = (attendances = []) => {
    const { searchInput } = this.state
    const query = searchInput.toLowerCase().replace(" ", "")
    return attendances.filter( item => {
      const standName = item.name.toLowerCase().replace(" ", "")
      return standName.includes(query)
     })
  }

  _removeAttendance = (id = '') => {
    let cAttendances = this.state.attendances
    let attendances = cAttendances.filter(function(att, index, arr) {
      return att.id != id
    })
    this.setState({attendances})
  }

  _fetchData = async () => {
    this.setState({ loading: true })
    const response = await loadCreate(HostID, this.signal.token)
    if (response.code == 200) {
      this.setState({
        attendances: response.data,
        loading: false
      }) 
    } else {
      this.setState({
        errorMessage: response.data,
        loading: false
      })
    }
  }

  static navigationOptions = {
    title: 'Links',
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pViewBg
  },
  containerTop: {
    width: '100%', 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  containerTopSub: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: colors.primary, 
    width: '100%', 
    padding: 10
  },
  scrollContainer: {
    paddingHorizontal: 10
  },
  attendanceHeading: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    height: 55, 
    backgroundColor: colors.primary, 
    width: '100%', 
    padding: 10
  },
  lineContainer: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 10, 
    borderColor: colors.secondary, 
    ...styleConsts.buttonBorder
  },
  datePicker: {
    width: 200,  
    padding: 0, 
    margin: 0,
    paddingHorizontal: 0, 
    marginHorizontal: 0, 
    flexDirection: 'column', 
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  submitContainer: {
    flexDirection: 'row', 
    justifyContent: 'center'
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
    marginLeft: 5
  },
})