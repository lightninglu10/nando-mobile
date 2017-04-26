/**
 * The Navbar
 * @patr
 */

// React + React Native Requirements
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    TouchableHighlight,
    Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.profileImage}} style={styles.image} />
                <Text style={[styles.title, this.props.textStyle]}>
                    { this.props.title.toUpperCase() }
                </Text>
                <Icon name="gear" size={16} style={this.props.gearStyle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios'? 44 : 34,
    paddingLeft: 10,
    paddingRight: 10,
   },
  title: {
    fontSize: 13,
  },
  image: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
});

export default NavBar;