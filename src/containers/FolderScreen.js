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
import Spinner from 'react-native-loading-spinner-overlay';

// Actions
import ActiveSoundActions from '../actions/ActiveSoundActions';

// Components
import GoogleSignIn from '../components/GoogleSignIn';
import Folders from '../components/Folders';

// NPM
import { Actions } from 'react-native-router-flux';
import { GoogleSignin } from 'react-native-google-signin';

// Settings
import { MAIN_BLACK } from '../config/settings';

class FolderScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    getFiles = (folderId, folderName) => {
        let { user, activeSoundActions } = this.props;
        activeSoundActions.getFileList(user.user.accessToken, folderId, folderName)
        .then((json) => {
            Actions.fileScreen();
        });
    }

    render() {
        var { activeSound } = this.props;

        var folders = activeSound.folders.map((folder, index) => {
            return (
                <TouchableHighlight key={folder.id} onPress={() => this.getFiles(folder.id, folder.name)}>
                    <View>
                        <Folders folder={true} name={folder.name} />
                    </View>
                </TouchableHighlight>
            );
        });
        return (
            <View style={styles.container}>
                <Spinner visible={ activeSound.isFetchingFolders || activeSound.isFetchingFiles } />
                <ScrollView style={styles.scroll}>
                    { folders }
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
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(FolderScreen);
