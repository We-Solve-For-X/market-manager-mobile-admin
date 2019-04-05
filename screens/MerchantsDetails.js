import React from 'react';
import { View, StyleSheet, Switch, ActivityIndicator } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, DropDownMenu, Icon, TextInput } from '@shoutem/ui'
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
      merchant: {}
    }

    this.signal = axios.CancelToken.source()
  }

  componentDidMount = () => {
    this._fetchData()
  }

  render() {
    const { navigation } = this.props
    const { hostId, authId, status, isActive, repName, repSurname, repEmail, repCell, name, legalName, description, category, standId, priceBracket } = this.state.merchant
    //const { } = priceBracket

    return (
      <View style={styles.container}>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <Icon name="user-profile" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }], margin: 30 }}/>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15}}>
            <Text style={styles.text1} >{name ? name : null}</Text>
            <Text style={styles.text2}>{legalName ? legalName : null}</Text>
            <Text style={styles.text3}>{description ? description : null}</Text>
          </View>
        </View>

        <View style={styles.dividerBig}/>

          <DataHeading icon={'email'} title={'Owner Details'}/>
          <DataRow title={'name'} text={repName ? repName : null}/>
          <DataRow title={'surname'} text={repSurname ? repSurname : null}/>
          <DataRow title={'email'} text={repEmail ? repEmail : null}/>
          <DataRow title={'cell'} text={repCell ? repCell : null}/>

        <View style={styles.divider}/>

        <View style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
        <DataHeading icon={'settings'} title={'Merchant Status'}/>
        <View style={styles.lineContainer}>
          <View style={styles.titleBox}>
            <Text style={styles.text3}>{'Is Active: '}</Text>
          </View>
          {this.state.activateLoading ? 
            (<ActivityIndicator/>) : 
            (<Switch
              onValueChange={() => this._toogleState(isActive, 'id')}
              value={isActive}
              style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
              trackColor={{false: colors.pRed, true: colors.pGreen}}
            />)}
        </View>

            
        </View>
    
    
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  _toogleState = async (isActive = false) => {
    console.log('_toogleState')
    let id = this.state.id

    this.setState({activateLoading: true})
    const response = isActive ? await deactivate(id, this.signal.token) : await activate(id, this.signal.token)
    //console.log(response)
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
    console.log('res', response)
    if (response.code == 200) {
      this.setState({
        merchant: response.data,
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
        <Icon name={icon}/>
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
    width: '100%', 
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
