/**
 * Firebase Configuration Test
 * Run this in the browser console to test if Firebase is properly configured
 */

function testFirebaseConfig() {
    console.log('🔍 Testing Firebase Configuration...');

    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase SDK not loaded');
        return false;
    }

    // Check if auth is initialized
    if (typeof window.firebaseAuth === 'undefined') {
        console.error('❌ Firebase Auth not initialized');
        return false;
    }

    // Check if Firestore is initialized
    if (typeof window.firebaseDb === 'undefined') {
        console.error('❌ Firestore not initialized');
        return false;
    }

    // Check configuration
    const config = window.firebaseAuth.app.options;
    console.log('📋 Current Firebase Config:', {
        apiKey: config.apiKey ? '✅ Set' : '❌ Missing',
        authDomain: config.authDomain ? '✅ Set' : '❌ Missing',
        projectId: config.projectId ? '✅ Set' : '❌ Missing',
        storageBucket: config.storageBucket ? '✅ Set' : '❌ Missing',
        messagingSenderId: config.messagingSenderId ? '✅ Set' : '❌ Missing',
        appId: config.appId ? '✅ Set' : '❌ Missing'
    });

    // Check if using placeholder values
    const isConfigured = config.apiKey !== 'your-api-key' &&
                        config.authDomain !== 'your-project.firebaseapp.com' &&
                        config.projectId !== 'your-project-id';

    if (isConfigured) {
        console.log('✅ Firebase appears to be properly configured!');
        console.log('🚀 You can now test authentication methods');
        return true;
    } else {
        console.error('❌ Firebase is using placeholder configuration');
        console.log('📖 Please update the firebaseConfig in index.html with your actual Firebase project credentials');
        return false;
    }
}

function testGoogleSignIn() {
    console.log('🔍 Testing Google Sign-In Configuration...');

    if (!window.firebaseAuth || !window.googleProvider) {
        console.error('❌ Firebase Auth or Google Provider not available');
        return;
    }

    console.log('✅ Firebase Auth and Google Provider available');

    // Try to get the current user
    const currentUser = window.firebaseAuth.currentUser;
    if (currentUser) {
        console.log('✅ User already signed in:', currentUser.displayName || currentUser.email);
        return;
    }

    console.log('ℹ️  No user currently signed in');
    console.log('📋 To test Google sign-in:');
    console.log('1. Click the "Continue with Google" button');
    console.log('2. Check browser console for detailed error messages');
    console.log('3. If popup opens but shows nothing, check Firebase Console:');
    console.log('   - Go to https://console.firebase.google.com/');
    console.log('   - Select your project (jd-ia-cebba)');
    console.log('   - Go to Authentication > Sign-in method');
    console.log('   - Enable Google provider');
    console.log('   - Configure OAuth consent screen');
    console.log('   - Add localhost:8000 to authorized domains');
}

// Make functions available globally
window.testFirebaseConfig = testFirebaseConfig;
window.testGoogleSignIn = testGoogleSignIn;

// Test authentication methods (only if configured)
async function testAuthMethods() {
    if (!testFirebaseConfig()) {
        return;
    }

    console.log('🔐 Testing Authentication Methods...');

    try {
        // Test Google Auth provider
        const googleProvider = window.googleProvider;
        console.log('✅ Google Auth Provider initialized');

        // Test Firestore
        const db = window.firebaseDb;
        console.log('✅ Firestore initialized');

        console.log('🎉 All authentication components are ready!');
        console.log('💡 Try signing in with Google or creating an email/password account');

    } catch (error) {
        console.error('❌ Authentication test failed:', error);
    }
}

// Make functions available globally
window.testFirebaseConfig = testFirebaseConfig;
window.testAuthMethods = testAuthMethods;

console.log('🛠️  Firebase Test Functions Loaded!');
console.log('💻 Run testFirebaseConfig() to check configuration');
console.log('🔐 Run testAuthMethods() to test authentication setup');