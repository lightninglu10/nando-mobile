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

// NPM
import Icon from 'react-native-vector-icons/FontAwesome';

// Settings
import { MAIN_BLACK } from '../config/settings';

class Folders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        var extra = this.props.folder ? {textAlign: 'center'} : null
        return (
            <View style={styles.container}>
                { this.props.folder 
                    ?   <Icon name='folder' size={30} color="#870000" />
                    :   null
                }
                <Text style={[styles.name, extra]}> { this.props.name } </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    name: {
        flex: 3,
        alignSelf: 'center',
        justifyContent: 'center',
        // paddingLeft: 70,
        color: '#9f9c9c',
        fontWeight: '600',
        letterSpacing: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        margin: 5,
        alignItems: 'center',
        // backgroundColor: MAIN_BLACK,
        // borderRadius: 2,
        // shadowColor: "#fff",
        // shadowOpacity: 0.6,
        // shadowRadius: 1,
        // shadowOffset: {
        //   height: 1,
        //   width: 0.6,
        // }
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Folders;
