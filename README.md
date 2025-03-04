# Mini Chatbot

## Description
Mini Chatbot is a web-based chatbot application that integrates a **React frontend** with an **Express backend**. It uses **Dialogflow API** for natural language processing (NLP) to generate intelligent, context-aware responses.  

This project is an **exploration into conversational AI development**, with a focus on simplicity and functionality.  
The long-term vision is to evolve this chatbot into a **virtual assistant for mental health support** through conversational therapy.

---

## Objectives
- Build a functional chatbot using modern full-stack architecture.
- Integrate Dialogflow for NLP-powered user input processing.
- Establish smooth frontend-backend communication.
- Explore and practice new tools: **React, Express, Dialogflow**.
- Lay groundwork for future voice interaction and role-playing features.

---

## Tech Stack
| Layer       | Technology             |
|-------------|------------------|
| Frontend    | React + TypeScript     |
| Backend     | Express (Node.js)      |
| NLP         | Dialogflow API         |
| Storage     | LocalStorage           |
| Tools       | Postman, VSCode, Browser DevTools |

---

## Why This Stack?
- **Dialogflow**: Pre-trained NLP models simplify development and speed up prototyping.
- **React**: Component-based structure supports rapid UI building and easy maintenance.
- **Express**: Lightweight framework, ideal for quick API development.
- **LocalStorage**: Simple solution to persist chat history locally, no need for full database.

---

## System Architecture
```text
Frontend (React)  <-->  Backend (Express)  <-->  Dialogflow (NLP Engine)
                          |
                    LocalStorage (chat history)

---
### Detailed Workflow
Frontend captures user input and sends it to the /send-text API.
Backend forwards the input to Dialogflow and retrieves the response.
Frontend displays the chatbot’s reply and stores the conversation history in LocalStorage.

### How to Run
1. Clone the Repository
git clone https://github.com/xinglinznz/MiniChatbot.git
cd mini-chatbot

2. Install Dependencies
Frontend：
npm install
npm run dev

Backend：
cd backend
npm install
npm start

3. Set Up Environment Variables
Create a .env file in /backend folder with the following content:
GOOGLE_CLOUD_PROJECT_ID=ai-chatbot-447521
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json

4. Access the Application
Frontend: http://localhost:5174
Backend Test Endpoint: http://localhost:3001/test

### How to Test
API Testing (Postman Example)

POST /send-text
Content-Type: application/json

{
    "message": "Hello"
}

### Frontend Testing
Open the chatbot interface.
Enter a message and observe the chatbot’s reply.
Use the Clear button to reset the chat history.
Edge Cases Considered
Prevent sending empty messages.
Display user-friendly error messages when the server is down or the response fails.

### Key Features
Text-based chatbot with Dialogflow NLP integration.
Supports multi-turn conversations with context awareness.
Chat history is persisted across page reloads using LocalStorage.
History is capped at 10 messages to maintain performance.

### Challenges & Solutions
1. Dialogflow Setup
Faced initial setup errors due to incorrect project IDs and credential mismatches.
Solution: Carefully reviewed Dialogflow documentation and corrected .env configuration.

2. Frontend-Backend Communication
Encountered CORS issues during development.
Solution: Added proper CORS headers using Express middleware.

3. LocalStorage Management
Challenge: Unlimited chat history would degrade performance over time.
Solution: Added logic to limit chat history to the latest 10 messages for performance and usability.

### Reflection and Learnings
1. Dialogflow Integration
Learned to create and manage intents and set up context handling.
Gained hands-on experience in working with pre-trained NLP models.
Frontend-Backend Communication
Strengthened understanding of RESTful API design and integration.
Gained experience debugging real-time communication issues (like CORS).

2. Error Handling
Implemented robust handling for:
Empty messages
Network failures
Unexpected responses from Dialogflow

3. New Technologies
Gained practical understanding of:
React’s component lifecycle and state management
Fullstack integration using Express as the backend service layer
Systematic API testing using Postman

### Future Plans
1. Voice Interaction
Add support for:
Speech-to-Text (user can talk to the bot)
Text-to-Speech (bot can reply with voice)

2. Role-Playing Scenarios
Design predefined character personalities to enable role-playing conversations for:
Educational scenarios
Mental health simulation and guidance

3. Emotion Detection
Explore sentiment analysis to allow chatbot to adjust tone and content based on user emotions.

4. Commercial Development
Long-term goal: evolve into a commercial-grade mental health virtual assistant, combining:
Conversational AI
Emotional intelligence
Adaptive responses based on context and history




