import { StyleSheet, Button, TouchableOpacity, Alert, ImageBackground, Animated, Easing } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Text, View } from '@/components/Themed';
import { registerIncrement } from '@/app/pointsManager';

export default function Start() {
  const [points, setPoints] = useState(0);

  const swayAnim = useRef(new Animated.Value(0)).current; // For swaying
  const hopAnim = useRef(new Animated.Value(0)).current;  // For hopping

  const incrementPoints = () => setPoints((prev) => prev + 1);

  useEffect(() => {
    registerIncrement(incrementPoints);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(swayAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(swayAnim, {
          toValue: -1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(hopAnim, {
          toValue: -10,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(hopAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ImageBackground 
      source={require("../../assets/images/space-background.jpg")} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>CapyCredits</Text>
        <Animated.Image
            source={require('../../assets/images/cute-capybara-spacesuit-moon-vector-illustration_864129-1299.avif')}
            style={styles.avatar}
        />
        <Text style={{ fontSize: 50 }}>{points}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title2}>Capy Shop</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "transparent" }}>
          <Animated.Image 
            source={require("../../assets/images/capy3.png")} 
            style={[
              styles.capy3,
              {
                transform: [
                  {
                    translateX: swayAnim.interpolate({
                      inputRange: [-1, 1],
                      outputRange: [-5, 5], // slight left-right sway
                    }),
                  },
                ],
              },
            ]}
          />
          <Text style={{ fontSize: 50, marginLeft: 10 }}>15</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "transparent" }}>
          <Animated.Image 
            source={require("../../assets/images/capy1.png")} 
            style={[
              styles.capy2,
              {
                transform: [
                  { translateY: hopAnim }, // slight hop up-down
                ],
              },
            ]}
          />
          <Text style={{ fontSize: 50, marginLeft: 10 }}>15</Text>
        </View>
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
  title2: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: -50,
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
    width: 300,
    height: 300,
    resizeMode: 'contain', 
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    marginVertical: 20,
    resizeMode: 'cover',
  },
  capy3: {
    width: 300,
    height: 200,
    padding: 10,
    resizeMode: 'contain',
  },
  capy2: {
    width: 300,
    height: 200,
    padding: 20,
    resizeMode: 'contain',
  },
});
