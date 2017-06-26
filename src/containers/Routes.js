import React from 'react';

import {Scene, Router} from 'react-native-router-flux';

import { StyleSheet, StatusBar } from 'react-native';

// Containers
import PlayScreen from './PlayScreen';
import FolderScreen from './FolderScreen';
import FileScreen from './FileScreen';
import AuthScreen from './AuthScreen';
import Home from './Home';
import NavBarContainer from './NavBarContainer';

class Routes extends React.Component {
    componentWillMount() {
        StatusBar.setBarStyle('light-content', true);
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

    render() {
        return (
            <Router>
                <Scene key="root" navBar={NavBarContainer}>
                    <Scene key="home" component={Home} initial hideNavBar={true} />
                    <Scene key="folderScreen" component={FolderScreen} name="folderScreen" />
                    <Scene key="fileScreen" component={FileScreen} name="fileScreen" />
                    <Scene key="playScreen" component={PlayScreen} name="playScreen" statusBarStyle="light-content" />
                    <Scene key="authScreen" component={AuthScreen} direction="vertical" name="AuthScreen" statusBarStyle="light-content" />
                </Scene>
            </Router>
        )
    }
}

module.exports = Routes;
