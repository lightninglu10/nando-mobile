import React from 'react';

import {Scene, Router} from 'react-native-router-flux';

// Containers
import PlayScreen from '../containers/PlayScreen';
import AuthScreen from '../containers/AuthScreen';

export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="playScreen" component={PlayScreen} title="" name="PlayScreen" initial />
                    <Scene key="authScreen" component={AuthScreen} name="authScreen" type="transitionToTop" hideNavBar schema="modal" />
                </Scene>
            </Router>
        )
    }
}
