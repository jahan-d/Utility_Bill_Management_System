# Utility Bill Management System — Frontend Client

**A modern React application for tracking and managing utility payments.**

Built with React 19, Vite, and Tailwind CSS 4, this application offers a sleek interface for users to monitor their electricity, water, gas, and internet bills.

---

## 🚀 Live Demo
**Visit:** [https://b12a10-v2.web.app/](https://b12a10-v2.web.app/)

---

## 🛠️ Tech Stack

- **React 19** – Latest UI framework
- **Vite** – Fast build tool
- **Tailwind CSS 4** – Utility-first styling
- **Firebase Auth** – Secure identity management
- **React Awesome Reveal** – Smooth UI animations
- **jsPDF** – Report generation

---

## 📌 Key Features

- **Dashboard View** – Centralized hub for all utility bills
- **Category Filtering** – Easily sort by bill type
- **PDF Reports** – Download payment history receipts
- **Secure Auth** – Google and Email login via Firebase
- **Responsive UI** – Works on all devices

---

## 📁 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
VITE_FIREBASE_AUTH_DOMAIN=b12a10-v2.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=b12a10-v2
VITE_FIREBASE_STORAGE_BUCKET=b12a10-v2.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=<YOUR_SENDER_ID>
VITE_FIREBASE_APP_ID=<YOUR_APP_ID>
```

---

## 🛠 Running Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/jahan-d/Utility-Bill-Management-System-client.git
   cd Utility-Bill-Management-System-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the client**
   ```bash
   npm run dev
   ```

4. **Open in browser:** `http://localhost:5173`

---

## ☁️ Deployment (Firebase)

1. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```
2. **Build for Production**
   ```bash
   npm run build
   ```
3. **Deploy**
   ```bash
   firebase deploy
   ```

---

## 📝 Author

**Jahan**
- Portfolio: [jahan-d.web.app](https://jahan-d.web.app)
- GitHub: [@jahan-d](https://github.com/jahan-d)
