// @flow

import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Button, Platform , Share} from "react-native";
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

        onClick = () => {
            Share.share({
                ...Platform.select({
                    ios: {
                        message: "Have a look on : ",
                        url: album.URL
                    },
                    android: {
                        message: `Have a look on : \n${album.URL}`
                    }
                }),
                title: "Wow, did you see that?"
            }, {
                ...Platform.select({
                    ios: {
                        // iOS only:
                        excludedActivityTypes: [
                            "com.apple.UIKit.activity.PostToTwitter"
                        ]
                    },
                    android: {
                    // Android only:
                        dialogTitle: `Share : ${album.title}`
                    }
                })
            });
        };

        // const tracks = MusicAPI.tracks(album.id);
        // const playlist = MusicAPI.transformAlbumToPlaylist(album);
        const labelBack = "Noticias";
        return (
            <Container>
                <NavigationBar {...{ navigation, back, labelBack }} />
                <Content style={styles.gutter}>
                    <ScrollView style={styles.container}>
                        <Image style={styles.image} {...album.picture} />
                        <View style={styles.metadata}>
                            <Text type="headline">{album.title}</Text>
                            <Text tyle="footnote" numberOfLines={1}>
                                {album.author.name}
                            </Text>
                        </View>
                        <HTML html={album.content} imagesMaxWidth={Dimensions.get("window").width} />
                        <Button
                            onPress={onClick}
                            title="Compartir"
                            color="#1194F6"
                        />
                    
                        <View style={styles.separator} />
                    
                           
                    </ScrollView>
                </Content>
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
