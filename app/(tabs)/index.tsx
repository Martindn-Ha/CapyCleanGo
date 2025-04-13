import { StyleSheet, Button, TouchableOpacity, Alert,Image} from 'react-native';
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
        <View style={styles.container}>
            <Text style={styles.title}>CapyClean!</Text>
            <Image source={require("../../tempImg/IMG_7453.jpg")} style={{ width: 200, height: 200 }} />
            <TouchableOpacity style={styles.startButton}>
                <Button title="Start" onPress={handleStart} />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginTop: "20%",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "lightblue",
    },
    startButton: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'white',
        width: 80,
        height: 50,
        marginTop: "auto",
        marginBottom: "20%",
    },
})


