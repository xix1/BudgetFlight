import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyDwh3xQ8b1YI0NOy-2fm2EoAgsF1XGvsMI",
    authDomain: "explore-29c81.firebaseapp.com",
    projectId: "explore-29c81",
    storageBucket: "explore-29c81.appspot.com",
    messagingSenderId: "489428336655",
    appId: "1:489428336655:web:97dd9775cd351631c6637a",
    measurementId: "G-GHJMEMXV05"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig)

  export const auth = getAuth()

  export default firebaseApp