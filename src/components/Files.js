// React + React Native Requirements
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import Icon from 'react-native-vector-icons/FontAwesome';

class Files extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <Icon name="play" size={40} color="#900" />
                <Text style={styles.name}> { this.props.name } </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    name: {
        flex: 3,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 70,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        margin: 5,
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
          width: 0.3,
        }
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Files;
