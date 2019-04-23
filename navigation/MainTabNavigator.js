import React from 'react'
import { Easing, Animated, Text } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator, TransitionConfig } from 'react-navigation'
import colors from '../constants/colors'
import { isTablet } from "../constants/platform"
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'
import Home from '../screens/Home'
import Markets from '../screens/Markets'
import MarketDetails from '../screens/MarketDetails'
import MarketAdd from '../screens/MarketAdd'
import Merchants from '../screens/Merchants'
import MerchantsDetails from '../screens/MerchantsDetails'
import Communication from '../screens/Communication'
import CommunicationNew from '../screens/CommunicationNew'
import CommunicationView from '../screens/CommunicationView'
import HeaderScreen from '../components/common/HeaderScreen'

const HomeStack = createStackNavigator({
  Home: Home,
})
HomeStack.navigationOptions = {
  tabBarLabel:"Home Page",
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons name="home-outline" size={22} color={colors.pWhite}/>
  )
}

const MarketsStack = createStackNavigator({
  Markets: Markets,

})
MarketsStack.navigationOptions = {
  tabBarLabel: 'Markets',
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="shoppingcart" size={22} color={colors.pWhite}/>
  )
}

const MerchantsStack = createStackNavigator({
  Merchants: Merchants,
})
MerchantsStack.navigationOptions = {
  tabBarLabel: 'Merchants',
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="user" size={22} color={colors.pWhite}/>
  )
}

const CommunicationStack = createStackNavigator({
  Communication: Communication,
})
CommunicationStack.navigationOptions = {
  tabBarLabel: 'Communication',
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons name="mail-outline" size={22} color={colors.pWhite}/>
  )
}

const PrimaryNavConfig = {
  initialRouteName: 'HomeStack',
  lazy: 'true',
  tabBarOptions:{
    showIcon: true,
    showLabel: false,
    indicatorStyle:{
        backgroundColor: colors.pGrey
    },
    style:{
        backgroundColor: colors.primary
    }
  }
  
}
const MainTabNav = createMaterialTopTabNavigator({
  HomeStack,
  MarketsStack,
  MerchantsStack,
  CommunicationStack
}, PrimaryNavConfig)


const stackNavConfig = {
  //initialRouteName: 'CommunicationView',
  headerMode: 'screen',
  mode: 'card',
  defaultNavigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 450,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
  }),
}
const MainStack = createStackNavigator({
  MainTabNav: {
    screen: MainTabNav,
    navigationOptions: () => ({
      title: `Irene Market Manager`,
      header: (<HeaderScreen title={'Market Manager'}/>),
      headerBackTitle: null
    }),
  },
  //MainTabNav: MainTabNav,
  MerchantsDetails: {
    screen: MerchantsDetails,
    navigationOptions: () => ({
      title: `Merchants Details`,
      header: (<HeaderScreen title={'Merchant Details'}/>),
      headerBackTitle: null
    }),
  },
  //MerchantsDetails: MerchantsDetails,
  //MarketDetails: MarketDetails,
  MarketDetails: {
    screen: MarketDetails,
    navigationOptions: () => ({
      title: `Market Details`,
      header: (<HeaderScreen title={'Market Details'}/>),
      headerBackTitle: null
    }),
  },
  //MarketAdd: MarketAdd,
  MarketAdd: {
    screen: MarketAdd,
    navigationOptions: () => ({
      title: `Add Market`,
      header: (<HeaderScreen title={'Create New Market'}/>),
      headerBackTitle: null
    }),
  },
  //CommunicationNew: CommunicationNew,
  CommunicationNew: {
    screen: CommunicationNew,
    navigationOptions: () => ({
      title: `New Message`,
      header: (<HeaderScreen title={'New Message'}/>),
      headerBackTitle: null
    }),
  },
  //CommunicationView: CommunicationView,
  CommunicationView: {
    screen: CommunicationView,
    navigationOptions: () => ({
      title: `View Message`,
      header: (<HeaderScreen title={'View Message'}/>),
      headerBackTitle: null
    }),
  },
}, stackNavConfig)

export default MainStack