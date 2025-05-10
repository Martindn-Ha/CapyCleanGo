import { StyleSheet, Button, TouchableOpacity, Alert,ImageBackground, Image} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { navigate } from 'expo-router/build/global-state/routing';
import {useRouter} from 'expo-router';
import { Audio } from 'expo-av';


export default function Start() {
    const router = useRouter();   
    const sound = useRef<Audio.Sound | null>(null);

    const playSound = async () => {
        try {
            if (sound.current) {
                await sound.current.unloadAsync();
            }
    
            const { sound: newSound } = await Audio.Sound.createAsync(
                require('../../assets/audio/capysong.mp3') // ✅ Correct path
            );
            sound.current = newSound;
            await sound.current.playAsync();
        } catch (error) {
            console.error("Failed to play sound", error);
        }
    };    

    const handleStart = async () => {
        try {
            if (sound.current) {
                await sound.current.unloadAsync();
            }
    
            const { sound: newSound } = await Audio.Sound.createAsync(
                require('../../assets/audio/capysong.mp3')
            );
    
            sound.current = newSound;
    
            await sound.current.setIsLoopingAsync(true); // 🔁 Loop forever
            await sound.current.playAsync();
    
            router.push("/(tabs)/start"); // Navigate immediately
        } catch (error) {
            console.error("Failed to play sound", error);
            router.push("/(tabs)/start"); // Still navigate even if sound fails
        }
    };

    useEffect(() => {
        return () => {
            // Clean up sound when component unmounts
            if (sound.current) {
                sound.current.unloadAsync();
            }
        };
    }, []);

    return (
        <ImageBackground 
            source={require("../../assets/images/space-background.jpg")} 
            style={styles.background}
        >
            <View style={styles.container}>
                <Image source={require("../../assets/images/CapyClean!.png")} style={styles.capyCleanImage}/>
                <Image source={require("../../assets/images/capy.png")} style={styles.capyImage}/>
                <Text style={{fontSize: 30}}>Help Glip clean the Earth!</Text>
                <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                    <Text style={{fontSize: 40, color: "black"}}>Go!</Text>
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
        resizeMode: 'cover', 
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
        width: 350,
        height: 350,
        resizeMode: 'contain', 
    },
    capyCleanImage: {
        marginTop: 70, 
        width: 400,   
        height: 150,     
        resizeMode: 'stretch',
    }
})


