import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import ButtonFloat from '../components/common/ButtonFloat'
import { Text, Button, DropDownMenu, TextInput } from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons'
import ViewLoad from "../components/common/ViewLoad"
import axios from 'axios'
import { asGet } from "../services/asyncStorage/asApi"
import { ProfileCnsts } from "../services/asyncStorage/asConsts"
//consts & comps
import { HostID } from "../config/env";
import colors from '../constants/colors'
import styleConsts from '../constants/styleConsts'
//API
import { sendMessage, loadSend } from "../networking/nm_sfx_communication"
import { sendMessageError, incompleteFields} from "../services/systemAlerts"

export default class CommunicationNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      toOptions: [],
      fromId: null, 
      fromName: null,
      sending: false,
      toSelected: null,
      topic: null,
      text: null
    }
    this.signal = axios.CancelToken.source()
  }

  componentDidMount = async () => {
    let administratorId = await asGet(ProfileCnsts.adminstId)
    let userName = await asGet(ProfileCnsts.username)
    await this.setState({fromId: administratorId, fromName: userName})
    this._fetchData()
  }

  componentWillUnmount() {
    this.signal.cancel('API request canceled due to componentUnmount')
  }

  render() {
    const { navigation } = this.props
    const { toOptions, toSelected, fromName, fromId, topic, text, sending, loading } = this.state
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20} style={styles.container}>
        <View style={styles.topFields}>

          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>To: </Text>
            </View>
            <DropDownMenu
              options={toOptions}
              selectedOption={toSelected ? toSelected : toOptions[0]}
              onOptionSelected={(selected) => this.setState({ toSelected: selected })}
              titleProperty="description"
              visibleOptions={5}
            />
          </View>
          <View style={styles.divider}/>
          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>From: </Text>
            </View>
            <TextInput
              style={styles.textInput}
              defaultValue={fromName}
              editable={false}
            />
          </View>
          <View style={styles.divider}/>
          <View style={styles.lineContainer}>
            <View style={styles.titleBox}>
              <Text>Topic: </Text>
            </View>
            <TextInput
              placeholder={'Message Topic'}
              onChangeText={(topic) => this.setState({topic})}
              style={styles.textInput}
              maxLength={28}
              value={topic}
            />
          </View>
          <View style={styles.divider}/>
          <View style={styles.buttonContainer}>
            <Button 
              style={styles.sendButton} 
              onPress={() => {sending || loading ? null : this._sendMessage(topic, text, fromId, fromName, toSelected)}}>
              <Text>SEND</Text>
              <ViewLoad hide={(sending || loading)}>
                <Ionicons name="ios-send" size={22} />
              </ViewLoad>
            </Button>
          </View>
        </View>

        <View style={styles.messageContainer}>
          <TextInput
            placeholder={'Compose message..'}
            style={styles.messageInput}
            onChangeText={(text) => this.setState({text})}
            multiline = {true}
            value={text}
          />
        </View>

        <ButtonFloat navigation={navigation}/>
      </KeyboardAvoidingView>
    )
  }

  _sendMessage = async (topic = '', text = '', fromId = '', fromName = '', toSelected = {recipientType: "ERROR", recipientId: '', description: ''}) => {
    this.setState({sending: true})
    if(topic == null || text == null || fromId == null || fromName == null || toSelected.recipientType == "ERROR" ) {
      incompleteFields()
      this.setState({sending: false})
      return
    }
    let message = {topic, text, fromId, fromName, recipientType: toSelected.recipientType, recipientId: toSelected.recipientId, description: toSelected.description}
    const response = await sendMessage(message, this.signal.token)
    if (response.code == 200) {
      this.setState({sending: false})
      this.props.navigation.goBack()
    } else {
      this.setState({sending: false})
      sendMessageError()
    }
    
  }

  _fetchData = async () => {
    this.setState({ loading: true })
    const response = await loadSend(HostID, this.signal.token)
    if (response.code == 200) {
      this.setState({
        toOptions: response.data,
        toSelected: response.data[0],
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
    backgroundColor: colors.pViewBg,
    paddingHorizontal: 10
  },
  topFields: {
    width: '100%', 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  buttonContainer: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  sendButton: {
    marginVertical: 10, 
    marginHorizontal: 15, 
    ...styleConsts.buttonBorder, width: 115
  },
  messageContainer: {
    flex: 1, 
    flexDirection: 'row'
  },
  messageInput: {
    height: '100%', 
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    width: '100%'
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
    width: '100%'
  },
  titleBox: {
    width: 50,
    marginLeft: 12
  }
});
