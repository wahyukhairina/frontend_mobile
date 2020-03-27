import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Tab,
  Tabs,
  TabHeading,
  Badge,
  Image,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

import Category from '../category/category';
import HomeScreen from '../home/homescreen';
import Cart from '../cart/cart';
import Login from '../login/Login';
import Product from '../product/product'

import LoginScreen from '../login/LoginScreen'
import {connect} from 'react-redux';
import empty from '../../../images/empty.png'
import logo from '../../../images/gayain.png'
import { withNavigation } from 'react-navigation';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };
  
  render() {
    
    let Image_Http_URL ={ uri: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png'};
    const a = 1;
    return (
      <>
        <Container style={styles.container}>
          <Tabs tabBarPosition="bottom">
            <Tab
              heading={
                <TabHeading style={styles.tab}>
                  <Icon style={styles.icon} name="home" />
                </TabHeading>
              }>
              <HomeScreen navigate={this.props.navigation.navigate} />
            </Tab>
            <Tab
              heading={
                <TabHeading style={styles.tab}>
                  <Icon style={styles.icon} name="bars" />
                </TabHeading>
              }>
              <Category navigate={this.props.navigation.navigate} />
            </Tab>
            <Tab
              heading={
                <TabHeading style={styles.tab}>
                  <Icon style={styles.icon} name="isv" />
                </TabHeading>
              }>
              <Product navigate={this.props.navigation.navigate} auth={this.props.auth} />
            </Tab>
            <Tab
              heading={
                <TabHeading style={styles.tab}>
                  <Badge >
                <Text>{this.props.totalPurchase}</Text>
              </Badge>
                  <Icon style={styles.icon} name="shoppingcart" />
                </TabHeading>
              }>
              <Cart navigate={this.props.navigation.navigate} image={Image_Http_URL} />
            </Tab>
            <Tab
              heading={
                <TabHeading style={styles.tab}>
                  <Icon style={styles.icon} name="user" />
                </TabHeading>
              }>
              <LoginScreen />
            </Tab>
          </Tabs>
        </Container>
      </>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    color: '#f1a98c',
    fontSize: 25,
  },
  tab: {
    backgroundColor: 'white',
  },
  container: {
    fontFamily: 'monospace',
  }
});

const mapStateToProps = state => {
  return {
    products: state.products,
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase,
    auth: state.auth
  };
};

export default withNavigation(connect(mapStateToProps)(Home));
