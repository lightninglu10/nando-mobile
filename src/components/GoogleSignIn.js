// React + React Native Requirements
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { IOS_CLIENT_ID } from '../config/settings';

class GoogleSignInComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    _signIn() {
        GoogleSignin.signIn()
        .then((user) => {
            this.setState({user: user});
        })
        .catch((err) => {
            console.log('WRONG SIGNIN', err);
        })
        .done();
    }

    componentDidMount() {
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            // play services are available. can now configure library
        })
        .catch((err) => {
          console.log("Play services error", err.code, err.message);
        })

        GoogleSignin.configure({
            iosClientId: IOS_CLIENT_ID,
            scopes: ['email', 'profile', 'https://www.googleapis.com/auth/plus.login', "https://www.googleapis.com/auth/drive.readonly"]
        })
        .then(() => {
            // you can now call currentUserAsync()
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.nando}>
                    nando
                </Text>
                <Text>
                    play your files from your Google Drive
                </Text>
                <GoogleSigninButton
                    style={{width: 230, height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this._signIn.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    nando: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});


export default GoogleSignInComponent;
