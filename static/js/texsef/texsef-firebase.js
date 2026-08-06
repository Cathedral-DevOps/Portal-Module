import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

const firebaseConfig = window.APP_CONFIG?.firebaseConfig;
if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error("Firebase config is missing from the server-rendered page.");
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('form');
const errorMsg = document.getElementById('error-message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.style.display = 'none';

    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        const response = await fetch('/api/login/txdash', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: idToken })
        });
        const data = await response.json().catch(() => ({}));

        if (response.ok && data.redirect) {
            window.location.href = data.redirect;
        } else {
            throw new Error(data.error || 'Server validation failed');
        }
    } catch (error) {
        console.error('Login failed:', error);
        errorMsg.innerText = error.message || 'Unable to sign in. Please try again.';
        errorMsg.style.display = 'block';
    }
});
