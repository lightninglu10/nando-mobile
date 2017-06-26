/**
 * The container for the audio player
 * @patr
 */

import React from 'react';
import {
    View,
} from 'react-native';

// Redux
import { connect } from 'react-redux';

// Components
import AudioPlayer from '../components/AudioPlayer';

class AudioPlayerContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { activeSound, audioPlayer } = this.props;
        return (
            <View>
                {audioPlayer.show
                    ?   <AudioPlayer url={activeSound.activeFile} />
                    :   null
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeSound: state.activeSound,
        audioPlayer: state.audioPlayer,
    };
}

module.exports = connect(mapStateToProps, null)(AudioPlayerContainer);
