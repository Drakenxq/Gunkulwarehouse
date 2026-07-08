import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAkPFzgT7hLAxPVI129F-vRzA65MIx2VIs",
  authDomain: "gunkul-my-task-system.firebaseapp.com",
  projectId: "gunkul-my-task-system",
  storageBucket: "gunkul-my-task-system.firebasestorage.app",
  messagingSenderId: "877006770872",
  appId: "1:877006770872:web:ec56ec0089512899811a4d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
