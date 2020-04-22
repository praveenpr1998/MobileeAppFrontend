import React , {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    CheckBox,
    TextInput,
    Button,
    FlatList,
    ScrollView,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    Alert
  } from 'react-native';
import 'react-native-gesture-handler';
import MultiSelect from 'react-native-multiple-select';
import { Card } from 'react-native-elements';
import {AsyncStorage} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HomeHeading from "../components/HomeHeading";
const GLOBAL = require('../../Global');

export default class productsPage extends Component{
    state={
        allProducts:[],
        allProducts1:[],
        filteredCat:[],
        searchValue:"",
        selectedItems: [],
        loading:true
    }

  onSelectedItemsChange = selectedItems => {
    this.setState({allProducts:null})
    this.setState({ selectedItems });
  };

    componentDidMount(){

        fetch(GLOBAL.BASE_URL+"products/")
        .then(res => res.json())
        .then(
        (result) => {
          //allProducts1 -- a copy of allProducts to avoid errors while filtering
               this.setState({allProducts:result,allProducts1:result,loading:false});
               //allCat- unique categories
              const allCat = [...new Set(this.state.allProducts.map(data => data.category))];
                this.setState({selectedItems:allCat})
             //changing the selected categories when the user clicks
             //a category in multiselect checkbox
            let uniqueObject=[];
            let newArray=[];
            let objTitle=[];
                for(let i in this.state.allProducts){
                  objTitle=this.state.allProducts[i]['category'];
                  uniqueObject[objTitle]=this.state.allProducts[i];
                }
                 for (let i in uniqueObject) {
                newArray.push(uniqueObject[i]);
            }
            this.setState({filteredCat:newArray})

          })
    }

    async addItems(e){
      fetch(GLOBAL.BASE_URL+"cartitems/add/",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({Name:e.name,link:e.link,price:e.price,Quantity:"1",productId:e.id,userid:await AsyncStorage.getItem("userid")}),
      })
    .then(res => res.json())
    .then(
     (result) => {
       if(result.message !== "Success"){
        alert("Unauthorized Usage Need to Login again");
       }
     });
    }

    displayCategories(){
        const { selectedItems } = this.state;
      return(
        //search bar
        <View style={styles.SearchBarContainer}>
         <View style={{height:57}}>
           <SearchBar
        placeholder="Search Products..."
        onChangeText={(text)=>{this.setState({searchValue:text})}}
        value={this.state.searchValue}
        cancelIcon={true}
          />
        </View>
         <MultiSelect
            hideTags
            items={this.state.filteredCat}
            uniqueKey="category"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="        Filter Category"
            searchInputPlaceholderText="Search Category..."
           tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="red"
            selectedItemTextColor="black"
            selectedItemIconColor="red"
            itemTextColor="red"
            displayKey="category"
            searchInputStyle={{ color: 'black' }}
            submitButtonColor="#CCC"
            submitButtonText="Apply"
          />
        </View>
      )
    }

    render(){
      // filtering the products if the users searches for any products in search bar
        const finalData=[];
          this.state.selectedItems.sort().map((Category) => {
            const test=this.state.allProducts1.filter(x => { return x.category === Category });
            finalData.push(...test.filter(data => {
              return data.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
            }))
           })

      return (
        <View style={{flex:1}}>
          <HomeHeading navigation={this.props.navigation}/>
            {this.displayCategories()}
            {this.state.loading?<ActivityIndicator size="large" color="#0000ff" />:null}
        <View style={{flex:1}}>
          {finalData.length!==0?
          <FlatList numColumns={2}
            keyExtractor={(item)=>item.id}
            data={finalData}
            renderItem={({item})=>(
                  <Card style={styles.card}>
                      <View style={{paddingLeft:10}}>
                        <Image
                          style={styles.itemImages}
                          source={{uri: item.link}}/></View>
                            <View style={styles.textcontent}>
                                <Text style={styles.cardText}>{item.name}</Text>
                                <Text style={styles.priceText}>RS: {item.price}</Text>
                            </View>
                      <View>
                        <TouchableOpacity style={styles.button}>
                        <Button title='add'color="red" onPress={()=>{this.addItems(item)}}/></TouchableOpacity></View>
                  </Card>
          )} />:null}
        </View>
      </View>
      );
    }
}
const styles = StyleSheet.create({
    container: { flexDirection:'row'},
    cardbox:{},
    categoryName:{
      fontSize:15,
      paddingLeft:10,
      paddingTop:10,
      fontWeight:'bold'
    },
    card:{
      marginTop:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
    },
    cardText:{
    fontSize:17,
    fontFamily:'SF-UI-Display-Bold'
    },
    itemImages:{
      width: 110, height: 98
    },
    SearchBarContainer:{
        paddingTop:10,
        backgroundColor: GLOBAL.Styling.Colors.searchBarBackground,
    },
    textcontent:{
      alignItems:'center',
      alignContent:'center',
      marginTop:10,
      marginBottom:10
    },
    priceText:{
      fontSize:17,
    },
    button:{
      alignContent:'center',
      marginLeft:23,
    width:70
    },
    lottie: {
      width: 100,
      height: 50,
      marginTop:50,
    }
  })
