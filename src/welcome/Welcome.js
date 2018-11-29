// @flow
import * as React from "react";
import {ScrollView, StyleSheet, View, Image, StatusBar} from "react-native";
import axios from "axios";

import {ThemeProvider, Colors, StyleGuide, Images, Text, SafeAreaView} from "../components";

import Kit from "./Kit";

import type {ThemeName} from "../components/theme";
import type {NavigationProps} from "../components/Navigation";

const images = require("./images");

export default class Welcome extends React.Component<NavigationProps<>> {

    navigate(themeName: ThemeName) {
        const { navigation } = this.props;
        const themeProvider = ThemeProvider.getInstance();
        themeProvider.switchColors(Colors[themeName]);
        navigation.navigate(themeName);
    }

    state = {
        postsData: []
    };

    food = () => this.navigate("Food");

    async componentDidMount(): Promise<void> {
        let info = [];
        axios
            .get("https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/")
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
                                <Text type="footnote">Proyecto Desarrollo Apps Vanguardia</Text>
                                <Text type="title1">Posts</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                    <ScrollView contentContainerStyle={styles.content}>
                        <SafeAreaView>
                            {this.state.postsData.map(data => (
                                <Kit
                                    key={data.ID.toString()}
                                    uri={data.featured_image}
                                    preview={images.food.preview}
                                    title={`${data.title}`}
                                    backgroundColor={Colors.Food.primary}
                                    onPress={this.food}
                                />
                            ))}
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
