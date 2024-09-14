import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = aiResponse.data[0].url;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error generating image" });
  }
});

export default router;