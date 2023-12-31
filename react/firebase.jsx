// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-RT8Gj_bADu97S_v6LVcY2ZjAA7yQCwQ",
  authDomain: "mypromosphere-test.firebaseapp.com",
  projectId: "mypromosphere-test",
  storageBucket: "mypromosphere-test.appspot.com",
  messagingSenderId: "524036720040",
  appId: "1:524036720040:web:6839d02f09996fbe8fc99d",
  measurementId: "G-NRSZKTFSBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export default app;
export const storage = getStorage(app);