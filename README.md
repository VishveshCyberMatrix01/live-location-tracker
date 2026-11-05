# 📍 Live Location Tracker

A lightweight web page (no build step) that shows your device's live location
(latitude, longitude and accuracy) and a one-click Google Maps link. It uses the
browser's Geolocation API, and users sign in with Firebase Authentication
(email and password). Your location never leaves the browser.

## 🚀 Run It

It's a static site, so there's nothing to build or install.

- **Locally:** serve the folder and open http://localhost:8000

  ```bash
  python3 -m http.server 8000
  ```

- **Online:** publish the folder with any static host (e.g. GitHub Pages).

> Browsers only allow location access on HTTPS pages or `localhost`.

## 🔑 Firebase Setup (for login)

Sign-in uses the Firebase project configured in `firebase.js`. In the
[Firebase console](https://console.firebase.google.com/) for that project:

1. Go to **Authentication → Sign-in method** and enable **Email/Password**.
2. Go to **Authentication → Settings → Authorized domains** and add the domain
   you host the site on (`localhost` is allowed by default).

To use a different Firebase project, replace the config object in `firebase.js`
with the one from **Project settings → Your apps**.

---

## 🛠 How to Use

1. Open the live link on any browser
2. Log in, or click **“Sign up”** to create an account
3. Click **“Share Location”**
4. Allow location access when prompted
5. Your current location will appear and keep updating with:
   - Latitude & Longitude
   - Accuracy in meters
   - Google Maps redirection link
6. Click **“Stop Sharing”** to stop tracking at any time, or **“Sign out”** when you're done

---

## 🔐 Want More?

You can extend this project to:

- ✅ Store user locations in Firebase Realtime Database
- 🗺️ Display a live map using Leaflet.js or Mapbox
- 👥 Track multiple users

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 🙋‍♂️ Author

**Mr.V.M.M Hacker**  
Let’s build the future of cyber & web tech together.
