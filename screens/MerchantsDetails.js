import React from 'react';
import { View, StyleSheet, Switch, ActivityIndicator, Picker } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, DropDownMenu, TextInput } from '@shoutem/ui'
import { EvilIcons, FontAwesome } from '@expo/vector-icons'
import ViewLoad from "../components/common/ViewLoad"
import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API
import { merchant1 } from "../networking/stubs";
import { activate, deactivate, getMerch } from "../networking/nm_sfx_merchants";

export default class MerchantsDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      activateLoading: false,
      merchant: {},
      priceZoneBrackets: []
    }

    this.signal = axios.CancelToken.source()
  }

  componentDidMount = () => {
    this._fetchData()
  }

  render() {
    const { navigation } = this.props
    const { merchant } = this.state
    const { repName, repSurname, repEmail, repCell, name, legalName, description } = merchant
    const { isActive, hostId, authId, status, category, standId, priceZone } = merchant

    return (
      <View style={styles.container}>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <EvilIcons name="cart" size={60} style={{marginLeft: 10}}/>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15}}>
            <Text style={styles.text1} >{name ? name : null}</Text>
            <Text style={styles.text2}>{legalName ? legalName : '(no legal name)'}</Text>
            <Text style={styles.text3}>{description ? description : null}</Text>
          </View>
        </View>

        <View style={styles.dividerBig}/>

          <DataHeading icon={'user'} title={'Representative'}/>
          <DataRow title={'name'} text={repName ? repName : null}/>
          <DataRow title={'surname'} text={repSurname ? repSurname : null}/>
          <DataRow title={'email'} text={repEmail ? repEmail : null}/>
          <DataRow title={'cell'} text={repCell ? repCell : null}/>

        <View style={styles.divider}/>

        <DataHeading icon={'pencil'} title={'Meta'}/>
          <DataRow title={'status'} text={status ? status : null}/>
          <DataRow title={'category'} text={category ? category : null}/>
          <DataRow title={'stand'} text={standId ? standId : '(no stand id)'}/>

        <View style={styles.divider}/>

        <View style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
          <DataHeading icon={'gear'} title={'Settings'}/>
          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text style={styles.text3}>{'Is Active: '}</Text>
            </View>
            <ViewLoad hide={this.state.activateLoading}>
              <Switch
                onValueChange={() => this._toogleState(isActive, 'id')}
                value={isActive}
                style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                trackColor={{false: colors.pRed, true: colors.pGreen}}
              />
            </ViewLoad>
          </View>
          <DataRow title={'price zone'} text={priceZone ? priceZone.name : null}/>
        </View>

        <View style={styles.divider}/>

        {/* <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 100}}
          mode={'dropdown'}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker> */}
  
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _toogleState = async (isActive = false) => {
    let id = this.state.id
    this.setState({activateLoading: true})
    const response = isActive ? await deactivate(id, this.signal.token) : await activate(id, this.signal.token)
    if (response.code == 200) {
      await this._fetchData()
      this.setState({
        activateLoading: false,
      }) 
    } else {
      this.setState({
        errorMessage: response.data,
        loading: false
      })
    }
  }

  _fetchData = async () => {
    const idIn = this.props.navigation.state.params.id
    this.setState({ loading: true, id: idIn })
    const response = await getMerch(idIn, this.signal.token)
    if (response.code == 200) {
      this.setState({
        merchant: response.data.merchant,
        priceZoneBrackets: response.data.priceZoneBrackets,
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

const DataHeading = ({ icon, title }) => {
  return(
    <View style={styles.lineContainer}>
      <View style={styles.headingBox}>
        <EvilIcons name={icon} size={30}/>
      </View>
      <Text style={styles.text2}>{title}</Text>
    </View>
  )
}

const DataRow = ({ title, text }) => {
  return(
    <View style={styles.lineContainer}>
      <View style={styles.titleBox}>
        <Text style={styles.text3}>{title}</Text>
      </View>
      <Text style={styles.text3}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.pViewBg,
    paddingHorizontal: 8
  },
  lineContainer: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    marginVertical: 2
  },
  dividerBig: {
    width: '100%', 
    height: 3, 
    backgroundColor: colors.secondary,
    marginVertical: 5
  },
  divider: {
    width: '97%', 
    height: 2, 
    backgroundColor: colors.secondary,
    marginVertical: 5
  },
  titleBox: {
    width: 100,
    marginLeft: 12,
    
  },
  headingBox: {
    width: 100,
    marginLeft: 12,
    marginBottom: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    paddingVertical: 2
  },
  text2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.primary,
    paddingVertical: 2
  },
  text3: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    paddingVertical: 2
  },
  isActiveText: {
    fontSize: 15,
    color: colors.pWhite
  },
});
