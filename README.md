# Jd AI - Intelligent Chat Assistant

Jd AI is a modern web-based chat application powered by AI, featuring dual authentication (Google OAuth + Email/Password) and cloud-based conversation storage.

## Features

- 🤖 **AI-Powered Conversations** - Local AI model using Transformers.js
- 🔐 **Dual Authentication** - Google OAuth or Email/Password sign-in
- ☁️ **Cloud Storage** - Conversations stored securely in Firebase Firestore
- 🎨 **Modern UI** - Clean, responsive interface with theme support
- 📱 **Multi-Device Sync** - Access your conversations from any device
- ⚡ **Real-time Updates** - Instant message synchronization
- 🎤 **Voice Input** - Speak instead of type (Chrome/Edge/Safari)
- 👍👎 **Message Reactions** - Give feedback on AI responses
- 🔍 **Conversation Search** - Find specific conversations instantly
- 📋 **Copy Messages** - Copy any message to clipboard
- ⌨️ **Enhanced Commands** - 15+ useful slash commands
- 🔔 **Reminders & Todos** - Built-in task management
- 🌤️ **Quick Utilities** - Weather, calculator, translator, and more

## Authentication Options

### Google OAuth (Recommended)
- One-click sign-in with Google account
- Automatic profile information
- Secure OAuth 2.0 flow

### Email & Password
- Traditional email/password authentication
- Secure password hashing by Firebase
- Account creation and management

## Setup Instructions

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Google" provider
   - Enable "Email/Password" provider
4. Enable Firestore:
   - Go to Firestore Database
   - Create a database in production mode
5. Get your Firebase config:
   - Go to Project settings > General
   - Scroll down to "Your apps" section
   - Click "Add app" and select Web app (</>)
   - Copy the config object

### 2. Update Firebase Config

Edit the Firebase configuration in `index.html`:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

Replace the placeholder values with your actual Firebase config.

### 3. Apply Security Rules

Copy the contents of `firestore-rules.txt` to your Firestore security rules in the Firebase Console.

### 4. Run the Application

1. Start a local web server:
   ```bash
   python -m http.server 8000
   ```

2. Open `http://localhost:8000` in your browser

3. **First Time Setup**: If you see a "Firebase Configuration Required" screen, follow the setup steps

4. **After Configuration**: Choose your authentication method:
   - Click "Google" tab and sign in with Google
   - Or click "Email" tab to sign up/sign in with email

### 5. Testing Your Setup

Once Firebase is configured, you can test the setup:

1. Open browser developer tools (F12)
2. Go to the Console tab
3. Run: `testFirebaseConfig()` to verify configuration
4. Run: `testAuthMethods()` to test authentication components

## Troubleshooting

### Configuration Error Screen
If you see "Firebase Configuration Required":
- Follow the step-by-step guide on the screen
- Update `index.html` with your actual Firebase config
- Click "Reload After Configuration"

### Google OAuth Issues
- Ensure Firebase project has Google provider enabled
- Check browser pop-up blocker settings
- Verify Firebase config is correct

### Email/Password Issues
- Ensure Email/Password provider is enabled in Firebase
- Check password meets minimum requirements (6+ characters)
- Verify email format is correct

### Firestore Issues
- Ensure Firestore database is created
- Check security rules are applied
- Verify user authentication before accessing data

### Testing Authentication
- Use browser console commands: `testFirebaseConfig()` and `testAuthMethods()`
- Check browser network tab for Firebase API calls
- Verify no console errors appear

## Project Structure

```
jd-ai/
├── index.html          # Main HTML with dual auth UI
├── style.css           # Styling for auth forms and themes
├── main.js            # Application entry point
├── js/
│   ├── auth.js        # Firebase dual authentication
│   ├── conversations.js # Firestore conversation management
│   ├── chatbot.js     # AI chat logic
│   ├── commands.js    # Slash commands
│   ├── ui.js          # User interface with auth handling
│   ├── ai.js          # AI model integration
│   ├── theme.js       # Theme management
│   └── export.js      # Conversation export
├── ../Jdia.jpg        # Logo file
├── README.md          # This file
└── firestore-rules.txt # Security rules template
```

## User Experience

1. **First Visit**: Choose authentication method
2. **Google OAuth**: One-click sign-in, instant access
3. **Email Auth**: Sign up with email/password or sign in to existing account
4. **Chat Interface**: Full AI-powered conversations with cloud sync
5. **Multi-Device**: Access conversations from any device/browser

## New Features Added

### 🎤 Voice Input
- Click the microphone button to speak instead of type
- Works in Chrome, Edge, and Safari browsers
- Automatic speech recognition with real-time feedback

### 👍👎 Message Reactions
- Hover over AI messages to see reaction buttons
- Give feedback with thumbs up/down
- Helps improve future AI responses

### 🔍 Conversation Search
- Search through all your conversations instantly
- Filter by conversation titles
- Clear search with the X button

### 📋 Copy Messages
- Click the copy button on any message
- Copies text to clipboard
- Shows "Copied!" confirmation

### 🔔 Enhanced Commands
- **Reminders**: `/remind buy groceries` (demo notifications)
- **Todos**: `/todo finish project` (persistent task list)
- **Quick Utils**: Weather, calculator, translator, dictionary
- **Motivation**: Get inspirational messages
- **Statistics**: View your chat usage stats

### ⌨️ Keyboard Shortcuts
- `Enter` - Send message
- `Ctrl/Cmd + /` - Focus command input
- `Ctrl/Cmd + K` - New conversation
- `Ctrl/Cmd + E` - Export conversation
- `Ctrl/Cmd + L` - Clear conversation
- `Ctrl/Cmd + T` - Toggle theme
- `Escape` - Close modals

## Commands

- `/help` - Show available commands
- `/time` - Display current time
- `/date` - Display current date
- `/weather` - Show simulated weather info
- `/joke` - Tell a random joke
- `/calc <expression>` - Calculate mathematical expressions
- `/remind <message>` - Set a reminder notification
- `/todo <task>` - Add a task to your todo list
- `/translate <text>` - Simulate text translation
- `/define <word>` - Get word definitions
- `/motivate` - Get a motivational message
- `/stats` - View conversation statistics
- `/clear` - Clear current conversation
- `/theme <light|dark>` - Change theme
- `/newchat` - Create new conversation
- `/deletechat` - Delete current conversation
- `/export` - Export conversation
- `/import` - Import conversation
- `/testai` - Test AI status
- `/shortcuts` - Show keyboard shortcuts

## Browser Support

- Modern browsers with ES6+ support
- WebAssembly support for AI models
- HTTPS required for production (Firebase requirement)

## Development

The application uses vanilla JavaScript with modern ES6+ modules. No build process required - just serve the files with a web server.

## Troubleshooting

### Google OAuth Issues
- Ensure Firebase project has Google provider enabled
- Check browser pop-up blocker settings
- Verify Firebase config is correct

### Email/Password Issues
- Ensure Email/Password provider is enabled in Firebase
- Check password meets minimum requirements (6+ characters)
- Verify email format is correct

### Firestore Issues
- Ensure Firestore database is created
- Check security rules are applied
- Verify user authentication before accessing data

## License

This project is for educational and personal use.