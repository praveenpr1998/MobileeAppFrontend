import {NavigationEvents } from "react-navigation";
import Modal from 'react-native-modal';
import React , {Component} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {
    StyleSheet,
    Text,
    View,
    CheckBox,
    TextInput,
    Button,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    TouchableOpacityBase
  } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import {AsyncStorage} from 'react-native';
import Homeheading from "../components/homeHeading.js";
const GLOBAL = require('../Global');

  export default class cartPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
          orderId:"",
          isModalVisible:false,
          allData:[],
          allProducts: [],
          totalAmount:"0",
        }
    }

    //remove item in cart by making req to server with product id and userid
    async removeItem(id){
      fetch(GLOBAL.BASE_URL+"cartitems/remove/",{
      method:"POST",
      body:JSON.stringify({productId:id,userid:await AsyncStorage.getItem("userid")}),
      })
      .then(res => res.json())
      .then(
      (result) => {
         this.setState({allProducts:result});
         this.totalAmount()
       })  
    }

    
    //increment item in cart by making req to server with product id and userid
    async increment(id){
      fetch(GLOBAL.BASE_URL+"cartitems/increment/",{
        method:"POST",
        body:JSON.stringify({productId:id,userid:await AsyncStorage.getItem("userid")}),
      })
     .then(res => res.json())
     .then(
       (result) => {
        this.setState({allProducts:result});
        this.totalAmount();  
         })  
    }

    
    //decrement item in cart by making req to server with product id and userid
   async decrement(id){
      fetch(GLOBAL.BASE_URL+"cartitems/decrement/",{
        method:"POST",
        body:JSON.stringify({productId:id,userid:await AsyncStorage.getItem("userid")}),
      })
     .then(res => res.json())
     .then(
       (result) => {
        this.setState({allProducts:result});
        this.totalAmount()
    })      
    }

    //getting the totalAmount of cart 
    async totalAmount(){
      fetch(GLOBAL.BASE_URL+"cartitems/totalAmount",{
        method:"POST",
        body:JSON.stringify({userid:await AsyncStorage.getItem("userid")})
      })
     .then(res => res.json())
     .then(
       (result) => {
         this.setState({totalAmount:result})
       }) 
    }

    //allProducts -- all the items added in the cart 
    //data -- all the products 
    async componentDidMount(){
        fetch(GLOBAL.BASE_URL+"cartitems?userid="+await AsyncStorage.getItem("userid"))
   .then(res => res.json())
   .then(
     (result) => {
    
       this.setState({allProducts:result});
       this.totalAmount()
     })

     fetch(GLOBAL.BASE_URL+"products/")
        .then(res => res.json())
        .then(
        (result) => {
          this.setState({data:result})
        })
  }
  
  //oncick to payment and checkout
  //getting the order api and and initiating payment 
    orderplaced(){
      fetch(GLOBAL.BASE_URL+"Orders/orderid/",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({totalamount:this.state.totalAmount}),
      })
     .then(res => res.json())
     .then(
       (result) => {
         if(result.message !== "Success"){
          alert("Unauthorized Usage Need to Login again");     
         }
         else{
           this.setState({orderid:result.id})
           var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_wwfPnacJ10szIa',
            amount: '5000',
            name: 'Shopping Cart',
            order_id:this.state.orderid,
            prefill: {
              email: '',
              contact: '',
              name: ''
            },
            theme: {color: '#F37254'}
          }
          var today=new Date();
          var dd=String(today.getDate()).padStart(2,'0');
          var mm=String(today.getMonth()+1).padStart(2,'0');
          var yyyy=today.getFullYear();
          today=mm + '/' + dd +'/' +yyyy;
          
          var todayy=new Date();
          var time = todayy.getHours() + ":" + todayy.getMinutes() + ":" + todayy.getSeconds();
         
          return(
            RazorpayCheckout.open(options).then(async (data) => {
            
              //generating a order api  
              fetch(GLOBAL.BASE_URL+"Orders/add/",{
                method:"POST",
                headers:{
                  'Content-Type':'application/json'
                },
              body:JSON.stringify({orderid:data.razorpay_payment_id,date:today,time:time,paymentid:data.razorpay_order_id,signature:data.razorpay_signature,totalamount:this.state.totalAmount,items:this.state.allProducts,userid:await AsyncStorage.getItem("userid")}),
              })
              .then(res => res.json())
              .then(
                (result) => {
                 
              });

          //remove the items of placed order frm cartitems model in backend
            fetch(GLOBAL.BASE_URL+"cartitems/itemsremoval/",{
               method:"POST",
               body:JSON.stringify({userid:await AsyncStorage.getItem("userid")}),
            })
            .then(res => res.json())
            .then(
              (result) => {
             }) 
             
            this.props.navigation.navigate('Homee');
            this.setState({orderId:data.razorpay_payment_id,isModalVisible:true})
            
    
              }).catch((error) => {
            alert(`Error: ${error.code} | ${error.description}`);
              })
          )
         }
       });
       
      
    }

    //diplaying the cartitems of user
  displayCart(){
    return(
      
      <View style={{flex:1}}>
        {(this.state.allProducts.length!==0)? 
        <FlatList
          data={this.state.allProducts}
          keyExtractor={(item)=>item.id} 
          renderItem={({item})=>(  
              <View  style={{flexDirection:'row',height:120,marginTop:10,backgroundColor:'white', borderWidth:1,borderColor: '#ddd'}} >
                <View >
                  <Image
                    style={{marginTop:10,width: 110, height: 98}}
                    source={{uri: item.Link}}/>
                </View>
                  <View >   
                    <Text style={styles.cardText}>{item.Name}</Text>
                    <Text style={styles.priceText}>PRICE: ₹ {item.Price}</Text>
                      <TouchableOpacity style={{paddingTop:15}} onPress={()=>{this.removeItem(item.productId)}}>
                        <Ionicons name="md-remove-circle" size={22} style={{paddingLeft:20}} color="red" />
                      </TouchableOpacity>
                  </View>
                    <View style={{paddingLeft:280,paddingTop:50,flexDirection:'row',position:'absolute'}}>
                        <AntDesign name="plussquareo" size={15} onPress={()=>{this.increment(item.productId)}} >  <Text>{item.Quantity}</Text>  </AntDesign><AntDesign name="minussquareo" size={15} onPress={()=>{((item.Quantity>1)?this.decrement(item.productId):this.removeItem(item.productId))}}></AntDesign>
                    </View>
              </View>
          )}
          />
          
          :<View style={{flex:1,backgroundColor:"white",alignItems:'center'}}>
                      <Image
                          style={{width: 200, height: 208,marginTop:200}}
                          source={{uri:"data:image/png;base64,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"}} />
                      </View>
        }

    
      {//to check the length of added items to decide whether to display totalAmount 
      //and checkout button
       (this.state.allProducts.length!==0)?
            <View>
              <View style={{height:70,flexDirection:'row',backgroundColor:'#fbe4d1'}}>
                <Text style={styles.totalAmount}>TotalAmount  </Text><Text style={styles.amount}> ₹ {this.state.totalAmount} </Text>
              </View>
                <View style={{height:50,backgroundColor:'#f60404',alignItems:'center'}}>
                 <Text style={{fontSize:20,marginTop:10,color:'white'}} onPress={()=>{this.orderplaced()}}>Checkout</Text>
                </View>
            </View>
            :null} 
        </View>
    )
  }

      render(){ 
        //Navigations Events is used to retrieve the added items dynamically 
        //bcoz navigating the pages will not refresh the pages evrytime 
        //so it is required to be called whenever we navigate to a page 
          return(
            
            <View style={{flex:1}}>  
            
                <NavigationEvents onDidFocus={async ()=>{ fetch(GLOBAL.BASE_URL+"cartitems?userid="+await AsyncStorage.getItem("userid"))
                .then(res => res.json())
                .then(
                (result) => {
    
                  this.setState({allProducts:result});
                  this.totalAmount()
                })}}   /> 

              <Homeheading navigation={this.props.navigation}/>

                <Modal isVisible={this.state.isModalVisible}>
                  <View style={{alignItems:'center',flex: 1,marginTop:150,marginLeft:10,backgroundColor:'white',height:'50%',marginBottom:250,width:300}}>
                    <Image
                      style={{width: 150, height: 158}}
                      source={{uri:"https://graphicriver.img.customer.envatousercontent.com/files/270440720/CartoonDogPointer%20p.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=d7ccf47eef9f9a8f679c134cc70bffa5"}} />
                     <Text style={{fontSize:20}}>Order Placed !</Text>
                    <Text style={{fontSize:20}}>Order Id: {this.state.orderId}</Text> 
                  <Button title="Okay" onPress={()=>{this.setState({isModalVisible:false})}} />
                 </View>
              </Modal>

                {this.displayCart()}  

            </View>

          )
        }
}

  const styles = StyleSheet.create({
    cartBox:{
        width:10,
        height:70,
    },
    Col:{
     height:140,width:30
    },
    cardText:{
      fontSize:18,
      fontWeight:'bold'
    },
    priceText:{
      fontSize:13,
      paddingTop:8
      
    },
    totalAmount:{
      fontWeight:'bold',
      fontSize:17,
      marginTop:15,
      marginLeft:15,
      alignContent:'center'
    },
    amount:{
      fontWeight:'bold',
      fontSize:17,
      marginTop:15,
      marginLeft:180,
    }
  });