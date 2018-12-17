// @flow
import * as React from "react";
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import {StackNavigatorOptions, animationEnabled} from "../components/Navigation";

import {MusicTabBar} from "../components/music";

import Noticias from "./Library";
import Album from "./Album";
import Discovery from "./Discovery";
import Playlist from "./Playlist";
import Profile from "./Profile";

import type {NavigationProps} from "../components/Navigation";

const tabs = [
    { key: "Noticias", label: "Noticias", icon: "feed" }
];

const LibraryNavigator = createStackNavigator({
    Noticias: { screen: Noticias },
    Album: { screen: Album }
}, StackNavigatorOptions);

export const MusicNavigator = createBottomTabNavigator({
    Noticias: { screen: LibraryNavigator }
}, {
    animationEnabled,
    // eslint-disable-next-line react/display-name
    tabBarComponent: ({ navigation }: NavigationProps<>) => <MusicTabBar {...{navigation, tabs}} />,
    tabBarPosition: "bottom",
    swipeEnabled: false
});
