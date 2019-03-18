import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignIn from '../screens/SignIn'
import MarketDetails from '../screens/MarketDetails'

export default createSwitchNavigator({
  Main: MainTabNavigator,
  SignIn: SignIn,

})