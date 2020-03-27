/* eslint-disable react-native/no-inline-styles */
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Header, Item, Input, Button} from 'native-base';
import {getProduct, searchProduct, sortProduct,getPage} from '../redux/actions/product';
import {postCart} from '../redux/actions/cart'

class Product extends Component {
  constructor(){
    super()
    this.state={
      page:1,
      data:[]
    }
  }
  getProduct() {
    this.props.dispatch(getProduct());
  }

  componentDidMount() {
    // this.getProduct()
    this.plusPage()
  }
  async plusPage (page){
    // this.setState({page:this.state.page + 1})
    await this.props.dispatch(getPage(this.state.page))

    // this.setState({
    //   data:this.state.data.concat(this.props.product)
    // })
  }
  addToCart = e => {
    if (!this.props.auth.isAuthenticated) {
      Alert.alert(
        'Cannot add to cart',
        //body
        'Please Login to Add Cart',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
          {text: 'Login', onPress: () => this.props.navigate('Login')},
        ],
        {cancelable: false},
      );
      // this.props.navigation.navigate('Login')
    }
    else {
    var a;
    this.props.productsInCart.map(product => {
      if (parseInt(product.productId) === parseInt(e.id)) {
        a = 0;
        return alert('Product is already in cart');
      }
      return product;
    });
    if (a !== 0) {
      const data = {
        name: e.name,
        image: e.image,
        productId: e.id,
        price: e.price,
        stock: e.stock,
        quantity: 1,
      };
      this.props.dispatch(postCart(data));
    }
  }
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

  searchProduct = name => {
    console.log(name);
    this.setState({
      name: name,
    });
    this.props.dispatch(searchProduct(name));
  };
  async onClickSort(type) {
    console.log(type);
    await this.props.dispatch(sortProduct(type));
  }
nextPage=()=>{
  this.setState(this.setState({
    page:this.state.page + 1
  }))
  this.plusPage(this.state.page)
}
renderFooter =() =>{
  return(
    <View style={styles.loader}>
      <ActivityIndicator size="large"/>
    </View>
  )
}
  renderRow = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 10,
          // borderBottomWidth: 1,
          borderBottomColor: 'rgba(0,0,0,.1)',
          height: 230,
          flexDirection: 'row',
          marginHorizontal: 7,
        }}>
        <View
          style={{
            alignItems: 'center',
            alignContent: 'center',
            justifyItems: 'center',
            marginVertical: 4,
            backgroundColor: 'white',
            
          }}>
          <Image
            source={{uri: item.image, width: 150, height: 150}}
            style={{borderRadius: 5, marginHorizontal: 5, marginVertical: 5}}
          />
          {/* <View style={{flex: 1, backgroundColor:'red'}} ></View> */}
          <Text style={{fontFamily:'monospace'}}>{item.name}</Text>
          <Text> {this.convertToRupiah(item.price)} </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'grey',
              width: 120,
              height: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.addToCart(item)}>
            <Text>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    console.log(this.props)
    const {product} = this.props;
    console.log(product);
    console.log('ini');
    return (
      <>
        <>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View>
              <Header style={{backgroundColor: '#FFAEAE'}} searchBar rounded>
                <Item style={{borderRadius: 50}}>
                  <Input
                    placeholder="Search"
                    onChangeText={this.searchProduct}
                  />
                </Item>
                <Button transparent>
                  <Text>Search</Text>
                </Button>
              </Header>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFAEAE',
                  borderRadius: 25,
                  width: 100,
                  height: 30,
                }}
                onPress={() => this.onClickSort('ASC')}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: 'sans-serif-condensed',
                    color: 'white',
                  }}>
                  Highest
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFAEAE',
                  borderRadius: 25,
                  width: 100,
                  height: 30,
                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: 'sans-serif-condensed',
                    color: 'white',
                  }}
                  onPress={() => this.onClickSort('DESC')}>
                  Lowest
                </Text>
              </TouchableOpacity>
            


            </View>

              <View style={styles.FlatList}>
                <FlatList
                  data={this.props.product}
                  renderItem={this.renderRow}
                  keyExtractor={item => item.id}
                   onMomentumScrollEnd={this.nextPage}
                   onEndReachedThreshold={0.5}
                  ListFooterComponent={this.renderFooter}
                  numColumns={2}
                />
              </View>
          </View>
        </>
      </>
    );
  }
}
const styles = StyleSheet.create({
  FlatList: {},
  loader:{
    marginTop:10,
    alignItems:'center'
  }
});
const mapStateToProps = state => {
  return {
    product: state.product.product,
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase,
  };
};
export default connect(mapStateToProps)(Product);