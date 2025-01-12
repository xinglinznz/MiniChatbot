import { dialogflowConfig } from '../config/dialogflow';

export interface DialogflowResponse {
  text: string;
  intent: string;
  confidence: number;
}

//Fuction to send a message to Dialogflow and get a response
export async function sendToDialogflow(message: string): Promise<DialogflowResponse> {
  try {
    // Log the API endpoint for debugging
    console.log('Sending message to:', `${dialogflowConfig.apiUrl}/send-text`); // 添加日志
    // Make a POST request to the Dialogflow API(use fetch)
    const response = await fetch(`${dialogflowConfig.apiUrl}/send-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    // Handle different API errors
    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData); // add error log
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Log errors that occur during the API request
    console.error('Dialogflow API Error:', error);
    throw error;
  }
}