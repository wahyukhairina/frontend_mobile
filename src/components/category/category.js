import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Text, View, Image, FlatList, StyleSheet} from 'react-native';
import {getCategory} from '../redux/actions/category';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

class Category extends Component {
  getCategory() {
    this.props.dispatch(getCategory());
  }

  componentDidMount() {
    console.log('ini Did Mount');
    this.getCategory();
  }
  renderRow = ({item}) => {
    console.log(item.category_id);
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0,0,0,.1)',
          height: 150,
        }}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigate('productDetails', {
              category_id: item.category_id,
              name: item.name,
            })
          }>
          <Image source={{uri: item.image, width: 360, height: 150}} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.log(this.props);
    const {category} = this.props;
    return (
      <>
     
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.FlatList}>
            <FlatList
              data={category}
              renderItem={this.renderRow}
              // refreshing={products.isLoading}
              // onRefresh={this.onRefreshing}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  FlatList: {
    flex: 6,
  },
});
const mapStateToProps = state => {
  return {
    category: state.category.category,
  };
};
export default withNavigation(connect(mapStateToProps)(Category));
