import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView, ImageBackground } from 'react-native';

import { Container, Header, Content, Card, CardItem, Text, Body, Spinner } from 'native-base';
import axios from 'axios'
import {withNavigation } from 'react-navigation';


 class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded : false
    }
  }

  componentDidMount(){
    let data = this.props.navigation.getParam(data);
    let headers = this.props.navigation.getParam(headers);

    axios.post('https://api.rajaongkir.com/starter/cost', data, headers)
    .then(function (response) {
        const rajaongkir = [];
      rajaongkir = response.data.rajaongkir;
      console.log(rajaongkir);
      this.setState({ loaded: true });
    }.bind(this))
    .catch(function (error) {
      console.log('ini error',error);
    });
  }

  render() {

    console.log(this.props)
    if (this.state.loaded) {

      let result = [];

      if (rajaongkir.results[0].costs.length == 0) {
        result.push(<View key = "1"><Text>No Data</Text></View>)
      }else{
        for (var i = 0; i < rajaongkir.results[0].costs.length; i++) {
          result.push(
            <View key = {i}>
              <Text/>
              <Text>Service: {rajaongkir.results[0].costs[i].service}</Text>
              <Text>Description: {rajaongkir.results[0].costs[i].description}</Text>
              <Text>Rp.{rajaongkir.results[0].costs[i].cost[0].value}</Text>
              <Text>Etd: {rajaongkir.results[0].costs[i].cost[0].etd}</Text>
              <Text/>
              <Text/>
            </View>
            )
        }
      }

      return (
        <View style={{flex:1}}>
        <Header/>
         
            <Container>
              <Content>
                <Card>
                  <CardItem>
                    <Body>
                      <ScrollView>
                      <Text style={styles.labels}>Origin</Text>
                      <Text/>
                      <Text>City: {rajaongkir.origin_details.city_name}</Text>
                      <Text>Province: {rajaongkir.origin_details.province}</Text>
                      <Text/>
                      <Text style={styles.labels}>Destination</Text>
                      <Text/>
                      <Text>City: {rajaongkir.destination_details.city_name}</Text>
                      <Text>Province: {rajaongkir.destination_details.province}</Text>
                      <Text/>
                      <Text style={styles.labels}>Weight</Text>
                      <Text/>
                      <Text>{rajaongkir.query.weight} Gram</Text>
                      <Text/>
                      <Text style={styles.labels}>Courier</Text>
                      <Text/>
                      <Text>{rajaongkir.results[0].name}</Text>
                      <Text/>
                      <Text style={styles.labels}>Result</Text>
                      { result }
                      </ScrollView>
                    </Body>
                  </CardItem>
                  <CardItem footer>
                  </CardItem>
               </Card>
              </Content>
            </Container>
        </View>
      );
    }else {
      return (
        <View style={{flex:1}}>
        <Header/>
         
        </View>
      )
    }
  }
}
export default withNavigation(Result)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});