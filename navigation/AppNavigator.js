import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignIn from '../screens/SignIn'


export default createSwitchNavigator({
  Main: MainTabNavigator,
  SignIn: SignIn,

})