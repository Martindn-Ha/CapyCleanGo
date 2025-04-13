// frontend/src/components/PredictComponent.tsx
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { predictTrash } from '@/api/predict'; // adjust the path if needed

const PredictComponent = () => {
  // Define a local state to store prediction results
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Async handler to call the API
  const handlePredict = async () => {
    try {
      setLoading(true);
      const result = await predictTrash();
      setPrediction(JSON.stringify(result)); // update with the result
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Make Prediction" onPress={handlePredict} />
      {loading && <Text>Loading...</Text>}
      {prediction && <Text>Prediction: {prediction}</Text>}
    </View>
  );
};

export default PredictComponent;
