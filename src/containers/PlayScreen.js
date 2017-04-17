/**
 * The screen that contains the player
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

// NPM Requirements
import { Player } from 'react-native-audio-streaming';

// Actions
import ActiveSoundActions from '../actions/ActiveSoundActions';

// Components
import GoogleSignIn from '../components/GoogleSignIn';

// Config / settings
import { IOS_CLIENT_ID } from '../config/settings';

// NPM
import { Actions } from 'react-native-router-flux';
import { GoogleSignin } from 'react-native-google-signin';

class PlayScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    signout = () => {
        GoogleSignin.signOut()
        .then(() => {
          console.log('out');
        })
        .catch((err) => {

        });

    }

    componentDidMount() {
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
                    Actions.authScreen();
                }
            }).done();
        });
    }

    render() {
        var { activeSound } = this.props;
        return (
            <View style={styles.container}>
                <Text onPress={this.signout}> Logout </Text>
                <Player url={activeSound.file} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

function mapStateToProps(state) {
    return {
        activeSound: state.activeSound,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        activeSoundActions: bindActionCreators(ActiveSoundActions, dispatch),
    };
}

module.exports = connect(mapStateToProps)(PlayScreen);
