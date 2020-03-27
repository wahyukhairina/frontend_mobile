import React from 'react';
import {View, Text, Image, Button, TextInput, StyleSheet,TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {editUser} from '../redux/actions/user'
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
class profileUser extends React.Component {
  state = {
    name:'',
    email: '',
    username: '',
    password: '',
    alamat: '',
    provinsi: '',
    kota: '',
    image: null,

  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({image: response});
      }
    });
  };
  handleChooseCamera = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchCamera(options, response => {
      if (response.uri) {
        this.setState({image: response});
      }
    });
  };
 onSubmit= async (event) =>{
     event.preventDefault()
     const userId=this.props.auth.profile.id
     let data = new FormData()
     const file={
         name:this.state.image.fileName,
         type:this.state.image.type,
         uri:this.state.image.uri
     }
     data.append('image',file)
    //  data.append('email',this.state.email)
    //  data.append('username',this.state.username)
    //  data.append('password',this.state.password)
    //  data.append('alamat',this.state.alamat)
    //  data.append('provinsi',this.state.provinsi)
    //  data.append('kota',this.state.kota)
    // //  console.log(data)
    await this.props.dispatch(editUser(userId,data))
    this.props.navigation.navigate('Home')
//destinasi ketika sukses
     
 }
  render() {
    console.log(this.state);
    const {image} = this.state;
    const profile = this.props.auth.profile;
    return (
        <View>
        <View>
               <View style={{ marginTop:10, marginBottom:10, alignItems: 'center', justifyContent: 'center'}}>
            {image && (
              <Image source={{uri: image.uri}} style={{width: 100, height: 90}} />
            )}
              <TouchableOpacity onPress={this.handleChoosePhoto} style={{backgroundColor:'#a5a6a8', width:100, height: 30, justifyContent:'center', alignItems:'center'}} ><Text>Choose Image</Text></TouchableOpacity>
              <TouchableOpacity onPress={this.handleChooseCamera} style={{backgroundColor:'#a5a6a8', width:100, height: 30, justifyContent:'center', marginVertical: 10, alignItems:'center'}} ><Text>Launch Camera</Text></TouchableOpacity>
            
             </View>
              <TouchableOpacity style={styles.btnRegister} onPress={this.onSubmit}>
                <Text style={styles.text}>Set profile</Text>
              </TouchableOpacity>
            </View>
     
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};
export default withNavigation(connect(mapStateToProps)(profileUser));
const styles=StyleSheet.create({
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 0,
        color: '#a5a6a8',
        borderBottomColor: '#a5a6a8',
        borderBottomWidth: 1,
      },
      btnRegister: {
        marginTop:10,
        height: 45,
        width:200,
        borderRadius: 25,
        fontSize: 18,
        marginHorizontal: 80,
        backgroundColor: '#f1a98c',
        justifyContent: 'center',
      },
      text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
      },
})