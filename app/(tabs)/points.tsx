import { StyleSheet, Button, TouchableOpacity, Alert,ImageBackground, Image} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { navigate } from 'expo-router/build/global-state/routing';
import {useRouter} from 'expo-router';
export default function Start() {
    const [points, setPoints] = useState(0);
    return (
        <ImageBackground 
            source={require("../../assets/images/space-background.jpg")} 
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>CapyCredits</Text>
                    <Image source={require('../../assets/images/cute-capybara-spacesuit-moon-vector-illustration_864129-1299.avif')} style={styles.avatar}
                    />
                <Text style={{fontSize: 50}}>{points}</Text>
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
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60, // Half of width/height for circle
        marginVertical: 20,
        resizeMode: 'cover',
      }
})

