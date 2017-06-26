/**
 * The Home screen to check auth
 * @patr
 */

// React + React Native Requirements
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
} from 'react-native';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import AuthActions from '../actions/AuthActions';
import ActiveSoundActions from '../actions/ActiveSoundActions';

// NPM
import { Actions } from 'react-native-router-flux';

// Config / settings
import { IOS_GOOGLE_CLIENT_ID } from '../config/settings';
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
            iosClientId: IOS_GOOGLE_CLIENT_ID,
            scopes: ['email', 'profile', 'https://www.googleapis.com/auth/plus.login', "https://www.googleapis.com/auth/drive.readonly"]
        })
        .then(() => {
            // you can now call currentUserAsync()
            GoogleSignin.currentUserAsync().then((user) => {
                if (!user) {
                    console.log('login needs to pop');
                    setTimeout(() => {Actions.authScreen({type: 'replace'});}, 500)
                } else {
                    console.log(user);
                    let { authActions, activeSoundActions } = this.props;
                    authActions.loggedIn(user);
                    activeSoundActions.getFolders(user.accessToken)
                    .then(setTimeout(() => {
                        Actions.folderScreen({type: 'reset'});
                    }, 500))
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

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(AuthActions, dispatch),
        activeSoundActions: bindActionCreators(ActiveSoundActions, dispatch),
    };
}

module.exports = connect(null, mapDispatchToProps)(Home);
