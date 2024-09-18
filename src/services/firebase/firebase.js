import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCE9gwxEhCisQ9RMbAXoGRRCCXbAwG5ERQ',
  authDomain: 'web-014-phoenix-talk.firebaseapp.com',
  projectId: 'web-014-phoenix-talk',
  storageBucket: 'web-014-phoenix-talk.appspot.com',
  messagingSenderId: '739003649704',
  appId: '1:739003649704:web:bc18d77324403e592cbc9d',
  measurementId: 'G-9P5NWXXP91'
};

const app = initializeApp(firebaseConfig);
export default app;

export const storage = getStorage(app);
export const analytics = getAnalytics(app);