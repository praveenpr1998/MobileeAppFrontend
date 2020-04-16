import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity,Image,Button, View, Text,ScrollView,SafeAreaView, AsyncStorage } from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  AntDesign  from 'react-native-vector-icons/AntDesign';

import Home from "../pages/productsPage.js";
import cartPage from "../pages/cartPage.js";
import Login from "../pages/loginScreen.js";
import MyOrders from "../pages/MyOrders.js";
import { Avatar } from 'react-native-elements';

import { createDrawerNavigator } from 'react-navigation-drawer';
import {  createAppContainer,StackActions,NavigationActions } from 'react-navigation';
import { cos } from 'react-native-reanimated';
const GLOBAL = require('../Global');

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

//let user -- to store the username for  displaying in drawer navigator
let user;

 async function findname (){
   
   fetch(GLOBAL.BASE_URL+"users/finduser/",{
      method:"POST",
      body:JSON.stringify({userid:await AsyncStorage.getItem("userid")}),
    })
   .then(res => res.json())
   .then(
     (result) => {
        user=result;
       }) 
}
const DrawerWithLogoutButton=(props)=>{
    {findname()}
    return(
      
        <ScrollView contentContainerStyle={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between' }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={{height:130,paddingLeft:20,paddingTop:20,flexDirection:'row',backgroundColor:'#d3f4ff'}}>
              <Avatar size="large" rounded icon={{ name: 'home' }} />
              <Text style={styles.username}>{user}</Text>
              <TouchableOpacity onPress={()=>{props.navigation.closeDrawer()}} style={{paddingLeft:40,paddingBottom:40}}>           
                   <AntDesign name="closesquare" size={32}   color="black" />
               </TouchableOpacity>
            </View>
            <TouchableOpacity style={{paddingTop:30}} onPress={()=>{props.navigation.navigate('Homee')}}>
              <Text style={{fontSize:20,paddingLeft:20}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingTop:30}} onPress={()=>{props.navigation.navigate('Cartt')}}>
              <Text style={{fontSize:20,paddingLeft:20}}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingTop:30}} onPress={()=>{props.navigation.navigate('MyOrders')}}>
              <Text style={{fontSize:20,paddingLeft:20}}>MyOrders</Text>
            </TouchableOpacity>
        </SafeAreaView>
          <TouchableOpacity onPress={()=>{AsyncStorage.removeItem("userid");props.navigation.dispatch(resetAction);}}>
            <View style={styles.item}>
              <Text style={styles.label}>Logoutt</Text>
              <MaterialCommunityIcons name="logout" size={32} style={{paddingLeft:20}}  color="black" />
            </View>
          </TouchableOpacity>
      </ScrollView>
    )
}

const DrawerNavigation =createDrawerNavigator({

  Homee:{
    screen:Home,

  },
  Login:{
    screen:Login,
  },
  Cartt:{
    screen:cartPage,
  },
  MyOrders:{
    screen:MyOrders,
  }
},
  {
    contentComponent:DrawerWithLogoutButton,
    });

    const DrawerNav = createAppContainer(DrawerNavigation);
    const styles = StyleSheet.create({
        item: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          label: {
            paddingRight:20,
            margin: 16,
            fontSize:20,
            fontWeight: 'bold',
            color: 'rgba(0, 0, 0, .87)',
          },
          iconContainer: {
            marginHorizontal: 16,
            width: 24,
            alignItems: 'center',
          },
          icon: {
            width: 24,
            height: 24,
          },
          username:{
            fontSize:25,
            fontFamily:'Teko-Bold',
            paddingLeft:20,
            paddingTop:25,
            alignContent:'center',
            color:"#ffaaa5"
          }
      });
    export default DrawerNav;