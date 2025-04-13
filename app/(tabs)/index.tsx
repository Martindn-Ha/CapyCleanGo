import { StyleSheet, Button, TouchableOpacity, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <FontAwesome name="refresh" style={styles.flipIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureButton}>
            <FontAwesome name="circle" style={styles.captureIcon} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute space between buttons
    alignItems: 'flex-end', // Align items at the bottom
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  flipButton: {
    // Positioned at bottom-left
  },
  flipIcon: {
    fontSize: 30,
    color: 'white',
  },
  captureButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center', 
  },
  captureIcon: {
    color: 'white',
    fontSize: 70, // Bigger circle
  },
});