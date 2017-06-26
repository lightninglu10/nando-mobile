import React, { Component } from 'react';
import {
    NativeModules,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    ActivityIndicator,
    Platform
} from 'react-native';

// NPM
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import Icon from 'react-native-vector-icons/FontAwesome';

// Settings
import { MAIN_BLACK } from '../config/settings';

// Possibles states
const PLAYING = 'PLAYING';
const STREAMING = 'STREAMING';
const PAUSED = 'PAUSED';
const STOPPED = 'STOPPED';
const ERROR = 'ERROR';
const METADATA_UPDATED = 'METADATA_UPDATED';
const BUFFERING = 'BUFFERING';
const START_PREPARING = 'START_PREPARING'; // Android only
const BUFFERING_START = 'BUFFERING_START'; // Android only

// UI
const iconSize = 60;

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
        this.state = {
            status: STOPPED,
            song: ''
        };
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener(
            'AudioBridgeEvent', (evt) => {
                // We just want meta update for song name
                if (evt.status === METADATA_UPDATED && evt.key === 'StreamTitle') {
                    this.setState({song: evt.value});
                } else if (evt.status != METADATA_UPDATED) {
                    this.setState(evt);
                }
            }
        );

        // ReactNativeAudioStreaming.getStatus((error, status) => {
        //     (error) ? console.log(error) : this.setState(status)
        // });
    }

    _onPress() {
        switch (this.state.status) {
            case PLAYING:
            case STREAMING:
                ReactNativeAudioStreaming.pause();
                break;
            case PAUSED:
                ReactNativeAudioStreaming.resume();
                break;
            case STOPPED:
            case ERROR:
                ReactNativeAudioStreaming.play(this.props.url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
                break;
            case BUFFERING:
                ReactNativeAudioStreaming.stop();
                break;
        }
    }

    render() {
        let icon = null;
        switch (this.state.status) {
            case PLAYING:
            case STREAMING:
                icon = <Icon style={styles.icon} name="pause" size={30} color="#870000" />
                break;
            case PAUSED:
            case STOPPED:
            case ERROR:
                icon = <Icon style={[styles.icon, {paddingLeft: Platform.OS == 'ios' ? 2 : 0,}]} name="play" size={30} color="#870000" />
                break;
            case BUFFERING:
            case BUFFERING_START:
            case START_PREPARING:
                icon = <ActivityIndicator
                    animating={true}
                    style={{height: 80}}
                    size="large"
                />;
                break;
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPress}>
                    { icon }
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.songName}>{this.state.song}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        flexDirection: 'row',
        height: 80,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: MAIN_BLACK,
        borderTopWidth: 1,
        backgroundColor: '#1b1d1f',
    },
    icon: {
        color: '#870000',
        // fontSize: 26,
        borderColor: '#870000',
        borderWidth: 3,
        borderRadius: iconSize / 2,
        width: iconSize,
        height: Platform.OS == 'ios' ? iconSize : 40,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: Platform.OS == 'ios' ? 13 : 0,
    },
    textContainer: {
        flexDirection: 'column',
        margin: 10
    },
    textLive: {
        color: '#000',
        marginBottom: 5
    },
    songName: {
        fontSize: 20,
        textAlign: 'center',
        color: '#000'
    }
});

AudioPlayer.propTypes = {
    url: React.PropTypes.string.isRequired
};

export default AudioPlayer;