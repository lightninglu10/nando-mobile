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

// Actions
import AuthActions from '../actions/AuthActions';

// Components
import GoogleSignIn from '../components/GoogleSignIn';

import { Actions } from 'react-native-router-flux';


class AuthScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        Actions.playScreen();
    }

    render() {
        var { activeSound } = this.props;
        return (
            <View style={styles.container}>
                <GoogleSignIn />
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
        auth: state.auth,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(AuthActions, dispatch),
    };
}

module.exports = connect(mapStateToProps)(AuthScreen);
