import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
} from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import  Entypo  from 'react-native-vector-icons/Entypo';
import {AsyncStorage} from 'react-native';
const GLOBAL = require('../Global');

export default class Loginscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email   : '',
            password: '',
        };
    }

    // User-Login method
    onClickListener = async() => {
        let emailRegEx = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if(this.state.email === '' || this.state.password === '') {
            alert('Credentials cannot be empty');
        } else if(!emailRegEx.test(this.state.email)) {
            alert('Please enter a valid Email Address');
        } else if(this.state.password.length < 4) {
            alert('Password must contain atleast 4 characters');
        } else {
            fetch(GLOBAL.BASE_URL+"users/login/",{
                method:"POST",
                body:JSON.stringify({email:this.state.email,password:this.state.password}),
            })
                .then(res => res.json())
                .then(
                    async(result) => {
                        if(result.message==="Success"){
                            AsyncStorage.setItem("userid",result.userid.toString());
                            AsyncStorage.setItem("token",result.token);
                            this.props.navigation.navigate('Homee');
                        }
                        else{
                            alert("Invalid Username and password");
                        }
                    });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Icon name="email" size={32} style={{paddingLeft:20}} color="black" />
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
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>


                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
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
        borderBottomColor: '#FFFFFF',
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
        backgroundColor: "black",
    },
    loginText: {
        color: 'white',
    }
});
