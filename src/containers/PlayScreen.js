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
import { Player, ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';

// Actions
import ActiveSoundActions from '../actions/ActiveSoundActions';
import AudioPlayerActions from '../actions/AudioPlayerActions';

// Components
import GoogleSignIn from '../components/GoogleSignIn';
import Folders from '../components/Folders';
import Files from '../components/Files';
import NavBar from './NavBar.js';

// NPM
import { Actions } from 'react-native-router-flux';
import { GoogleSignin } from 'react-native-google-signin';

// Settings
import { MAIN_BLACK } from '../config/settings';

class PlayScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    signOut = () => {
        GoogleSignin.signOut()
        .then(() => {
          console.log('out');
          Actions.authScreen();
        })
        .catch((err) => {

        });
    }

    getFiles = (folderId, folderName) => {
        let { user, activeSoundActions } = this.props;
        activeSoundActions.getFileList(user.user.accessToken, folderId, folderName)
        .then((json) => {

        });
    }

    chooseActiveFile = (fileId) => {
        let { user, activeSoundActions, audioPlayerActions } = this.props;
        activeSoundActions.chooseActive(user.user.accessToken, fileId)
        .then((json) => {
            audioPlayerActions.show(true);
            ReactNativeAudioStreaming.play(json.activeFile, {showIniOSMediaCenter: true, showInAndroidNotifications: true})
        });
    }

    render() {
        var { activeSound, user } = this.props;
        var render = null
        if (activeSound.files.length > 0) {
            render = activeSound.files.map((file, index) => {
                return (
                    <TouchableHighlight key={file.id} onPress={() => this.chooseActiveFile(file.id)}>
                        <View>
                            <Folders folder={false} name={file.name} key={file.id} onClick={this.chooseActiveFile} />
                        </View>
                    </TouchableHighlight>
                );
            });
        } else {
            render = activeSound.folders.map((folder, index) => {
                return (
                    <TouchableHighlight key={folder.id} onPress={() => this.getFiles(folder.id, folder.name)}>
                        <View>
                            <Folders folder={true} name={folder.name} />
                        </View>
                    </TouchableHighlight>
                );
            });
        }

        return (
            <View style={styles.container}>
                <Spinner visible={ activeSound.isFetchingFolders || activeSound.isFetchingFiles } />
                <View style={styles.navContainer}>
                    <NavBar
                        gearStyle={styles.gearStyle}
                        textStyle={styles.textStyle}
                        profileImage={user.user.photo}
                        title={activeSound.activeFolderName}
                        signOut={this.signOut}
                    />
                </View>
                <View style={styles.mainView}>
                    <ScrollView>
                        { render }
                    </ScrollView>
                </View>
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
