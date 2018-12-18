// @flow
import * as React from "react";
import {StyleSheet, View, Linking} from "react-native";
import {SocialIcon} from "react-native-elements";

import {
    Container, Header, NavigationBar, Text, StyleGuide, SegmentedControl, Content, App
} from "../components";

import SocialAPI from "./api";


import type {NavigationProps} from "../components";

const {users} = SocialAPI;

type ProfileState = {
    selectedIndex: number
};

export default class Profile extends React.Component<NavigationProps<>, ProfileState> {
    state = {
        selectedIndex: 0
    };

    onChange = (selectedIndex) => this.setState({ selectedIndex });

    onPress = () => {
        const {navigation} = this.props;
        navigation.navigate("Welcome");
    }

    onSocialPressed = (url) => { Linking.openURL(url); }

    data = (params) => {
        if (!params) {
            return (
                <Text color="black" type="callout" style={styles.body}>Ruta5 se creó en el año 2014 con el propósito de exaltar el rol de 
                                                                           los hondureños exitosos dentro o fuera de Honduras, a través de artículos 
                                                                           que se publican semanalmente en nuestro sitio web http://www.rutacincohn.com. 
                                                                           Abordamos también temas de turismo, gastronomía catracha, cultura, empresas 
                                                                           de éxito, extranjeros en Honduras, centroamericanos exitosos y otros temas de 
                                                                           interés mundial.
                                                                            
                                                                           Nuestra misión es promover el desarrollo y el crecimiento económico, conectar 
                                                                           a  los hondureños en el mundo, promocionar su empresa y posicionar las noticias 
                                                                           positivas de Honduras ante el ojo crítico mundial.
                </Text>
            );
        }
        return (
            <View>
                <Text color="black" type="callout" style={styles.body}>{" Correo Electronico: rutacincohn@gmail.com \n \n Telefono: \n \n"}
                </Text>
                <SocialIcon
                    type = "wordpress"
                    style={{ flex: 2 }}
                    button
                    title = "Visita nuestro Sitio Web"
                    onPress = {() => {this.onSocialPressed("https://rutacincohn.com/")}}
                />
                <SocialIcon
                    type = "facebook"
                    style={{ flex: 2 }}
                    button
                    title = "Sigue nuestra página en Facebook"
                    onPress = {() => {this.onSocialPressed("https://www.facebook.com/n/?RutaCincoHn/")}}
                />
                <SocialIcon
                    type = "twitter"
                    style={{ flex: 2 }}
                    button
                    title = "Síguenos en Twitter"
                    onPress = {() => {this.onSocialPressed("https://twitter.com/ruta5hn")}}
                />
                <SocialIcon
                    type = "linkedin"
                    style={{ flex: 2 }}
                    button
                    title = "Visita nuestro Perfil en LinkedIn"
                    onPress = {() => {this.onSocialPressed("https://www.linkedin.com/in/ruta5hn/")}}
                />
                <SocialIcon
                    type = "instagram"
                    style={{ flex: 2 }}
                    button
                    title = "Síguenos en Instagram"
                    onPress = {() => {this.onSocialPressed("https://www.instagram.com/ruta5hn/")}}
                />
                <SocialIcon
                    type = "youtube"
                    style={{ flex: 2 }}
                    button
                    title = "Suscríbete en nuestro Canal de Youtube"
                    onPress = {() => {this.onSocialPressed("https://www.youtube.com/channel/UCk_-JJq-7Pv7W-IfqiyWnvg?view_as=subscriber")}}
                />
            </View>
        );        
    }
    render(): React.Node {
        const {onPress, onChange} = this;
        const {navigation} = this.props;
        const {selectedIndex} = this.state;
        const me = SocialAPI.me();
        return (
            <Container>
                <Header picture={me.cover} heightRatio={1}>
                    <NavigationBar type="transparent" rightAction={{ icon: "sign-out", onPress }} {...{navigation}} />
                    <View style={styles.container}>
                        <Text color="black" type="title3" style={styles.text}>{}</Text>
                        <Text color="black" type="callout" style={styles.text}>{}</Text>
                        <SegmentedControl
                            transparent
                            values={["Bio", "Contactanos"]}
                            {...{selectedIndex, onChange}}
                            Content/>
                    </View>
                </Header>
                <Content style={styles.content}>
                    {
                        this.data(selectedIndex)
                    }
                </Content>
            </Container>
        );
    }


}



const styles = StyleSheet.create({
    container: {
        marginHorizontal: StyleGuide.spacing.small,
        flex: 1,
        justifyContent: "center"
    },
    text: {
        textAlign: "center",
        marginBottom: StyleGuide.spacing.tiny
    },
    body: {
        fontSize: 18,
        textAlign: "justify",
        marginRight: "3%",
        marginLeft: "3%",
        marginTop: "3%",
        lineHeight: 30,
        marginBottom: StyleGuide.spacing.tiny
    },
    content: {
        paddingBottom: StyleGuide.spacing.small
    }
});
