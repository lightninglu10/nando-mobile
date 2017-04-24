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
import Folders from '../components/Folders';

// NPM
import { Actions } from 'react-native-router-flux';
import { GoogleSignin } from 'react-native-google-signin';

class FolderScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        var { activeSound } = this.props;

        var folders = activeSound.folders.map((folder, index) => {
            return (
                <Folders name={folder.name} key={folder.id} />
            );
        });
        return (
            <ScrollView style={styles.scroll}>
                { folders }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  }
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(FolderScreen);
