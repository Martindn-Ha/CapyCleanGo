import { StyleSheet, Button, TouchableOpacity, Alert,ImageBackground, Image} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { navigate } from 'expo-router/build/global-state/routing';
import {useRouter} from 'expo-router';

export default function Start() {
    const router = useRouter();   

    const handleStart = () => {
        router.push("/(tabs)/start");
    };
    return (
        <ImageBackground 
            source={require("../../assets/images/space-background.jpg")} 
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>CapyClean!</Text>
                <Image source={require("../../assets/images/capy.png")} style={styles.capyImage}/>
                <Text style={{fontSize: 30}}>Help glip clean the Earth!</Text>
                <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                    <Text style={{fontSize: 40, color: "black"}}>Start</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginTop: "20%",
    },
    background: {
        flex: 1,
        resizeMode: 'cover', // or 'contain', depending on how you want the image to be displayed
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "transparent",
    },
    startButton: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'white',
        width: 180,
        height: 60,
        marginTop: "auto",
        marginBottom: "20%",
        borderRadius: 10,
    },
    capyImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain', // Adjust this depending on how you want the image to be displayed
    }
})


