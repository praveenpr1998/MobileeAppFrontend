import 'react-native-gesture-handler';
import React, { useState } from 'react';
import HomeScreen from "../pages/homeScreen.js";
import LoginScreen from "../pages/loginScreen.js";
import SignupScreen from "../pages/signupScreen.js";
import {  createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer,createSwitchNavigator } from 'react-navigation';
import Heading from "../components/homeNav.js";

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