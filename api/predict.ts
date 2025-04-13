// frontend/src/api/predict.ts
import { Image as RNImage } from 'react-native';
import Constants from 'expo-constants';

export async function predictTrash(imageResource?: any) {
  const formData = new FormData();

  const imageToSend = imageResource;
  const imageUri = RNImage.resolveAssetSource(imageToSend).uri;

  formData.append('image', {
    uri: imageUri,
    name: 'IMG_7457.jpg',
    type: 'image/jpeg',
  } as any);

  formData.append('conf_threshold', '0.36');

  const apiUrl =
    Constants.expoConfig?.extra?.apiUrl ||
    Constants.manifest?.extra?.apiUrl ||
    'https://5f29-137-151-175-97.ngrok-free.app';

  const fullUrl = `${apiUrl}/predict`;

  const response = await fetch(fullUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const jsonResponse = await response.json();

  let predictedImgUri = '';
  let prediction = '';

  // This is the real fix: if response has `data`, extract from it
  if (jsonResponse && Array.isArray(jsonResponse.data) && jsonResponse.data.length >= 4) {
    const imageObj = jsonResponse.data[2];
    predictedImgUri = imageObj?.url || '';
    prediction = jsonResponse.data[3];
  } else {
    prediction = JSON.stringify(jsonResponse, null, 2);
  }

  return { predictedImgUri, prediction };
}
