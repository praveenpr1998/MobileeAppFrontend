import 'react-native-gesture-handler';
import React, { useState } from 'react';
import HomeScreen from "../src/Screens/HomeScreen.js";
import LoginScreen from "../src/Screens/LoginScreen.js";
import SignupScreen from "../src/Screens/SignupScreen.js";
import {  createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer,createSwitchNavigator } from 'react-navigation';
import Heading from "../src/components/HomeNav.js";

const StackNavigator=createStackNavigator({
    HomeScreen: {
    screen: HomeScreen,
    navigationOptions:({ navigation }) => ({
      header:()=>{null},
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions:({ navigation }) => ({
      headerLeft:()=>{null},
      headerTitle:()=><Heading navigation={navigation} />
  })
  },
  Signup:{
    screen: SignupScreen,
    navigationOptions:({ navigation }) => ({
      headerLeft:()=>{null},
      headerTitle:()=><Heading navigation={navigation} />
  })
  },
    })

    const StackNav = createAppContainer(StackNavigator);
    export default StackNav;
