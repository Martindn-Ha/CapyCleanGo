// server.js
import express from 'express';
import fetch from 'node-fetch';
import { Client } from '@gradio/client';

const app = express();

app.use(express.json());

app.post('/predict', async (req, res) => {
  try {
    // Fetch the sample image as a buffer (or blob, if supported)
    const response = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
    const exampleImage = await response.buffer();

    // Connect to the Gradio client
    const client = await Client.connect("mrdbourke/trashify_demo_v3");

    // Call the prediction endpoint
    const result = await client.predict("/predict", {
      image: exampleImage,
      conf_threshold: 0.4,
    });

    res.json({ data: result.data });
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
