// Firebase setup shared by the login page and the tracker page.
// Firebase web config values are not secrets: access is controlled by the
// sign-in methods enabled in the Firebase console and by security rules.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9WhKMPzVQWzwAs-1zVhJl0G-Dtz7UOL8",
  authDomain: "livelocationtracker-15014.firebaseapp.com",
  projectId: "livelocationtracker-15014",
  storageBucket: "livelocationtracker-15014.firebasestorage.app",
  messagingSenderId: "707582072085",
  appId: "1:707582072085:web:afdafad4e49b3e2a3ec51c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
