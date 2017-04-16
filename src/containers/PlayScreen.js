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

class PlayScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        var { activeSound } = this.props;
        return (
            <View style={styles.container}>
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
