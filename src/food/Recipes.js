// @flow
import * as React from "react";

import {Card, Feed} from "../components";

import FoodAPI from "./api";
import axios from "axios";
import type {Category} from "../components/food/Model";

import type {NavigationProps} from "../components";


import Kit from "./Kit";

const images = require("./../welcome/images");

import {ScrollView, StyleSheet, View, Image, StatusBar} from "react-native";
import {ThemeProvider, Colors, StyleGuide, Images, Text, SafeAreaView} from "../components";

export default class Recipes extends React.Component<NavigationProps<>> {

    renderItem = (category: Category): React.Node => {
        const {navigation} = this.props;
        return <Card {...category} onPress={() => navigation.navigate("Recipe", { categoryId: category.id })} />;
    }

    onPress = () => {
        const {navigation} = this.props;
        navigation.navigate("Welcome");
    }

    render(): React.Node {
        const {renderItem, onPress} = this;
        const {navigation} = this.props;
        const data = FoodAPI.categories;
        const title = "Post";
        const rightAction = {
            icon: "sign-out",
            onPress
        };
        return (
            <Feed {...{data, renderItem, title, navigation, rightAction}} />
        );
    }

    // state = {
    //     postsData: []
    // };

    // async componentDidMount(): Promise<void> {
    //     let info = [];
    //     axios
    //         .get("https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/")
    //         .then(res => {
    //             const post = res.data.posts;
    //             for (let index = 0; index < post.length; index++) {
    //                 info.push(post[index]);
    //             }

    //             this.setState(() => ({
    //                 postsData: info
    //             }));
    //         })
    //         .catch(err => console.log(err.message)); //eslint-disable-lint
    // }
}
//     render(): React.Node {
//         return (
//             <React.Fragment>
//                 <StatusBar
//                     translucent
//                     backgroundColor="transparent"
//                     barStyle="dark-content"
//                 />
//                 <View style={styles.container}>
//                     <SafeAreaView style={styles.safeHeader} top>
//                         <View style={styles.header}>
//                             <View>
//                                 <Text type="title1">Posts</Text>
//                             </View>
//                         </View>
//                     </SafeAreaView>
//                     <ScrollView contentContainerStyle={styles.content}>
//                         <SafeAreaView>
//                             {this.state.postsData.map(data => (
//                                 <Kit
//                                     key={data.ID.toString()}
//                                     uri={data.featured_image}
//                                     preview={images.food.preview}
//                                     title={`${data.title}`}
//                                     backgroundColor={Colors.Food.primary}
//                                     onPress={this.food}
//                                 />
//                             ))}
//                         </SafeAreaView>
//                     </ScrollView>
//                 </View>
//             </React.Fragment>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     safeHeader: {
//         ...StyleGuide.styles.shadow
//     },
//     header: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: StyleGuide.spacing.small
//     },
//     content: {
//         paddingVertical: StyleGuide.spacing.small
//     }
// });
