import React from 'react';

import {Scene, Router} from 'react-native-router-flux';

// Containers
import PlayScreen from '../containers/PlayScreen';
import AuthScreen from '../containers/AuthScreen';
import Home from '../containers/Home';

export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="home" component={Home} initial />
                    <Scene key="playScreen" component={PlayScreen} name="PlayScreen" />
                    <Scene key="authScreen" component={AuthScreen} direction="vertical" name="AuthScreen" hideNavBar />
                </Scene>
            </Router>
        )
    }
}
