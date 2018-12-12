// @flow
import * as React from "react";
import {StyleSheet} from "react-native";
import axios from "axios";

import {Feed, Posts, StyleGuide, type NavigationProps} from "../components";

import MusicAPI from "./api";
import type {Album as AlbumModel} from "../components/music/Model";
import {PlayerProvider, Album, withPlayer, type PlayerProps} from "../components/music"


class Library extends React.Component<PlayerProps & NavigationProps<>> {

    renderItem = (album: AlbumModel): React.Node => {
        const {navigation} = this.props;
        return <Album {...{album, navigation}} />;
    }

    onPress = async (): Promise<void> => {
        const playerProvider = PlayerProvider.getInstance();
        const {navigation} = this.props;
        if (playerProvider.sound) {
            await playerProvider.sound.unloadAsync();
        }
        navigation.navigate("Welcome");
    }

    state = {
        postsData: [],
        numberOfPosts: 10,
        offset: 0,
        loading: true
    };

    onEndReached = async (): Promise<void> => {
        this.setState(() => ({
            loading: true
        }));
        axios
            .get(`https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/?fields=ID,title,date,modified,author,URL,content,featured_image&number=${this.state.numberOfPosts}&offset=${this.state.offset}`)
            .then(res => {
                let endPosts = [];
                const post = res.data.posts;
                for (let index = 0; index < post.length; index += 1) {
                    const element = {
                        id: post[index].ID,
                        title: post[index].title,
                        date: post[index].date,
                        modified: post[index].modified,
                        author: {
                            id: post[index].author.ID,
                            login: post[index].author.login,
                            email: post[index].author.email,
                            name: post[index].author.name,
                            first_name: post[index].author.first_name,
                            last_name: post[index].author.last_name,
                            nice_name: post[index].author.nice_name,
                            URL: post[index].author.URL,
                            avatar_URL: post[index].author.avatar_URL,
                            profile_URL: post[index].author.profile_URL,
                            site_ID: 91784856
                        },
                        URL: post[index].URL,
                        content: post[index].content.replace(/<img[^>]+>/g, ""),
                        picture: {
                            uri: post[index].featured_image
                        }
                    };
                    endPosts.push(element);
                }

                const newPosts = this.state.postsData.concat(endPosts);

                this.setState(() => ({
                    postsData: newPosts,
                    offset: this.state.offset += 10,
                    numberOfPosts: this.state.numberOfPosts,
                    loading: false
                }));
            })
            .catch(err => console.log(err.message)); //eslint-disable-lint
    }

    async componentDidMount(): Promise<void> {
        this.setState(() => ({
            loading: true
        }));
        axios
            .get(`https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/?fields=ID,title,date,modified,author,URL,content,featured_image&number=${this.state.numberOfPosts}&offset=0`)
            .then(res => {
                let endPosts = [];
                const post = res.data.posts;
                for (let index = 0; index < post.length; index += 1) {
                    const element = {
                        id: post[index].ID,
                        title: post[index].title,
                        date: post[index].date,
                        modified: post[index].modified,
                        author: {
                            id: post[index].author.ID,
                            login: post[index].author.login,
                            email: post[index].author.email,
                            name: post[index].author.name,
                            first_name: post[index].author.first_name,
                            last_name: post[index].author.last_name,
                            nice_name: post[index].author.nice_name,
                            URL: post[index].author.URL,
                            avatar_URL: post[index].author.avatar_URL,
                            profile_URL: post[index].author.profile_URL,
                            site_ID: 91784856
                        },
                        URL: post[index].URL,
                        content: post[index].content.replace(/<img[^>]+>/g, ""),
                        picture: {
                            uri: post[index].featured_image
                        }
                    };
                    endPosts.push(element);
                }

                this.setState(() => ({
                    postsData: endPosts,
                    offset: this.state.offset += 10,
                    numberOfPosts: this.state.numberOfPosts,
                    loading: false
                }));
            })
            .catch(err => console.log(err.message)); //eslint-disable-lint
    }

    render(): React.Node {
        const {renderItem, onPress, onEndReached} = this;
        const {navigation} = this.props;
        const data = this.state.postsData;
        const loading = this.state.loading;
        const title = "Posts";
        const rightAction = {
            icon: "sign-out",
            onPress
        };
        const onEndReachedThreshold = 0.8;
        return (
            <Posts {...{data, renderItem, title, navigation, rightAction, onEndReached, onEndReachedThreshold, loading}} style={styles.content} />
        );
    }
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: StyleGuide.spacing.small + 64
    }
});

export default withPlayer(Library);
