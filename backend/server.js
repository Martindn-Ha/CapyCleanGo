// server.js
import express from 'express';
import fetch from 'node-fetch';
import multer from 'multer';
import { Client } from '@gradio/client';

const app = express();
const upload = multer(); // This stores the uploaded file(s) in memory

app.use(express.json());

app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    let imageBuffer;

    // If a file is uploaded, use that. Otherwise, fall back to the default bus image.
    if (req.file && req.file.buffer) {
      console.log("Using client-supplied image.");
      imageBuffer = req.file.buffer;
    } else {
      console.warn("No file provided, using default bus image.");
      const response = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
      imageBuffer = await response.buffer();
    }

    // Optionally, if the client supplies a confidence threshold in the request body, parse it.
    let confThreshold = parseFloat(req.body.conf_threshold);
    if (isNaN(confThreshold)) {
      confThreshold = 0.4; // set a default threshold if not provided or invalid
    }

    // Connect to the Gradio client
    const client = await Client.connect("mrdbourke/trashify_demo_v3");

    // Call the prediction endpoint using the provided (or fallback) image
    const result = await client.predict("/predict", {
      image: imageBuffer,
      conf_threshold: confThreshold,
    });

    res.json({ data: result.data });
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

