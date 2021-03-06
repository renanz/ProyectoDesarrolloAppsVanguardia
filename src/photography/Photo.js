// @flow
import moment from "moment";
import * as React from "react";
import ImageZoom from "react-native-image-pan-zoom";
import {
    StyleSheet, View, Platform, StatusBar, Dimensions, ActivityIndicator, Animated
} from "react-native";

import {NavigationBar, Image, BlurView, IconButton, Footer, type NavigationProps} from "../components";

import {Filters, Filter, PhotoActionSheet, Rotation, Crop, type FilterName} from "../components/photography";
import type {Photo} from "../components/photography/Model";


type PhotoScreenProps = NavigationProps<{ photo: Photo, from: string }>;
type PhotoScreenState = {
    filter: FilterName,
    areFiltersReady: boolean,
    filterAnimation: Animated.Value,
    rotation: Animated.Value
};

export default class PhotoScreen extends React.Component<PhotoScreenProps, PhotoScreenState> {

    // TODO: createRef()
    filters: PhotoActionSheet;
    crop: PhotoActionSheet;

    state: $Shape<PhotoScreenState> = {
        areFiltersReady: false,
        filterAnimation: new Animated.Value(0),
        rotation: new Animated.Value(width / 2)
    };

    setFiltersAsReady = () => this.setState({ areFiltersReady: true });

    setFiltersRef = (filters: ?PhotoActionSheet) => {
        if (filters) {
            this.filters = filters;
        }
    }

    setCropRef = (crop: ?PhotoActionSheet) => {
        if (crop) {
            this.crop = crop;
        }
    }

    toggleFilters = () => {
        const {filterAnimation} = this.state;
        Animated.timing(
            filterAnimation,
            {
                toValue: 1,
                duration,
                useNativeDriver
            }
        ).start();
        this.filters.toggle();
    }

     toggleCrop = () => {
         const {filterAnimation} = this.state;
         Animated.timing(
             filterAnimation,
             {
                 toValue: 1,
                 duration,
                 useNativeDriver
             }
         ).start();
         this.crop.toggle();
     }

     onCloseActionSheet = () => {
         const {filterAnimation} = this.state;
         Animated.timing(
             filterAnimation,
             {
                 toValue: 0,
                 duration,
                 useNativeDriver
             }
         ).start();
     }

     switchFilter = (filter: FilterName) => this.setState({ filter });

     render(): React.Node {
         const {
             toggleFilters, toggleCrop, switchFilter, setFiltersAsReady, onCloseActionSheet
         } = this;
         const {navigation} = this.props;
         const {areFiltersReady, rotation, filterAnimation, filter: name} = this.state;
         const {photo, from} = navigation.state.params;
         const date = moment(photo.created_at).format("DD MMMM YYYY · HH:mm");
         const title = photo.location ? photo.location.name : "";
         const subtitle = date;
         const opacity = filterAnimation.interpolate({
             inputRange: [0, 1],
             outputRange: [0, 1]
         });
         const intensity = filterAnimation.interpolate({
             inputRange: [0, 1],
             outputRange: [0, 100]
         });
         const rotate = rotation.interpolate({
             inputRange: [0, viewport],
             outputRange: ["-25deg", "25deg"]
         });
         return (
             <View style={styles.container}>
                 <StatusBar hidden />
                 {
                     <NavigationBar
                     type="transparent"
                     back={from}
                     withGradient
                     largeTitle
                     {...{navigation, title, subtitle}}
                 />
                 }
                  <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={viewport}
                       imageHeight={viewport * 0.75}>
                    <Image preview={photo} uri={photo} style={styles.image}/>
                    </ImageZoom>
             </View>
         );
     }
}

const duration = 300;
const useNativeDriver = Platform.OS === "android";
const {width: viewport} = Dimensions.get("window");
const width = viewport + 88;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    image: {
        width: viewport, height: viewport * 0.75, position: "absolute", top: -50
    },
    filter: {
        position: "absolute",
        top: 50,
        left: (viewport - (width * 0.63)) / 2,
        width: width * 0.63,
        height: width * 0.63 * 1.65
    }
});
