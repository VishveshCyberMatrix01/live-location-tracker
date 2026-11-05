import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const app = document.getElementById("app");
const userEmail = document.getElementById("userEmail");
const signOutBtn = document.getElementById("signOutBtn");

// Show the tracker only to signed-in users; send everyone else to the login page.
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace("login.html");
    return;
  }
  userEmail.textContent = user.email;
  app.hidden = false;
});

signOutBtn.addEventListener("click", async () => {
  document.getElementById("stopBtn").click();
  await signOut(auth);
});
