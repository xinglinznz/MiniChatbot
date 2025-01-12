import express from 'express';
import cors from 'cors';
import { SessionsClient } from '@google-cloud/dialogflow';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 
const keyFilePath = path.join(__dirname, '..', 'config', 'ai-chatbot-447521-0bfa3d6648db.json');
console.log('Keyfile path:', keyFilePath); 

// Set up Dialogflow client
const sessionClient = new SessionsClient({
  keyFilename: keyFilePath
});

app.post('/send-text', async (req, res) => {
  try {
    const { message } = req.body;
    const projectId = 'ai-chatbot-447521';
    const sessionId = uuidv4();

    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en-US',
        },
      },
    };

    const [response] = await sessionClient.detectIntent(request);
    const result = response.queryResult;

    if (!result) {
      throw new Error('No result from Dialogflow');
    }

    res.json({
      text: result.fulfillmentText || '',
      intent: result.intent?.displayName || '',
      confidence: result.intentDetectionConfidence || 0
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to process message'
    });
  }
});

// Add a test case
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Using keyfile: ${keyFilePath}`);
});