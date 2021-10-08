import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
const myAuthenticationInitialization =() => {
    initializeApp(firebaseConfig);
}
export default myAuthenticationInitialization;