import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const switchBtn = document.getElementById("switchBtn");
const switchText = document.getElementById("switchText");
const formTitle = document.getElementById("formTitle");

let signingUp = false;

const ERRORS = {
  "auth/invalid-email": "Enter a valid email address.",
  "auth/missing-password": "Enter your password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-not-found": "Incorrect email or password.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/email-already-in-use": "An account with this email already exists. Log in instead.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/too-many-requests": "Too many attempts. Wait a moment and try again.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
  "auth/operation-not-allowed": "Email/password sign-in is not enabled for this project."
};

function showMessage(text, type = "error") {
  message.textContent = text;
  message.className = `message ${type}`;
  message.hidden = false;
}

function errorText(error) {
  return ERRORS[error.code] || "Something went wrong. Please try again.";
}

function setBusy(busy) {
  submitBtn.disabled = busy;
  resetBtn.disabled = busy;
  switchBtn.disabled = busy;
}

function setMode(signUp) {
  signingUp = signUp;
  formTitle.textContent = signUp ? "Create account" : "Log in";
  submitBtn.textContent = signUp ? "Sign up" : "Log in";
  switchText.textContent = signUp ? "Already have an account?" : "Don't have an account?";
  switchBtn.textContent = signUp ? "Log in" : "Sign up";
  passwordInput.autocomplete = signUp ? "new-password" : "current-password";
  resetBtn.hidden = signUp;
  message.hidden = true;
}

// Already signed in (or just signed in): go to the tracker.
onAuthStateChanged(auth, (user) => {
  if (user) window.location.replace("index.html");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !emailInput.checkValidity()) return showMessage(ERRORS["auth/invalid-email"]);
  if (!password) return showMessage(ERRORS["auth/missing-password"]);
  if (signingUp && password.length < 6) return showMessage(ERRORS["auth/weak-password"]);

  setBusy(true);
  message.hidden = true;
  try {
    if (signingUp) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
    // onAuthStateChanged handles the redirect.
  } catch (error) {
    showMessage(errorText(error));
    setBusy(false);
  }
});

resetBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  if (!email || !emailInput.checkValidity()) {
    return showMessage("Enter your email address above, then click “Forgot password?” again.");
  }
  setBusy(true);
  try {
    await sendPasswordResetEmail(auth, email);
    // Same message whether or not the account exists, so emails can't be probed.
    showMessage("If an account exists for that email, a password reset link is on its way.", "success");
  } catch (error) {
    showMessage(errorText(error));
  } finally {
    setBusy(false);
  }
});

switchBtn.addEventListener("click", () => setMode(!signingUp));
