const firebaseConfig = {
    apiKey: "AIzaSyBN2EO-PDit2EoNoS2kgMiYXMM09IH_6aE",
    authDomain: "ledger-aa613.firebaseapp.com",
    projectId: "ledger-aa613",
    storageBucket: "ledger-aa613.appspot.com",
    messagingSenderId: "451355459198",
    appId: "1:451355459198:web:1ff6682a67cdbbe07ea22f",
    measurementId: "G-SP81FMD7R1"
};

// 初始化 Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics(app);
const db = firebase.firestore();