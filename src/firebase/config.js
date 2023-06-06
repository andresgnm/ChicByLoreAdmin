// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmhGNkRvVr68zUFEXpLufHN6FpSm5c2Q8",
  authDomain: "react-cursos-444df.firebaseapp.com",
  projectId: "react-cursos-444df",
  storageBucket: "react-cursos-444df.appspot.com",
  messagingSenderId: "1041322223742",
  appId: "1:1041322223742:web:e41fb384612ac0d825d02f"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth =getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);