// React + React Native Requirements
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

class GoogleSignInComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    _signIn = () => {
        GoogleSignin.signIn()
        .then((user) => {
            console.log(user);
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
