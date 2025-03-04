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

## Detailed Workflow
Frontend captures user input and calls /send-text API.
Backend forwards input to Dialogflow and retrieves response.
Frontend displays chatbot’s reply and stores history in LocalStorage.

## How to Run
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
Create a .env file in /backend folder:
GOOGLE_CLOUD_PROJECT_ID=ai-chatbot-447521
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json

4. Access the Application
Frontend: http://localhost:5174
Backend Test Endpoint: http://localhost:3001/test

## How to Test
API Testing (Postman Example)：

POST /send-text
Content-Type: application/json

{
    "message": "Hello"
}

Frontend Testing：
Open the chatbot interface, enter a message, and see the bot's reply.
Use the Clear button to reset chat history.

## Edge Cases Considered
Prevent sending empty messages.
Display user-friendly error messages when server is down.

## Key Features
Text-based chatbot with Dialogflow NLP integration.
Supports multi-turn conversations with context awareness.
Persists chat history across page reloads (via LocalStorage).
Limits history to last 10 messages to balance performance and usability.

## Challenges & Solutions
1. Dialogflow Setup
- Faced project ID and credential mismatch during initial setup.
- Resolved by thoroughly reviewing Dialogflow documentation and adjusting .env.

2. Frontend-Backend Communication
- Fixed CORS issues using appropriate middleware in Express.
- LocalStorage Management
- Implemented chat history capping to last 10 messages for better performance.

3. Learnings & Takeaways
- Dialogflow intent management and API integration.
- Improved handling of frontend-backend API flow.
- Learned to systematically debug and test APIs with Postman.
- Enhanced understanding of React component lifecycle and state management.

## Future Plans
- Add voice interaction (Speech-to-Text and Text-to-Speech).
- Introduce character-based role-playing for mental health scenarios.
- Explore emotion detection using sentiment analysis.
- Prepare for commercial-grade development focused on emotional well-being support.




