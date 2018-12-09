// @flow

import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import HTML from "react-native-render-html";

import { Container, NavigationBar, Content, List, Image, Text, StyleGuide } from "../components";

import { type Album, type Playlist as PlaylistModel, type Track as TrackModel } from "../components/music/Model";
import { Track, PlaylistHeader, PlayerActionSheet } from "../components/music";
import type { NavigationProps } from "../components";

import MusicAPI from "./api";

export default class AlbumScreen extends React.PureComponent<NavigationProps<{ album: Album, back: string }>> {
    // TODO: createRef()
    playerActionSheet: PlayerActionSheet;

    setPlayerActionSheet = (playerActionSheet: ?PlayerActionSheet) => {
        if (playerActionSheet) {
            this.playerActionSheet = playerActionSheet;
        }
    };

    toggle = (playlist: PlaylistModel, track: TrackModel) => {
        this.playerActionSheet.toggle(playlist, track);
    };

    render(): React.Node {
        const { navigation } = this.props;
        const { album, back } = navigation.state.params;
        // const tracks = MusicAPI.tracks(album.id);
        // const playlist = MusicAPI.transformAlbumToPlaylist(album);
        return (
            <Container>
                <NavigationBar {...{ navigation, back }} />
                <View style={styles.header}>
                    <View style={styles.container}>
                        <Text>sabrosoo</Text>
                        <Image style={styles.image} {...album.picture} />
                        <View style={styles.metadata}>
                            <Text type="headline">{album.title}</Text>
                            <Text tyle="footnote" numberOfLines={1}>
                                {album.author.name}
                            </Text>
                        </View>
                        <ScrollView style={{ flex: 1 }}>
                            <HTML html={album.content} imagesMaxWidth={Dimensions.get("window").width} />
                        </ScrollView>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    gutter: {
        padding: StyleGuide.spacing.small,
        paddingBottom: StyleGuide.spacing.small + 64
    },
    container: {
        flex: 1,
        marginLeft: StyleGuide.spacing.small,
        marginBottom: 1,
        ...StyleGuide.styles.borderRadius,
        ...StyleGuide.styles.shadow
    },
    image: {
        overflow: "hidden",
        height: 163,
        borderTopLeftRadius: StyleGuide.styles.borderRadius.borderRadius,
        borderTopRightRadius: StyleGuide.styles.borderRadius.borderRadius
    },
    metadata: {
        padding: StyleGuide.spacing.tiny
    }
});
