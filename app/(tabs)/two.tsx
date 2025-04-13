// frontend/src/components/PredictComponent.tsx
import React, { useState } from 'react';
import { View, Button, Text, Image as RNImage } from 'react-native';
import { predictTrash } from '@/api/predict'; // Import the API helper function
import Constants from 'expo-constants';

// Import the default image from your assets folder
const defaultImage = require('@/assets/images/IMG_7457.jpg');

const PredictComponent = () => {
  const [prediction, setPrediction] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // The handlePredict function now calls predictTrash and uses its returned value.
  const handlePredict = async () => {
    setLoading(true);
    try {
      // Call the predictTrash API helper function with the default image.
      const result = await predictTrash(defaultImage);
      console.log('Filtered prediction result:', result);
      setPrediction(JSON.stringify(result, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        console.error('Prediction failed:', error.message);
        setPrediction(`Error: ${error.message}`);
      } else {
        console.error('Prediction failed:', error);
        setPrediction(`Error: ${JSON.stringify(error)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <RNImage
        source={defaultImage}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Button title="Predict" onPress={handlePredict} disabled={loading} />
      {loading && <Text style={{ marginTop: 10 }}>Loading...</Text>}
      {prediction !== '' && (
        <Text style={{ marginTop: 10 }}>{prediction}</Text>
      )}
    </View>
  );
};

export default PredictComponent;
