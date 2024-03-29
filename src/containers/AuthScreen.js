/**
 * The screen that contains Auth
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

// NPM
import { Actions } from 'react-native-router-flux';


class AuthScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    setUser = () => {

    }

    render() {
        var { authActions } = this.props;
        return (
            <View style={styles.container}>
                <GoogleSignIn authActions={authActions} />
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
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(AuthActions, dispatch),
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
