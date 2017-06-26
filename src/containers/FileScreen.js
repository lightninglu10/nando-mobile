/**
 * The screen that contains the player
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
} from 'react-native';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// NPM Requirements
import { Player } from 'react-native-audio-streaming';

// Actions
import ActiveSoundActions from '../actions/ActiveSoundActions';
import AudioPlayerActions from '../actions/AudioPlayerActions';

// Components
import GoogleSignIn from '../components/GoogleSignIn';
import Folders from '../components/Folders';

// NPM
import { Actions } from 'react-native-router-flux';
import { GoogleSignin } from 'react-native-google-signin';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import Spinner from 'react-native-loading-spinner-overlay';


// Settings
import { MAIN_BLACK } from '../config/settings';

class FolderScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    chooseActiveFile = (fileId) => {
        let { user, activeSoundActions, audioPlayerActions } = this.props;
        activeSoundActions.chooseActive(user.user.accessToken, fileId)
        .then((json) => {
            ReactNativeAudioStreaming.play(json.activeFile, {showIniOSMediaCenter: true, showInAndroidNotifications: true})
        });
        audioPlayerActions.show(true);
    }

    render() {
        var { activeSound } = this.props;

        var files = activeSound.files.map((file, index) => {
            return (
                <TouchableHighlight key={file.id} onPress={() => this.chooseActiveFile(file.id)}>
                    <View>
                        <Folders folder={false} name={file.name} key={file.id} onClick={this.chooseActiveFile} />
                    </View>
                </TouchableHighlight>
            );
        });
        return (
            <View style={styles.container}>
                <Spinner visible={ activeSound.isFetchingFiles } />
                <ScrollView style={styles.scroll}>
                    { files }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 59,
    paddingTop: 5,
    // paddingTop: Platform.OS === 'ios'? 64 : 54, //nav bar height
  },
  gearStyle: {
    color: '#fff',
    backgroundColor: 'transparent',
  },
  textStyle: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: .5,
  },
  navContainer: {
    paddingTop: 20,
    backgroundColor: '#1b1d1f',
    // backgroundColor: 'black',
  },
  mainView: {
    flex: 1,
    backgroundColor: MAIN_BLACK,
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
        audioPlayerActions: bindActionCreators(AudioPlayerActions, dispatch),
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(FolderScreen);
