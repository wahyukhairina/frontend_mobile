import React, {Component} from 'react';
import { NavigationActions, withNavigation } from 'react-navigation';
import { View, Text, Picker, StyleSheet, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import axios from 'axios'
import { Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Form,
  Content,
  Label,
  Input,
  Item as FormItem,
  Spinner } from 'native-base';

const Item = Picker.Item;


/* data province */


/* data city */


const province = [];
 class CekOngkir extends Component {


  constructor(props) {
    super(props);

    /* set state */
    this.state = {
      loaded: false,
      cityFromLoaded: false,
      cityToLoaded: false,
      from_province: 1,
      from_city: 17,
      to_province: 1,
      to_city: 17,
      province : null,
      courier : 'jne',
      weight: '1000'
    }

  }

  /*
  * HANDLE PRESS
  */
  _updateFromProvince = (province) => {
    
   this.setState({ from_province: province });

   /* get city */
   let urlGetCity = "http://api.rajaongkir.com/starter/city?province="+province;

   axios.get(urlGetCity, {
     'headers': { 'key': '01c67c78ff9e384fdbac1775307db363' }
   })
   .then(function (response) {

     /* response */
     let city_ = response.data.rajaongkir.results;
     const cityFrom = [];
     cityFrom = [];

     let selectCityFrom = true;

     city_.forEach((i) => {
       cityFrom.push({label: i.city_name, value: i.city_id})

        /* set state city */
       if (selectCityFrom){
         this.setState({ from_city: i.city_id });
         selectCityFrom = false;
       }
       /* -- */

     })

     this.setState({ cityFromLoaded: true });

   }.bind(this))
   .catch(function (error) {
     console.log(error);
   });
  }

  _updateFromCity = (city) => {
     this.setState({ from_city: city });
  }

  _updateToProvince = (province) => {
     this.setState({ to_province: province });


     let urlGetCity = "http://api.rajaongkir.com/starter/city?province="+province;

     axios.get(urlGetCity, {
       'headers': { 'key': '01c67c78ff9e384fdbac1775307db363' }
     })
     .then(function (response) {
       let city_ = response.data.rajaongkir.results;
       const cityTo = [];
       cityTo = [];

       let selectCityTo = true;

       city_.forEach((i) => {
         cityTo.push({label: i.city_name, value: i.city_id})

         if (selectCityTo){
           this.setState({ to_city: i.city_id });
           selectCityTo = false;
         }

       })

       this.setState({ cityToLoaded: true });

     }.bind(this))
     .catch(function (error) {
       console.log(error);
     });
  }

  _updateToCity = (city) => {
     this.setState({ to_city: city });
  }

  _selectCourier = (courier) => {
    this.setState({ courier: courier });
  }

  _handleCek = () => {

    let data = {
      origin: this.state.from_city,
      destination: this.state.to_city,
      weight: 1000,
      courier: this.state.courier
    };

    let headers = {
      'headers': { 'key': '01c67c78ff9e384fdbac1775307db363'}
    }
this.props.navigation.navigate('Result')

  }

  async componentDidMount() {

    /* -- */

    /* get province */
    axios.get('http://api.rajaongkir.com/starter/province', {
      'headers': { 'key': '01c67c78ff9e384fdbac1775307db363' }
    })
    .then(function (response) {
      let province_ = response.data.rajaongkir.results;

      province_.forEach((i) => {
        province.push({label: i.province, value: i.province_id})
      })

      this.setState({ loaded: true });

    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });


  }

  /* render province */
  _renderSelectProvinceFrom() {

    if (this.state.loaded) {
      return (
        <View>
        <Text> Province </Text>
        <Picker
          mode="dropdown"
          placeholder = "Dari Province"
          headerStyle={{ backgroundColor: "#b95dd3" }}
          headerBackButtonTextStyle={{ color: "#fff" }}
          headerTitleStyle={{ color: "#fff" }}
          selectedValue = {this.state.from_province}
          onValueChange = {this._updateFromProvince}>
          { province.map((eventType, index) => <Picker.Item key={index} {...eventType} />) }
        </Picker>
        </View>
      )
    }else {
      return null;
    }

  }

  /* render city */
  _renderSelectCityFrom() {
      if (this.state.cityFromLoaded) {
        return(
          <View>
          <Text>City </Text>
          <Picker
            mode="dropdown"
            placeholder = "Dari Province"
            headerStyle={{ backgroundColor: "#b95dd3" }}
            headerBackButtonTextStyle={{ color: "#fff" }}
            headerTitleStyle={{ color: "#fff" }}
            selectedValue = {this.state.from_city}
            onValueChange = {this._updateFromCity}>
            { cityFrom.map((eventType, index) => <Picker.Item key={index} {...eventType} />) }
          </Picker>
          </View>
        )
      }else{
        return null;
      }
  }

  /* render province */
  _renderSelectProvinceTo() {

    if (this.state.loaded) {
      return (
        <View>
        <Text> Province </Text>
        <Picker
          mode="dropdown"
          placeholder = "Dari Province"
          headerStyle={{ backgroundColor: "#b95dd3" }}
          headerBackButtonTextStyle={{ color: "#fff" }}
          headerTitleStyle={{ color: "#fff" }}
          selectedValue = {this.state.to_province}
          onValueChange = {this._updateToProvince}>
          { province.map((eventType, index) => <Picker.Item key={index} {...eventType} />) }
        </Picker>
        </View>
      )
    }else {
      return null;
    }

  }

  /* render city */
  _renderSelectCityTo() {
    if (this.state.cityToLoaded) {
      return(
        <View>
        <Text>City </Text>
        <Picker
          mode="dropdown"
          placeholder = "Dari Province"
          headerStyle={{ backgroundColor: "#b95dd3" }}
          headerBackButtonTextStyle={{ color: "#fff" }}
          headerTitleStyle={{ color: "#fff" }}
          selectedValue = {this.state.to_city}
          onValueChange = {this._updateToCity}>
          { cityTo.map((eventType, index) => <Picker.Item key={index} {...eventType} />) }
        </Picker>
        </View>
      )
    }else{
      return null;
    }
  }

  _courier(){
    return (
      <View>
      <Picker
        mode="dropdown"
        headerBackButtonText="Baaack!"
        selectedValue = {this.state.courier}
        onValueChange = {this._selectCourier}>
        <Item label="Jne" value="jne" />
        <Item label="Tiki" value="tiki" />
        <Item label="Pos" value="pos" />
      </Picker>
      </View>
    )
  }

  render() {
    
    const { navigate } = this.props.navigation;

    return (
      <View style={{flex:1}}>

      {
        this.state.loaded ? (
            <Container>
            <Header/>
            <ScrollView>
            <View style={styles.container}>
            <Form>
              <Text style={styles.headline}>Origin:</Text>
              <Text/>
              { this._renderSelectProvinceFrom() }

              { this._renderSelectCityFrom() }

              <Text/>
              <Text style={styles.headline}>Destination:</Text>
              <Text/>
              { this._renderSelectProvinceTo() }

              { this._renderSelectCityTo() }

              <Text/>
              <Text style={styles.headline}>Courier:</Text>
              <Text/>
              { this._courier() }

            </Form>

            <Text/>
            <Text style={styles.headline}>Weight:</Text>
            <Text/>
            <FormItem floatingLabel last>
              <Label>weight</Label>
              <Input returnKeyType="go" onChangeText={(number) => this.setState({weight: number})} value = {this.state.weight}/>
            </FormItem>
            <Text/>
            <Text/>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this._handleCek()}>
                <Text  style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            </View>
            </ScrollView>
            </Container>
        ) :
            <View style={{flex:1}}>
            <Header/>
             
            </View>
      }
    </View>

      )
  }
}
export default withNavigation(CekOngkir)
const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
   container: {
     padding: 10,
     backgroundColor: '#fff',
    },
    buttonContainer:{
        backgroundColor: '#8d006b',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },

    spiner: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },

    headline: {
      textAlign: 'center',
      fontWeight: 'bold'
    }
});