import React from 'react';

import {Scene, Router} from 'react-native-router-flux';

import { StatusBar } from 'react-native';

// Containers
import PlayScreen from '../containers/PlayScreen';
import FolderScreen from '../containers/FolderScreen';
import AuthScreen from '../containers/AuthScreen';
import Home from '../containers/Home';

export default class Routes extends React.Component {
    componentWillMount() {
        StatusBar.setBarStyle('light-content', true);
    }

    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar>
                    <Scene key="home" component={Home} initial />
                    <Scene key="playScreen" component={PlayScreen} name="playScreen" statusBarStyle="light-content" />
                    <Scene key="authScreen" component={AuthScreen} direction="vertical" name="AuthScreen" statusBarStyle="light-content" />
                </Scene>
            </Router>
        )
    }
}
