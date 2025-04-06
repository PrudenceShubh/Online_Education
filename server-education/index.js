const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");
const axios = require('axios');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();

// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies with increased limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Add API key validation
if (!process.env.GOOGLE_API_KEY) {
  console.error('ERROR: GOOGLE_API_KEY is not set in environment variables');
  process.exit(1);
}

// Initialize Google AI with the new SDK
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// Validate API key on startup
async function validateAPIKey() {
  try {
    // Simple validation by trying to generate content
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "test",
    });
    console.log('Google AI API key validated successfully');
  } catch (error) {
    console.error('Error validating Google AI API key:', error.message);
    // Don't exit, just log the error and continue
    console.log('Continuing without API validation...');
  }
}

validateAPIKey();

// Add this route before your existing endpoints
app.post('/api/summarize', async (req, res) => {
  try {
    const { transcript, timestamp } = req.body;
    
    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Please provide a concise summary of this video transcript segment:
      "${transcript}"
      Focus on the key points and main ideas. Keep it brief but informative.`,
    });
    
    const summary = response.text;

    res.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ 
      error: 'Could not generate summary',
      details: error.message 
    });
  }
});

app.post('/api/get-subtitles', async (req, res) => {
  try {
    const { videoId } = req.body;
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    if (!transcript || transcript.length === 0) {
      return res.status(404).json({ error: 'No transcript found for this video' });
    }

    // Format timestamps and organize by chapters
    const formattedTranscript = transcript.map(entry => ({
      ...entry,
      formattedTime: formatTime(entry.start), // Use start time instead of offset
      text: entry.text,
      duration: entry.duration,
      start: entry.start
    }));

    // Group transcripts into chapters (every 5 minutes)
    const chapters = groupIntoChapters(formattedTranscript);

    const subtitles = formattedTranscript.map(entry => entry.text).join(' ');
    res.json({ 
      subtitles,
      segments: formattedTranscript,
      chapters
    });
  } catch (error) {
    console.error('Error fetching subtitles:', error);
    res.status(500).json({ 
      error: 'Could not retrieve subtitles',
      details: error.message 
    });
  }
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function groupIntoChapters(transcript) {
  const chapterLength = 300; // 5 minutes in seconds
  const chapters = {};
  
  transcript.forEach(entry => {
    const chapterIndex = Math.floor(entry.start / chapterLength);
    const chapterName = `Chapter ${chapterIndex + 1}`;
    
    if (!chapters[chapterName]) {
      chapters[chapterName] = {
        startTime: formatTime(chapterIndex * chapterLength),
        entries: []
      };
    }
    
    chapters[chapterName].entries.push(entry);
  });
  
  return chapters;
}

// Start the server with fixed port
const PORT = 5004; // Use a fixed port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});

// Add this after your other endpoints
app.post('/api/chat', async (req, res) => {
  try {
    const { message, courseTitle, transcript } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required',
        isBot: true 
      });
    }

    let context = '';
    if (transcript) {
      context += `Here's the relevant video transcript for context:\n${transcript}\n\n`;
    }
    if (courseTitle) {
      context += `This question is about the course: ${courseTitle}\n\n`;
    }

    const prompt = `You are a helpful AI teaching assistant. Your goal is to help students understand the course material better.

Context:
${context}

Student Question: ${message}

Please provide a clear, informative, and educational response. If the question relates to the video content, reference specific parts from the transcript. If you're unsure about something, be honest about it.`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    
    const text = response.text;
    
    // Validate response
    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from AI');
    }

    res.json({ 
      text: text,
      isBot: true
    });
  } catch (error) {
    console.error('Chat error:', error);
    
    // Provide more specific error messages
    let errorMessage = "I apologize, but I encountered an error. ";
    if (error.message.includes('API key')) {
      errorMessage += "There seems to be an issue with the API configuration.";
    } else if (error.message.includes('Empty response')) {
      errorMessage += "I couldn't generate a proper response. Please try rephrasing your question.";
    } else if (error.message.includes('rate limit')) {
      errorMessage += "The service is currently busy. Please try again in a moment.";
    } else {
      errorMessage += "Please try asking your question again or rephrase it.";
    }

    res.status(500).json({ 
      text: errorMessage,
      isBot: true,
      error: true
    });
  }
});
