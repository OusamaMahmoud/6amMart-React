import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSHh_SEFJ_bCj7I3sD3fsaGPJjHVf7zis",
  authDomain: "dreambox-34642.firebaseapp.com",
  projectId: "dreambox-34642",
  storageBucket: "dreambox-34642.firebasestorage.app",
  messagingSenderId: "135617392328",
  appId: "1:135617392328:web:7a3ba33f51cd961f8bbffd",
  measurementId: "G-HMJLXT2RML"
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:"7dhZepZtRBD92q1TeF50zosBLPLWBPANvu3K03M_0Zo",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );




export const auth = getAuth(firebaseApp);
