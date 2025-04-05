# Online Education Platform

A modern web application for online education that provides video playback with AI-powered features like transcript generation, summarization, and an interactive chatbot.

## Features

- **Video Playback**: Watch educational videos with synchronized transcripts
- **AI-Powered Transcripts**: Automatically generate and display video transcripts
- **Smart Summarization**: Get concise summaries of video segments
- **Interactive Chatbot**: Ask questions about the course content and get AI-powered responses
- **Chapter Organization**: Transcripts are organized into chapters for easy navigation

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **AI Integration**: Google Generative AI (Gemini)
- **Video Transcripts**: YouTube Transcript API

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google AI API key
- YouTube video IDs for testing

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/online-education-platform.git
   cd online-education-platform
   ```

2. Install dependencies for both frontend and backend:
   ```
   # Install backend dependencies
   cd server-education
   npm install

   # Install frontend dependencies
   cd ../OnlineEducation
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in the server-education directory
   - Add your Google AI API key to the `.env` file

## Running the Application

1. Start the backend server:
   ```
   cd server-education
   npm start
   ```

2. Start the frontend development server:
   ```
   cd OnlineEducation
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter a YouTube video ID in the input field
2. Click "Load Video" to start playback
3. Use the "Show Transcript" button to view the video transcript
4. Ask questions in the chat interface to get AI-powered responses
5. Use the "Summarize" button to get a summary of the current video segment

## API Endpoints

- `POST /api/get-subtitles`: Fetch video transcripts
- `POST /api/summarize`: Generate summaries of video segments
- `POST /api/chat`: Interact with the AI chatbot

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Generative AI for providing the AI capabilities
- YouTube Transcript API for transcript generation
- All contributors and users of this platform 