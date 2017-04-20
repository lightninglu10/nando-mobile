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
          Actions.authScreen();
        })
        .catch((err) => {

        });

    }

    componentDidMount() {
        let { user, activeSoundActions } = this.props;
        activeSoundActions.getFileList(user.user.accessToken);
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
  },
});

function mapStateToProps(state) {
    return {
        activeSound: state.activeSound,
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        activeSoundActions: bindActionCreators(ActiveSoundActions, dispatch),
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
