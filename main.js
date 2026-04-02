// main.js - Entry point for Jd AI application

import { UI } from './js/ui.js';
import { Chatbot } from './js/chatbot.js';
import { Storage } from './js/storage.js';
import { Conversations } from './js/conversations.js';
import { Theme } from './js/theme.js';
import { Export } from './js/export.js';
import { AI } from './js/ai.js';
import { Auth } from './js/auth.js';

/**
 * Main application class
 */
class JdAIApp {
    constructor() {
        this.storage = new Storage();
        this.auth = new Auth();
        this.conversations = new Conversations(this.auth);
        this.theme = new Theme(this.storage);
        this.export = new Export(this.conversations);
        this.ai = new AI();
        this.ui = new UI();
        this.chatbot = null; // Will be initialized after login

        // Expose instances globally for debugging
        window.jdAI = this.ai;
        window.jdAuth = this.auth;

        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        // Initialize authentication
        const authResult = await this.auth.init();

        if (authResult.error === 'Firebase configuration missing') {
            console.error('Firebase configuration is missing - using demo config');
            this.showFirebaseConfigError();
            return;
        }

        if (authResult.success) {
            // User is logged in, show chat interface
            await this.initializeChatInterface(authResult.user);
        } else {
            // User not logged in, show login form
            this.showLoginInterface();
        }
    }

    /**
     * Initialize chat interface for authenticated user
     * @param {Object} user - Authenticated user
     */
    async initializeChatInterface(user) {
        // Initialize chatbot
        this.chatbot = new Chatbot(this.ui, this.conversations, this.theme, this.export, this.ai);

        // Load conversations for user
        await this.conversations.loadConversations();

        // Set up event listeners
        this.ui.setupEventListeners(this.chatbot, this.conversations, this.theme, this.export, this.auth);
        this.setupGlobalEventListeners();

        // Initialize AI model
        await this.ai.initAI();

        // Load and display current conversation
        this.loadCurrentConversation();

        // Display welcome message if conversation is empty
        this.chatbot.displayWelcomeMessage();

        // Update UI with user info
        this.ui.showChatInterface(user);
    }

    /**
     * Show login interface
     */
    showLoginInterface() {
        this.ui.showLoginInterface(this.auth);
    }

    /**
     * Show Firebase configuration error
     */
    showFirebaseConfigError() {
        this.ui.showFirebaseConfigError();
    }

    /**
     * Set up global event listeners for cross-module communication
     */
    setupGlobalEventListeners() {
        // Handle theme changes
        document.addEventListener('themeChanged', (e) => {
            this.storage.saveTheme(e.detail.theme);
        });

        // Handle chat clearing
        document.addEventListener('clearChat', () => {
            this.ui.clearMessages();
            this.conversations.clearCurrentConversation();
        });

        // Handle conversation switching
        document.addEventListener('switchConversation', (e) => {
            this.switchConversation(e.detail.conversationId);
        });

        // Handle new conversation
        document.addEventListener('newConversation', () => {
            this.createNewConversation();
        });

        // Handle delete conversation
        document.addEventListener('deleteConversation', (e) => {
            this.deleteConversation(e.detail.conversationId);
        });

        // Handle logout
        document.addEventListener('logout', async () => {
            await this.handleLogout();
        });

        // Handle login success
        document.addEventListener('loginSuccess', async (e) => {
            await this.handleLogin(e.detail.user);
        });

        // Handle AI retry
        document.addEventListener('retryAI', async () => {
            const success = await this.ai.retryInitAI();
            if (success) {
                console.log('AI retry successful');
            } else {
                console.log('AI retry failed');
            }
        });
    }

    /**
     * Load and display current conversation
     */
    loadCurrentConversation() {
        const messages = this.conversations.getMessages();
        messages.forEach(message => {
            const timestamp = new Date(message.timestamp);
            this.ui.addMessage(message.content, message.sender, timestamp);
        });
        this.ui.updateConversationList(this.conversations.getAllConversations(), this.conversations.currentConversationId);
    }

    /**
     * Switch to a different conversation
     * @param {string} conversationId - ID of conversation to switch to
     */
    switchConversation(conversationId) {
        this.conversations.switchConversation(conversationId);
        this.ui.clearMessages();
        this.loadCurrentConversation();
        this.ui.updateConversationList(this.conversations.getAllConversations(), this.conversations.currentConversationId);
    }

    /**
     * Create a new conversation
     */
    async createNewConversation() {
        await this.conversations.createNewConversation();
        this.ui.clearMessages();
        this.loadCurrentConversation();
        this.ui.updateConversationList(this.conversations.getAllConversations(), this.conversations.currentConversationId);
        this.chatbot.displayWelcomeMessage();
    }

    /**
     * Handle successful login
     * @param {Object} user - Logged in user
     */
    async handleLogin(user) {
        await this.initializeChatInterface(user);
    }

    /**
     * Handle logout
     */
    async handleLogout() {
        // Clear chatbot instance
        this.chatbot = null;

        // Clear conversations
        this.conversations = new Conversations(this.auth);

        // Show login interface
        this.showLoginInterface();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JdAIApp();
});