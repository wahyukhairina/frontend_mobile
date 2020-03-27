import SplashScreen from 'react-native-splash-screen';
import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/components/redux/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Login from './src/components/login/Login';
import Register from './src/components/login/Register';
import Category from './src/components/category/category';
import Home from './src/components/home/home';
import HomeScreen from './src/components/home/homescreen';
import Cart from './src/components/cart/cart';
import LoginScreen from './src/components/login/LoginScreen';
import Product from './src/components/product/product';
import productDetails from './src/components/product/product_details'
import CartScreen from './src/components/cart/cart';
import Checkout from './src/components/cart/checkout';
import profileUser from './src/components/user/profile';
import AddCost from './src/components/cost/cost'

import {API_KEY} from 'react-native-dotenv';


const homeNavigator = createStackNavigator({
  Home: Home,
  Login: Login,
  Register: Register,
  Category: Category,
  HomeScreen: HomeScreen,
  Cart: Cart,
  LoginScreen: LoginScreen,
  Product: Product,
  productDetails: productDetails,
  Checkout: Checkout,
  profileUser:profileUser,
  AddCost: AddCost,
  
});

const AppNavigator = createSwitchNavigator({
  Home: homeNavigator,
  Product: Product,
  Login: Login,
  Register: Register,
});

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    console.log('key', API_KEY)
    console.disableYellowBox = true;
    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}></PersistGate>
          <AppContainer />
        </Provider>
      </>
    );
  }
}

export default App;
