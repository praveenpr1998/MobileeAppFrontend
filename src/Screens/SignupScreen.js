import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import  Entypo  from 'react-native-vector-icons/Entypo';
import  EvilIcons  from 'react-native-vector-icons/EvilIcons';
import {AsyncStorage} from 'react-native';
const GLOBAL = require('../../Global');

export default class Signupscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      username:'',
      visible:false
    }
  }

  onClickListener = (viewId) => {
    let emailRegEx = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if(this.state.email === '' || this.state.password === '') {
        alert('Credentials cannot be empty');
    } else if(!emailRegEx.test(this.state.email)) {
        alert('Please enter a valid Email Address');
    } else if(this.state.password.length < 4) {
        alert('Password must contain atleast 4 characters');
    } else {
     this.setState({ visible: true }, () => {
       fetch(GLOBAL.BASE_URL+"users/signup/",{
      method:"POST",
      body:JSON.stringify({email:this.state.email,password:this.state.password,name:this.state.username}),
      })
      .then(res => res.json())
      .then(
      async(result) => {
        if(result.message==="Success"){
          this.setState({visible: false})
          this.props.navigation.navigate('Homee');
        }
        else if("Exists"){
          alert("Email Already exists");
        }
            })
       })
          }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <EvilIcons name="user" size={32} style={{paddingLeft:20}} color="black" />
          <TextInput style={styles.inputs}
              placeholder="UserName"
              onChangeText={(username) => this.setState({username})}/>
        </View>
        <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={32} style={{paddingLeft:20}} color="black" />
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.inputContainer}>
        <Entypo name="key" size={32} style={{paddingLeft:20}} color="black" />
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}/>
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableHighlight>
         {this.state.visible?<View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff"/>
              </View>:null}
        <View style={{flexDirection:'row'}}>
        <Text>Already a Customer ?</Text>
        <TouchableHighlight  onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={{color:'red'}}>  Login</Text>
        </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBAL.Styling.Colors.containerBackground,
  },
  inputContainer: {
      borderBottomColor: GLOBAL.Styling.Colors.inputContainerBorder,
      backgroundColor: GLOBAL.Styling.Colors.inputContainerBackground,
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: GLOBAL.Styling.Colors.textInputBorder,
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: GLOBAL.Styling.Colors.buttonBackground,
  },
  loginText: {
    color: GLOBAL.Styling.Colors.buttonText,
  },
 loader:{}
});
