// @flow
import * as React from "react";
import {ScrollView, StyleSheet, View, Image, StatusBar} from "react-native";
import axios from "axios";

import {ThemeProvider, Colors, StyleGuide, Images, Text, SafeAreaView} from "../components";

import Kit from "./Kit";

import type {ThemeName} from "../components/theme";
import type {NavigationProps} from "../components/Navigation";

const images = require("./images");
const ruta5 = require("../../ruta5.png");

export default class Welcome extends React.Component<NavigationProps<>> {

    navigate(themeName: ThemeName) {
        const { navigation } = this.props;
        const themeProvider = ThemeProvider.getInstance();
        themeProvider.switchColors(Colors[themeName]);
        navigation.navigate(themeName);
    }
    
    food = () => this.navigate("Food");
    social = () => this.navigate("Social");
    music = () => this.navigate("Music");
    photography = () => this.navigate("Photography");
    travel = () => this.navigate("Travel");

    state = {
        postsData: [
            {
                id: "",
                title: "",
                URL: "",
                featured_image: ""
            },
            {
                id: "",
                title: "",
                URL: "",
                featured_image: ""
            }
        ],
        ruta5: ""
    };

    async componentDidMount(): Promise<void> {
        let info = [];
        axios
            .get("https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/?fields=ID,title,URL,featured_image&number=2")
            .then(res => {
                const post = res.data.posts;
                for (let index = 0; index < post.length; index++) {
                    info.push(post[index]);
                }

                this.setState(() => ({
                    postsData: info
                }));
            })
            .catch(err => console.log(err.message)); //eslint-disable-lint
        axios
            .get("https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/6936")
            .then(res => {
                this.setState(() => ({
                    ruta5: res.data.featured_image
                }));
            })
            .catch(err => console.log(err.message)); //eslint-disable-lint
    }

    render(): React.Node {
        return (
            <React.Fragment>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <View style={styles.container}>
                    <SafeAreaView style={styles.safeHeader} top>
                        <View style={styles.header}>
                            <View>
                                <Text type="footnote">El Blog de los Hondureños en el Extranjero</Text>
                                <Text type="title1">Ruta5</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                    <ScrollView contentContainerStyle={styles.content}>
                        <SafeAreaView>
                            <Kit
                                uri={this.state.postsData[0].featured_image}
                                preview={images.music.preview}
                                title="Noticias"
                                backgroundColor={Colors.Music.primary}
                                onPress={this.music}
                            />
                            <Kit
                                uri={this.state.postsData[1].featured_image}
                                preview={images.photography.preview}
                                title="Imágenes"
                                backgroundColor={Colors.Photography.primary}
                                onPress={this.photography}
                            />
                            <Kit
                                uri={this.state.ruta5}
                                preview={images.social.preview}
                                title="Acerca de Nosotros"
                                backgroundColor={Colors.Social.primary}
                                onPress={this.social}
                            />
                        </SafeAreaView>
                    </ScrollView>
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeHeader: {
        ...StyleGuide.styles.shadow
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: StyleGuide.spacing.small
    },
    content: {
        paddingVertical: StyleGuide.spacing.small
    }
});
