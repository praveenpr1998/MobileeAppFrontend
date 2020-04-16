import React, { Component } from 'react';
import { Image, View, Text, AsyncStorage,StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import AnimatedLoader from "react-native-animated-loader";

export default class Homescreen extends Component {
  state={visible:true}
async componentDidMount(){
    setTimeout (
      async ()=>{
        if(await AsyncStorage.getItem("userid")===null){
          this.setState({visible:false})
        this.props.navigation.navigate('Login')
      }
        else{
          this.props.navigation.navigate('Homee')  
          this.setState({visible:false})        }
      },2*1000
    );
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:"black",alignItems:'center'}}>
        <Image
                style={{width: 150, height: 158,marginTop:250}}
                source={{uri:"https://graphicriver.img.customer.envatousercontent.com/files/270440720/CartoonDogPointer%20p.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=d7ccf47eef9f9a8f679c134cc70bffa5"}} />
        <Text style={{color:"white",fontSize:30,marginTop:0}}>Testing</Text>
        
        <AnimatedLoader
        visible={this.state.visible}
        source={require("../assets/11625-typing-indicator.json")}
        animationStyle={styles.lottie}
        speed={1}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
    marginTop:150,
    
  }
});