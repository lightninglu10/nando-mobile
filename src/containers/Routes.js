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
                    <Scene key="auth" component={AuthScreen} />
                    <Scene key="PlayScreen" component={PlayScreen} title="" name="PlayScreen" />
                </Scene>
            </Router>
        )
    }
}
