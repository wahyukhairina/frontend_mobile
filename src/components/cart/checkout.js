import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'react-native-uuid';
import {withNavigation} from 'react-navigation';

import {
  Container,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem,
  Icon,
  View,
  Item,
  Input,
} from 'native-base';

import {Col, Row, Grid} from 'react-native-easy-grid';

import {FlatList} from 'react-native';
import {checkout} from '../redux/actions/cart';
import {getProduct} from '../redux/actions/product';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Checkout extends Component {
  static navigationOptions = {
    tittle: null,
  };
  constructor(props) {
    super(props);
  }

  state = {
    totalPrice: 0,
  };

  async checkout() {
    const data = {
      id_transaction: `${uuid()}`,
      products: this.props.productsInCart,
    };
    await this.props.dispatch(checkout(data));
    await this.props.navigation.navigate('Home');
    alert('Success');
  }
  componentDidMount() {
    const productsInCart = this.props.productsInCart;

    var total = 0;
    productsInCart.map(e => {
      total += e.price * e.quantity;
    });
    this.setState({
      totalPrice: total,
    });
  }
  componentDidUpdate() {
    this.props.dispatch(getProduct({}));
  }
  convertToRupiah(angka) {
    var rupiah = '';
    var angkarev = angka
      .toString()
      .split('')
      .reverse()
      .join('');
    for (var i = 0; i < angkarev.length; i++) {
      if (i % 3 == 0) {
        rupiah += angkarev.substr(i, 3) + '.';
      }
    }
    return (
      'Rp. ' +
      rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('') +
      ',-'
    );
  }

  render() {
    const ongkir = this.props.navigation.getParam('ongkir');
    return (
      <Container>
        <Grid>
          <Col>
            <Content>
              <FlatList
                data={this.props.productsInCart}
                onRefresh={this.onRefreshing}
                renderItem={({item}) => (
                  <Card style={{marginBottom: -2, marginTop: -2}}>
                    <CardItem>
                      <Left>
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note>{this.convertToRupiah(item.price)}</Text>
                        </Body>
                      </Left>
                      <Right>
                        <View style={{flexDirection: 'row'}}>
                          <Text>{item.quantity}</Text>
                          <Text> x {this.convertToRupiah(item.price)}</Text>
                        </View>
                      </Right>
                    </CardItem>
                  </Card>
                )}
                keyExtractor={item => item.productId.toString()}
              />
              <View style={{marginHorizontal: 20, marginTop: 10}}>
                <Text style={{textAlign: 'center'}}>
                  ----------------------------------------------------------------------
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>Total</Text>
                  <Text style={{marginLeft: 170}}>
                    : {this.convertToRupiah(this.state.totalPrice)}
                  </Text>
                </View>
                
                <View style={{flexDirection: 'row'}}>
                  <Text>Shipment</Text>
                  <Text style={{marginLeft: 138}}>
                    : {this.convertToRupiah(ongkir)}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight:'bold'}}>Total Payment</Text>
                  <Text style={{marginLeft: 105, fontWeight:'bold'}}>
                    : {this.convertToRupiah(this.state.totalPrice + ongkir)}
                  </Text>
                </View>

                <Card>
                  <CardItem>
                    <Body>
                      <Text style={{textAlign: 'center'}}>
                        To continue your shopping, please transfer
                        {this.convertToRupiah(
                          this.state.totalPrice + ongkir,
                        )}{' '}
                        to BNI Syariah bank on behalf of PT. GayaIn Nusantara
                        44686-1234-4321-32
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Button
                  onPress={() => this.checkout()}
                  info
                  disabled={this.state.Disabled}
                  style={{
                    justifyContent: 'center',
                    marginTop: 10,
                    width: 200,
                    backgroundColor: '#f1a98c',
                  }}>
                  <Icon name="checkbox" />
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Checkout
                  </Text>
                </Button>
              </View>
            </Content>
          </Col>
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase,
  };
};
export default withNavigation(connect(mapStateToProps)(Checkout));
