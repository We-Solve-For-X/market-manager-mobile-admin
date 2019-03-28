import React from 'react';
import { View, StyleSheet } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, DropDownMenu, Icon, TextInput } from '@shoutem/ui'
//import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API
import { merchant1 } from "../networking/stubs";

export default class MerchantsDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fromName: '',
      toName: '',
      topic: '',
      text: '',
    }
  }

  componentDidMount = () => {
    //this._fetchData()
  }

  render() {
    const { navigation } = this.props
    const { } = this.state
    const { id, hostId, authId, status, isActive, name, surname, email, cell, standName, businessName, standDescription} = merchant1

    return (
      <View style={styles.container}>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <Icon name="user-profile" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }], margin: 30 }}/>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15}}>
            <Text style={styles.text1} >{standName}</Text>
            <Text style={styles.text2}>{businessName}</Text>
            <Text style={styles.text3}>{standDescription}</Text>
          </View>
        </View>

        <View style={styles.dividerBig}/>

          <DataHeading icon={'email'} title={'Owner Details'}/>
          <DataRow title={'name'} text={name}/>
          <DataRow title={'surname'} text={surname}/>
          <DataRow title={'email'} text={email}/>
          <DataRow title={'cell'} text={cell}/>

        <View style={styles.divider}/>
    
    
        <ButtonFloat navigation={navigation}/>
      </View>
    )
  }

  

  _fetchData = async () => {
    console.log("fetching data")
    const { id, topic, text, fromId, fromName, toType, toName, toId} = message1
    
    this.setState({
      fromName,
      toName,
      topic,
      text,
    })
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
});
