import { StyleSheet, Button, TouchableOpacity, Alert} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'expo-image';
import {useRouter} from 'expo-router';

export default function start() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [previewUri, setPreviewUri] = useState(false)
  const router = useRouter();

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

  const handleCapture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if(!cameraRef.current){
      console.error("cameraRef is not defined");
    }
    if (photo?.uri) {
      setUri(photo.uri);
      setPreviewUri(true);
      console.log("photo", photo);
    } else {
      console.error("Failed to capture photo", Error);
    }
  };

  const handleRetry = () => {
    setUri(null);
    setPreviewUri(false);
  }

  const handleNav = () => {
    router.push("/");
  }

  if(previewUri && uri){
    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.camera} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={handleRetry}>
            <Text style={styles.flipIcon}>Retake</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <FontAwesome name="refresh" style={styles.flipIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton}>
            <FontAwesome name="circle" style={styles.captureIcon} onPress={handleCapture} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleNav} >
            <FontAwesome name="home" style={styles.flipIcon} />
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  flipButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipIcon: {
    fontSize: 30,
    color: 'white',
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', 
    bottom: 30,
    left: 0, 
    right: 0, 
  },
  captureIcon: {
    color: 'white',
    fontSize: 70, 
  },
});