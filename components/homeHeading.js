import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import  EvilIcons  from 'react-native-vector-icons/EvilIcons';
import  Entypo  from 'react-native-vector-icons/Entypo';

export default class homeHeading extends Component {
  

  render() {
    return (

      <View style={styles.header}>
        <View style={{flexDirection:'row',paddingTop:15}}>
        <View>
        <EvilIcons name="navicon" size={30}  onPress={()=>{this.props.navigation.openDrawer()}} /></View>
        <View>
        <Text style={styles.brandname}>ShoppingCart</Text></View>
        <TouchableOpacity >
        <Entypo name="shopping-cart" onPress={()=>{this.props.navigation.navigate('Cartt')}} size={30} style={{paddingLeft:140}}  />
        </TouchableOpacity>
        </View>
    
      </View>
    )
  }
}
const styles=StyleSheet.create({
    header:{
        height:'8%',
        flexDirection:'row',
        backgroundColor:'#d3f4ff'
        
    },
    brandname:{
        fontSize:27,
        paddingLeft:10,
        fontWeight:'bold',
        fontFamily:'Teko-Bold'
      
    },
})