import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Subtitle,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  View,
} from 'native-base';
import {TouchableOpacity, Image} from 'react-native';
import NumberFormat from 'react-number-format';
import {URL, KEY, LOGO} from './config';
import {withNavigation} from 'react-navigation';

class Cost extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this._checkOngkir();
  }

  _checkOngkir = route => {
    const data = this.props.navigation.getParam('item');
    const formData = new URLSearchParams();
    formData.append('origin', data.originCity);
    formData.append('destination', data.destinationCity);
    formData.append('weight', data.weight);
    formData.append('courier', data.courier);

    fetch(`${URL}/cost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        key: KEY,
      },
      body: formData.toString(),
    })
      .then(res => res.json())
      .then(resData => {
        let status = resData['rajaongkir']['status']['code'];
        if (status === 200) {
          this.setState({
            results: resData['rajaongkir']['results'][0]['costs'],
          });
        }
      });
  };

  render() {
    let {results} = this.state;
    const data = this.props.navigation.getParam('item');
    let courier = data.courier;
    let weight = data.weight;
    const render = results.map(item => {
      const ongkir = item.cost[0].value
      return (
        <>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Checkout', {ongkir : ongkir} )}>
         <View style={{borderBottomWidth:1, marginHorizontal:10}}>          
           <Thumbnail source={{
                      uri: LOGO[courier],
                    }} />
                    <Text>{item.service}</Text>
                    <Text note>{item.description}</Text>
                  <Text note>{weight / 1000} Kg</Text>
                  <NumberFormat
                    value={item.cost[0].value}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp.'}
                    renderText={value => <Text>{value}</Text>}
                  />
            </View>

            {/* <ListItem avatar key={new Date().getMilliseconds+Math.random()}>
                <Left>
                  <Thumbnail
                    source={{
                      uri: LOGO[courier],
                    }}
                  />
                </Left>
                <Body>
                  <Text>{item.service}</Text>
                  <Text note>{item.description}</Text>
                  <Text note>{weight / 1000} Kg</Text>
                  <Text note>
                    {item.cost[0].etd} {courier != 'pos' ? 'HARI' : null}
                  </Text>
                </Body>
                <Right>
                  <NumberFormat
                    value={item.cost[0].value}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp.'}
                    renderText={value => <Text>{value}</Text>}
                  />
                </Right>
              </ListItem> */}
              </TouchableOpacity>
        </>
      );
    });

    if (results !== []) {
      return <>{render}</>;
    } else {
      return (
        <Container>
          <Text>INI</Text>
        </Container>
      );
    }
  }
}

export default withNavigation(Cost);
