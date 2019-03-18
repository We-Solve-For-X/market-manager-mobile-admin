import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import colors from '../constants/colors'

import TabBarIcon from '../components/TabBarIcon'

import Home from '../screens/Home'
import Markets from '../screens/Markets'
import MarketDetails from '../screens/MarketDetails'
import MarketPayments from '../screens/MarketPayments'
import Merchants from '../screens/Merchants'
import MerchantsManage from '../screens/MerchantsManage'
import Communication from '../screens/Communication'

const HomeStack = createStackNavigator({
  Home: Home,
})
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

const MarketsStack = createStackNavigator({
  Markets: Markets,

})
MarketsStack.navigationOptions = {
  tabBarLabel: 'Markets',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

const MerchantsStack = createStackNavigator({
  Merchants: Merchants,

})
MerchantsStack.navigationOptions = {
  tabBarLabel: 'Merchants',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

const CommunicationStack = createStackNavigator({
  Communication: Communication,
})
CommunicationStack.navigationOptions = {
  tabBarLabel: 'Communication',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

const PrimaryNavConfig = {
  initialRouteName: 'HomeStack',
  lazy: 'true',
  tabBarOptions:{
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
},
PrimaryNavConfig
)


const MainStack = createStackNavigator({
  MainTabNav: MainTabNav,
  MerchantsManage: MerchantsManage,
  MarketDetails: MarketDetails,
  MarketPayments: MarketPayments
})

export default MainStack