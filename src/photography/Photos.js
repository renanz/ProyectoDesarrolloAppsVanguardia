// @flow
import * as React from "react";
import {StyleSheet} from "react-native";
import axios from "axios";

import {Feed, StyleGuide, type NavigationProps} from "../components";

import PhotograhyAPI from "./api";
import {PhotoThumbnail} from "../components/photography";
import type {Photo} from "../components/photography/Model";

export default class Photos extends React.Component<NavigationProps<>> {

    renderItem = (photo: Photo): React.Node => {
        const {navigation} = this.props;
        return <PhotoThumbnail from="Photos" {...{photo, navigation}} />;
    }

    onPress = async (): Promise<void> => {
        const {navigation} = this.props;
        navigation.navigate("Welcome");
    }

    state = {
        postsData: [],
        numberOfPosts: 20,
        offset: 0,
        loading: true
    };

    onEndReached = async (): Promise<void> => {
        this.setState(() => ({
            loading: true
        }));
        axios
            .get(`https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/?fields=ID,featured_image&number=${this.state.numberOfPosts}&offset=${this.state.offset}`)
            .then(res => {
                let endPosts = [];
                const post = res.data.posts;
                for (let index = 0; index < post.length; index += 1) {
                    endPosts.push(post[index].featured_image);
                }

                const newPosts = this.state.postsData.concat(endPosts);

                this.setState(() => ({
                    postsData: newPosts,
                    offset: this.state.offset += this.state.numberOfPosts,
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
        .get(`https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/?fields=ID,featured_image&number=${this.state.numberOfPosts}&offset=${this.state.offset}`)
            .then(res => {
                let endPosts = [];
                const post = res.data.posts;
                for (let index = 0; index < post.length; index += 1) {
                    endPosts.push(post[index].featured_image);
                }

                this.setState(() => ({
                    postsData: endPosts,
                    offset: this.state.offset += this.state.numberOfPosts,
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
        const title = "Galería de Imágenes";
        const rightAction = {
            icon: "sign-out",
            onPress
        };
        const onEndReachedThreshold = 0.2;
        return (
            <Feed
                style={styles.content}
                numColumns={3}
                {...{data, renderItem, title, navigation, rightAction, onEndReached, onEndReachedThreshold}}
            />
        );
    }
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: StyleGuide.spacing.small
    }
});
