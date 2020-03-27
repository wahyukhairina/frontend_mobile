import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  Container,
  Header,
  Image,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Badge,
  Icon,
  View,
  Item,
  Input,
  Tab,
  TabHeading,
} from 'native-base';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Col, Row, Grid} from 'react-native-easy-grid';

import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {manipulateItem, deleteCart} from '../redux/actions/cart';
class Cart extends Component {
  static navigationOptions = {
    title: null,
    // other configurations
  }
  addQuantity = data => {
    if (data.quantity < data.stock) {
      data.quantity += 1;
      this.props.dispatch(manipulateItem(data));
    }
  };
  removeQuantity = data => {
    if (data.quantity > 1) {
      data.quantity -= 1;
      this.props.dispatch(manipulateItem(data));
    }
  };
  deleteCart = id => {
    this.props.dispatch(deleteCart(id));
  };

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
    console.log(this.props)
    console.log(this.props)
    const ViewCart = () => {
      if (this.props.productsInCart.length < 1) {
        return (
          <Content>
            {/* <Image source={Bg} style={{flex: 1, width: 360}} /> */}
          </Content>
        );
      } else {
        return (
          <Content>
            <FlatList
              data={this.props.productsInCart}
              renderItem={({item}) => (
                <Card style={{marginBottom: -2, marginTop: -2}}>
                  <CardItem>
                    <Left>
                      <Thumbnail
                        source={{uri: item.image, width: 200, height: 200}}
                      />
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>{this.convertToRupiah(item.price)}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <View style={{flexDirection: 'row', marginHorizontal: -10}}>
                        <Icon
                          name="trash"
                          style={{
                            color: 'grey',
                            marginRight: 20,
                            marginTop: 5,
                          }}
                          onPress={() => this.deleteCart(item.productId)}
                        />
                        <Button
                          small
                          info
                          onPress={() => this.removeQuantity(item)} style={{backgroundColor:'#f1a98c'}}>
                          <Text>-</Text>
                        </Button>
                        <Button transparent small>
                          <Text
                            style={{
                              borderBottomColor: 'black',
                              paddingHorizontal: 10,
                            }}>
                            {item.quantity}
                          </Text>
                        </Button>
                        <Button
                          small
                          info
                          onPress={() => this.addQuantity(item)} style={{backgroundColor:'#f1a98c'}}>
                          <Text>+</Text>
                        </Button>
                      </View>
                    </Right>
                  </CardItem>
                </Card>
              )}
              keyExtractor={item => item.productId.toString()}
            />

            <View style={{alignContent:'center', alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#a5a6a8', width: 200, height:30, justifyContent:'center', alignItems:'center', borderRadius: 5}} onPress={() =>
                this.props.navigate('Checkout', {
                  products: this.props.productsInCart,
                })
              }>
              <Text>
                Total
              </Text>
            </TouchableOpacity>
            </View>
          </Content>
        );
      }
    };
    const { cart } = this.props
    console.log(this.props)
    return (
      <>
      {this.props.productsInCart.length !== 0 ?
      <Container>
        <Grid>
          <Col>
            <ViewCart />
          </Col>
        </Grid>
      </Container>
      :
      
      <View style={{alignItems:'center', marginVertical:120}}>
        <Icons name="cart-remove" size={300} ></Icons>
       <Text>your cart is empty :(</Text>
       </View>
      }
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase,
  };
};

export default connect(mapStateToProps)(Cart);