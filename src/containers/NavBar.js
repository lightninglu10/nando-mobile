/**
 * The Navbar
 * @patr
 */

// React + React Native Requirements
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    TouchableHighlight,
    TouchableOpacity,
    Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    renderBackButton = () => {
        const state = this.props.navigationState;
        const childState = state.children[state.index];
        const BackButton = (childState.component && childState.component.backButton) || state.backButton || childState.backButton;
        const textButtonStyle = [
            styles.barBackButtonText,
            this.props.backButtonTextStyle,
            state.backButtonTextStyle,
            childState.backButtonTextStyle,
        ];
        
        const style = [
            styles.backButton,
            this.props.leftButtonStyle,
            state.leftButtonStyle,
            childState.leftButtonStyle,
        ];

        if (state.index === 0 && (!state.parentIndex || state.parentIndex === 0)) {
            return null;
        }

        if (BackButton) {
            return (
                <BackButton
                    testID="backNavButton"
                    textButtonStyle={textButtonStyle}
                    {...childState}
                    style={style}
                />
            );
        }

        const buttonImage = childState.backButtonImage || state.backButtonImage || this.props.backButtonImage;
        let onPress = childState.onBack || childState.component.onBack;
        if (onPress) {
            onPress = onPress.bind(null, state);
        } else {
            onPress = Actions.pop;
        }

        const text = childState.backTitle 
            ?   (<Text style={textButtonStyle}>
                    {childState.backTitle}
                </Text>)
            : null;

        return (
            <TouchableOpacity
                testID="backNavButton"
                style={style}
                onPress={() => { onPress(); this.props.setTitle(this.props.previousTitleName);}}
            >
                <View>
                    {!childState.hideBackImage &&
                        <Icon name={"chevron-left"} size={17} color="#fff" />
                    }
                    {text}
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        let state = this.props.navigationState;
        let selected = state.children[state.index];
        const wrapByStyle = (component, wrapStyle) => {
            if (!component) { return null; }
            return props => <View style={wrapStyle}>{component(props)}</View>;
        };

        while ({}.hasOwnProperty.call(selected, 'children')) {
            state = selected;
            selected = selected.children[selected.index];
        }
        const navProps = { ...this.props, ...selected };
        const leftButtonStyle = [styles.leftButton, { alignItems: 'flex-start' }];
        const rightButtonStyle = [styles.rightButton, { alignItems: 'flex-end' }];
        
        const renderBackButton = wrapByStyle(selected.renderBackButton, leftButtonStyle) || wrapByStyle(selected.component.renderBackButton, leftButtonStyle) || this.renderBackButton;

        return (
            <View style={styles.container}>
                { renderBackButton(navProps) || <Image source={{uri: this.props.profileImage}} style={styles.image} /> }
                <Text style={[styles.title, this.props.textStyle]}>
                    { this.props.title.toUpperCase() }
                </Text>
                <Icon onPress={this.props.signOut} name="gear" size={16} style={this.props.gearStyle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    leftButton: {

    },
    rightButton: {

    },
    backButton: {
        padding: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios'? 64 : 54,
        // paddingLeft: 10,
        paddingRight: 10,
        top: 0,
        right: 0,
        left: 0,
        position: 'absolute',
        paddingTop: 20,
        backgroundColor: '#1b1d1f',
        // marginBottom: 44,
    },
    title: {
        fontSize: 13,
        backgroundColor: 'transparent',
    },
    image: {
        height: 24,
        width: 24,
        borderRadius: 12,
        marginLeft: 10,
    },
});

export default NavBar;
