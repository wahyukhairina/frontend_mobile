import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View } from 'react-native';
import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';
import {postCost} from '../redux/actions/cost'
// import Spinner from '../Spinner/Spinner';

class AddCost extends Component {
  state = {
    // origin: '',
    destination: '',
    weight: '',
    ongkir: false,
    // courier: '',
  };

  onSubmit = async () => {
    await this.props.dispatch(postCost(this.state));
    this.setState({
      ongkir: true
    })
  };

  render() {
    console.log(this.props, 'di render')
    if (this.state.ongkir == false){
      return (
        <Container>
          <Content>
            <Form style={{marginRight: 10}}>
              <Item>
                <Input
                  placeholder="destination"
                  onChangeText={text => this.setState({destination: text})}
                />
              </Item>
              <Item>
                <Input
                  placeholder="weight"
                  onChangeText={text => this.setState({weight: text})}
                />
              </Item>
            </Form>
            <Button primary style={{margin: 10}} onPress={this.onSubmit}>
              <Text>Save</Text>
            </Button>
          </Content>
              <View>
              </View>
  
        </Container>
      );
    }
    else{
      return (
        <Container>
          <Content>
            <Form style={{marginRight: 10}}>
              <Item>
                <Input
                  placeholder="destination"
                  onChangeText={text => this.setState({destination: text})}
                />
              </Item>
              <Item>
                <Input
                  placeholder="weight"
                  onChangeText={text => this.setState({weight: text})}
                />
              </Item>
            </Form>
            <Button primary style={{margin: 10}} onPress={this.onSubmit}>
              <Text>Save</Text>
            </Button>
          </Content>
  
              <View>
                <Text>Jasa Kirim : </Text> 
                <Text>JNE</Text>
                <Text>Service</Text>
            <Text>{this.props.shipping.shipping[0].service}</Text>
            <Text>{this.props.shipping.shipping[0].cost[0].value}</Text>
              </View>

              <TouchableOpacity style={{backgroundColor:'#a5a6a8', width: 200, height:30, justifyContent:'center', alignItems:'center', borderRadius: 5}} onPress={
                 this.onSubmit()
              }>
              <Text>
                Total
              </Text>
            </TouchableOpacity>
  
        </Container>
      );
    } 
   
  }
}

const mapStateToProps = state => {
  return {
    shipping : state.shipping,
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase,
  };
};
export default connect(mapStateToProps)(AddCost);