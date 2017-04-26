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

// Actions
import ActiveSoundActions from '../actions/ActiveSoundActions';

// Components
import GoogleSignIn from '../components/GoogleSignIn';
import Folders from '../components/Folders';
import Files from '../components/Files';
import AudioPlayer from '../components/AudioPlayer';
import NavBar from './NavBar.js';

// NPM
import { Actions } from 'react-native-router-flux';
import { GoogleSignin } from 'react-native-google-signin';

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

    getFiles = (folderId) => {
        let { user, activeSoundActions } = this.props;
        activeSoundActions.getFileList(user.user.accessToken, folderId)
        .then((json) => {

        });
    }

    chooseActiveFile = (fileId) => {
        let { user, activeSoundActions } = this.props;
        activeSoundActions.chooseActive(user.user.accessToken, fileId)
        .then((json) => {
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
                            <Files name={file.name} key={file.id} onClick={this.chooseActiveFile} />
                        </View>
                    </TouchableHighlight>
                );
            });
        } else {
            render = activeSound.folders.map((folder, index) => {
                return (
                    <TouchableHighlight key={folder.id} onPress={() => this.getFiles(folder.id)}>
                        <View>
                            <Folders name={folder.name} />
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
                        title={'Your Library'}
                    />
                </View>
                <View style={styles.mainView}>
                    <Text onPress={this.signOut}>
                        Logout
                    </Text>
                    <ScrollView>
                        { render }
                    </ScrollView>
                    <AudioPlayer url={activeSound.activeFile} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'ios'? 64 : 54, //nav bar height
  },
  gearStyle: {
    color: '#fff',
  },
  textStyle: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: .5,
  },
  navContainer: {
    paddingTop: 20,
    backgroundColor: 'black',
  },
  mainView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  folders: {
    // flexDirection: 'column',
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
