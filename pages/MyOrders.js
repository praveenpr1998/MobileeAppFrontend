import {NavigationEvents } from "react-navigation";
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import {AsyncStorage} from 'react-native';
import Modal from 'react-native-modal';
import Homeheading from "../components/homeHeading.js";
import { FlatList } from 'react-native-gesture-handler';
const GLOBAL = require('../Global');

export default class Loginscreen extends Component {
    state={
        allOrders:[],
        modalDisplaydata:[],
        isModalVisible:false
    }

    async componentDidMount(){
        fetch(GLOBAL.BASE_URL+"Orders?userid="+await AsyncStorage.getItem("userid"))
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({allOrders:result});
       
        })
    }

    displayOrders(){
        return(
                <View style={{flex:1}}>
                     <View style={styles.orderstext}>
                         <Text style={{fontSize:25,paddingTop:10,paddingBottom:10}}>Orders</Text></View>
           
                        <FlatList
                        data={this.state.allOrders}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=>(
                            <View style={{flexDirection:'row',height:70,marginTop:5,backgroundColor:'#fde2e2', borderWidth:1,borderColor: '#ddd'}}>
                                <View>
                                    <Text style={styles.ordertext} onPress={()=>{this.modalDisplay(item.orderid)}}>OrderId: {item.orderid}</Text>
                                    <Text style={styles.totaltext}>TotalAmount: ₹ {(item.totalamount)/100}</Text>
                                </View>  
                                <View style={{alignItems:'center',alignContent:'center'}}>
                                    <Text style={styles.date}> {item.date}</Text> 
                                    <Text style={{paddingLeft:40,paddingTop:10}}>{item.time}</Text>
                                </View>
                            </View>
                        )} />
                </View>
        )
    }

    modalDisplay(id){
        const clickedOrderdata=this.state.allOrders.filter((data)=>data.orderid===id);
        clickedOrderdata.map((data=>{
            this.setState({modalDisplaydata:data});

        }))
         this.setState({isModalVisible:true})
       
    }

    modalData(){
        return(
            <View style={{flex: 1,marginTop:150,marginLeft:10,backgroundColor:'white',height:'50%',marginBottom:250,width:300}}>
             
               <View style={{alignItems:'center'}}>
                   <Text styles={styles.detailstext}>Details</Text>
                   <Text style={styles.ordertext} >{this.state.modalDisplaydata.orderid}</Text></View>
                    <View style={{flexDirection:'row'}}>
                       <Text style={styles.totaltext}>TotalAmount: ₹ {(this.state.modalDisplaydata.totalamount)/100}</Text>
                      <Text style={styles.dateinModal}> {this.state.modalDisplaydata.date}</Text>
                    </View>
                  <View style={{flexDirection:'row'}}> 
                    <Text style={styles.paidby}>Paid By: {this.state.modalDisplaydata.method}</Text>
                     
                    {(this.state.modalDisplaydata.wallet!==null)?<Text style={styles.mode}>Wallet: {this.state.modalDisplaydata.wallet}</Text>:null}
                    {(this.state.modalDisplaydata.bank!==null)?<Text style={styles.mode}>Bank: {this.state.modalDisplaydata.bank}</Text>:null}
                     
                  </View>    
                <FlatList
                data={this.state.modalDisplaydata.items}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                     <View  style={{flexDirection:'row',height:60,backgroundColor:'white', borderWidth:1,borderColor: '#ddd'}} >
                        <View >
                            <Image
                                style={{marginTop:10,width: 60, height: 48}}
                                source={{uri: item.Link}}/></View>
                            <View >   
                                <Text style={styles.cardText}>{item.Name}</Text>
                                <Text style={styles.priceText}>PRICE: ${item.Price}</Text>
                            </View>
                            <View style={{paddingLeft:200,paddingTop:5,flexDirection:'row',position:'absolute'}}>
                                <Text>Quantity:{item.Quantity}</Text>  
                            </View>
                        </View>
                )}
                 />
                <Button title="OK" onPress={()=>{this.setState({isModalVisible:false})}} />
            </View>
        )
    }
    render(){
        
        //Navigations Events is used to retrieve the added items dynamically 
        //bcoz navigating the pages will not refresh the pages evrytime 
        //so it is required to be called whenever we navigate to a page  
        return(
            <View style={{flex:1}}>
                <NavigationEvents onDidFocus={async ()=>{   fetch(GLOBAL.BASE_URL+"Orders?userid="+await AsyncStorage.getItem("userid"))
                    .then(res => res.json())
                    .then(
                    (result) => {
        
                         this.setState({allOrders:result});
       
                     })}}   /> 

            <Homeheading navigation={this.props.navigation}/>

            {this.displayOrders()}
            <Modal isVisible={this.state.isModalVisible}>
            {this.modalData()}
            </Modal>
         </View>
        )
    }
}


const styles = StyleSheet.create({
ordertext:{
    fontSize:15 ,
    fontFamily:'Nunito-Bold',
    color:'#f78259',
    paddingLeft:12,
    paddingTop:12
},
totaltext:{
    fontSize:15 ,
    color:'#eb4559',
    paddingLeft:12,
    paddingTop:10,
    fontFamily:'Nunito-Bold'
   
},date:{
    paddingLeft:60,paddingTop:10
},
dateinModal:{
    paddingLeft:60,paddingTop:10
},
orderstext:{
alignContent:'center',
justifyContent:'center',
alignItems:'center'
},
cardText:{
    fontSize:17,
    fontWeight:'bold',
    fontFamily:'Teko-Bold'
  },
  priceText:{
    fontSize:13,
    paddingTop:8
    
  },
  detailstext:{
      fontSize:17,
      paddingBottom:10,
      fontFamily:'Teko-Bold'
  },
  paidby:{
    fontSize:15 ,
    color:'#eb4559',
    paddingLeft:12,
    paddingTop:10,
    fontFamily:'Nunito-Bold'
  },
  mode:{
    fontSize:15 ,
    color:'#eb4559',
    paddingLeft:60,
    paddingTop:10,
    fontFamily:'Nunito-Bold'
  }
})