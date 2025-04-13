import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { Text, View } from '@/components/Themed';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { predictTrash } from '@/api/predict';
import { Spinner } from "@/components/ui/spinner";
import { callIncrement } from '@/app/pointsManager';


export default function Start() {
  // Camera and Permission State
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [previewUri, setPreviewUri] = useState(false);

  // Prediction & UI State
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  // New state variable for the predicted image URL
  const [predictedImgUri, setPredictedImgUri] = useState<string | null>(null);

  const router = useRouter();

  // Permission Check
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Toggle between front and back camera
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // Capture the photo using the camera reference
  const handleCapture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (!cameraRef.current) {
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

  // Reset the image preview so the user can retake the photo
  const handleRetry = () => {
    setUri(null);
    setPreviewUri(false);
    setIsPredicting(false);
    setPrediction('');
    setPredictedImgUri(null);
  };

  // Reset to default view after displaying results
  const handleReset = () => {
    setUri(null);
    setPreviewUri(false);
    setIsPredicting(false);
    setPrediction('');
    setPredictedImgUri(null);
  };

  // When "Use" is pressed, call the prediction API with the captured image
  const handleUse = async () => {
    if (uri) {
      setIsPredicting(true);
      setLoading(true);
      try {
        const { predictedImgUri, prediction } = await predictTrash({ uri });
        console.log('Filtered prediction result:', { predictedImgUri, prediction });
  
        if (predictedImgUri) {
          setPredictedImgUri(predictedImgUri);
        }
        setPrediction(prediction);
        callIncrement();
      } catch (error) {
        if (error instanceof Error) {
          console.error('Prediction failed:', error.message);
          setPrediction(`Glip is confused by the response.`);
        } else {
          console.error('Prediction failed:', error);
          setPrediction(`Glip thinks something is wrong with you.`);
        }
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No image URI available to use.");
    }
  };

  // If prediction mode is enabled, show the predicted image (if available) with prediction result
  if (isPredicting) {
    return (
      <View style={styles.container}>
        {/* If predictedImgUri is available, show that image; otherwise fallback to the captured image */}
        {predictedImgUri ? (
          <Image source={{ uri: predictedImgUri }} style={styles.previewImage} />
        ) : (
          uri && <Image source={{ uri }} style={styles.previewImage} />
        )}
        {loading ? (
          <Spinner size="small" />
        ) : (
          <>
            <Text style={styles.statusText}>{prediction}</Text>
            <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.flipButton} onPress={handleRetry}>
              <FontAwesome name="refresh" style={styles.flipIcon}/>
            </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }

  // When a photo has been captured (preview mode), show the preview with "Retake" and "Use" buttons
  if (previewUri && uri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.camera} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={handleRetry}>
            <FontAwesome name="refresh" style={styles.flipIcon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={handleUse}>
            <Entypo name="arrow-bold-right" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Main Camera View
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
  previewImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  flipButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipIcon: {
    fontSize: 40,
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
  useButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginLeft: 10,
  },
  useButtonText: {
    color: 'white',
    fontSize: 16,
  },
  statusText: {
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});
