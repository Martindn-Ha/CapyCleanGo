// frontend/src/api/predict.ts
import { Image as RNImage } from 'react-native';
import Constants from 'expo-constants';

export async function predictTrash(imageResource?: any) {
  const formData = new FormData();

  // Use the passed imageResource (or a default bundled asset)
  const imageToSend = imageResource;
  const imageUri = RNImage.resolveAssetSource(imageToSend).uri;

  // Append the image to the FormData (casting to any for TypeScript)
  formData.append('image', {
    uri: imageUri,
    name: 'IMG_7457.jpg', // Adjust if necessary
    type: 'image/jpeg',
  } as any);

  formData.append('conf_threshold', '0.4');

  // Get the API URL from app.json extra configuration
  const apiUrl =
    Constants.expoConfig?.extra?.apiUrl ||
    Constants.manifest?.extra?.apiUrl ||
    'https://5f29-137-151-175-97.ngrok-free.app'; // Fallback to a default (ngrok URL)

  // Construct the full URL for the predict endpoint.
  const fullUrl = `${apiUrl}/predict`;
  
  // Send the POST request
  const response = await fetch(fullUrl, {
    method: 'POST',
    body: formData,
    // It's typically best not to manually set 'Content-Type' for FormData in React Native.
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
}
