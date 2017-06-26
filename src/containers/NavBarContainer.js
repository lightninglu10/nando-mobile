/**
 * The Navbar container
 * @patr
 */


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

// Containers
import NavBar from './NavBar';

// Actions
import ActiveSoundActions from '../actions/ActiveSoundActions';

class NavBarConatiner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { user, activeSound, activeSoundActions } = this.props;
        return (
            <NavBar
                gearStyle={styles.gearStyle}
                textStyle={styles.textStyle}
                profileImage={user.user.photo}
                title={activeSound.activeFolderName}
                signOut={this.signOut}
                previousTitleName={activeSound.previousFolderName}
                setTitle={activeSoundActions.setTitleName}
                navigationState={this.props.navigationState}
            />
        );
    }
}

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

module.exports = connect(mapStateToProps, mapDispatchToProps)(NavBarConatiner);


const styles = StyleSheet.create({
    gearStyle: {
        color: '#fff',
        backgroundColor: 'transparent',
    },
    textStyle: {
        color: '#fff',
        fontWeight: '700',
        letterSpacing: .5,
    },
});
