import React from 'react';
import { StyleSheet, View, ImageBackground, AsyncStorage, KeyboardAvoidingView } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Constants } from 'expo'
import imagesRef from '../assets/imagesRef'
import { Button, } from "@shoutem/ui"
import { Text, Icon } from "@shoutem/ui"
import { TextInput } from "@shoutem/ui"
import { connectStyle } from '@shoutem/theme'

//import axios from 'axios'
//consts & comps
import colors from '../constants/colors'
import layout from '../constants/layout'
//API

//import { TextInput ,Button , Switch} from 'react-native-paper'

const appVersion = Constants.manifest.version

class SignIn extends React.Component {
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
    //const styles = this.props.style
    return (
      <ImageBackground
      source={imagesRef.signInBG}
      imageStyle={{opacity: 0.9}}
      style={styles.container}
      resizeMode={'cover'}
      > 
      {/* <NavigationEvents
        onDidFocus={() => {this.executeLanding()}}
      /> */}
      <KeyboardAvoidingView behavior="padding" style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
      <View style={{
        width: '60%', 
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'space-between'}}>
        
        <View style={{flex: 2, flexDirection: 'column', justifyContent: 'center'}}>
          <Icon name="home" style={{size: 30}}/>
        </View>

        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
          <TextInput
          placeholder={'Email'}
          //onChangeText={...}
        />
        <TextInput
          placeholder={'Password'}
          secureTextEntry
        />
        </View>

        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
          <Button styleName="secondary"  kind='squared' onPress={this._signInAsync}>
            <Text>SIGN IN</Text>
          </Button>
        </View>





      </View>


        
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }

  _signInAsync = async () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
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
    title: 'SignIn',
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: colors.pViewBg,
    opacity: 0.99
  },
});


export default connectStyle('com.example.AvatarItem', styles)(SignIn);



