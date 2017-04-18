/**
 * The Home screen to check auth
 * @patr
 */

// React + React Native Requirements
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// NPM
import { Actions } from 'react-native-router-flux';

// Config / settings
import { IOS_CLIENT_ID } from '../config/settings';
import { GoogleSignin } from 'react-native-google-signin';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentWillMount() {
         // Check if a user is already logged in
        // Configure google sign in
        GoogleSignin.configure({
            iosClientId: IOS_CLIENT_ID,
            scopes: ['email', 'profile', 'https://www.googleapis.com/auth/plus.login', "https://www.googleapis.com/auth/drive.readonly"]
        })
        .then(() => {
            // you can now call currentUserAsync()
            GoogleSignin.currentUserAsync().then((user) => {
                console.log('USER', user);
                this.setState({user: user});
                if (!user) {
                    console.log('login needs to pop');
                    setTimeout(() => {Actions.authScreen();}, 500)
                } else {
                    setTimeout(() => {Actions.playScreen();}, 500)
                }
            }).done();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    nando
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = connect()(Home);
