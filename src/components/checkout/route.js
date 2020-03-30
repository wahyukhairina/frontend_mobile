import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Ongkir from './ongkir';
import Cost from './cost';
import Checkout from '../cart/checkout'

class Routes extends Component {
    static navigationOptions = {
        headerShown: false,
      };
    render() {
        return (
            <Router>
                <Scene key='root' hideNavBar={true}>
                    <Scene key='ongkir' component={Ongkir} initial={true} />
                    <Scene key='cost' component={Cost} />
                    <Scene key='checkout' component={Checkout} />
                </Scene>
            </Router>
        );
    }
}

export default Routes;