import React from 'react';
import PlayScreen from '../containers/PlayScreen';
import {Scene, Router} from 'react-native-router-flux';


export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="PlayScreen" component={PlayScreen} title="" name="PlayScreen" />
                </Scene>
            </Router>
        )
    }
}
