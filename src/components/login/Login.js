import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { login } from '../redux/actions/auth'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import bg from '../../../images/bg_putih.png';
import logo from '../../../images/gayain.png';
import {API_KEY} from 'react-native-dotenv';
import axios from 'axios'
import {connect} from 'react-redux';

import { withNavigation } from 'react-navigation';

const {width: WIDTH} = Dimensions.get('window');

class Login extends Component {
  static navigationOptions = {
    tittle: null,
  };
  constructor() {
    super();
    this.state = {
      showPass: true,
      press: false,
    };
  }

  state={
    email:'',
    password:''
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated) {
      this.props.navigation.navigate('Home')
    }
  }

  onSubmit = async (e) =>{
    console.log('ini submit', this.state)
    await this.props.dispatch(login(this.state))
    this.props.navigation.navigate('Home')
  }

  showPass = () => {
    if (this.state.press === false) {
      this.setState({showPass: false, press: true});
    } else {
      this.setState({showPass: true, press: false});
    }
  };

  onChangeEmail = (event) => {
    console.log(event)
    this.setState({
      email:event
     })
  }

  onChangePass = (event) => {
    console.log(event)
    this.setState({
      password:event
     })
  }
  
  // saveData() {
  //   let object = {
  //     name 
  //   }
  // }

//   onSubmit = () => {

//     axios
//         .post(`${API_KEY}/user/login`, this.state)
//         .then(res => {
//             console.log(res.data);
//             AsyncStorage.setItem('token', res.data.token);
//             AsyncStorage.setItem('user-id', res.data.id);
//             AsyncStorage.setItem('Status', res.data.status );
//             AsyncStorage.setItem('isAuth', true);
//             this.props.navigation.navigate('Product');
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }

  render() {
    return (
      <>
        <ImageBackground source={bg} style={styles.backgroundContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="user"
              size={27}
              color={'grey'}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={'username'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlinedColorAndroid="transparent"
              onChangeText={this.onChangeEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon
              name="lock"
              size={27}
              color={'grey'}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={'password'}
              secureTextEntry={this.state.showPass}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlinedColorAndroid="transparent"
              onChangeText={this.onChangePass}
            />

            <TouchableOpacity
              style={styles.btnEye}
              onPress={this.showPass.bind(this)}>
              <Icon
                name={this.state.press === false ? 'eye' : 'eye-slash'}
                size={27}
                color={'grey'}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnLogin} onPress={this.onSubmit}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          
        <View>
        <Text>Don't have an account?</Text><TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}><Text>Register</Text></TouchableOpacity>

        </View>

        </ImageBackground>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      auth: state.auth
  }
}

export default withNavigation(connect(mapStateToProps)(Login))

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 290,
    height: 290,
    marginTop: -90,
  },
  logoContainer: {
    alignItems: 'center',
  },
  input: {
    width: WIDTH - 95,
    height: 45,
    borderRadius: 25,
    fontSize: 18,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255,255,255, 0.7)',
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 9,
    left: 39,
  },
  inputContainer: {
    marginBottom: 15,
  },
  btnEye: {
    position: 'absolute',
    top: 7,
    right: 39,
  },
  btnLogin: {
    width: WIDTH - 95,
    height: 45,
    borderRadius: 25,
    fontSize: 18,
    backgroundColor: '#f1a98c',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
