import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendPasswordResetEmail, 
  signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword} from "firebase/auth"
import { store } from "../store/store";
import { authSlice } from "../store/authSlice";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import {getStorage, listAll, ref, uploadBytes} from "firebase/storage"
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);
export const storage = getStorage(app)


//    REGISTRACIJA 

export const signUp = async (email, password, username) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  store.dispatch(
    authSlice.actions.setData({
      id: user.uid,
      email: user.email,
      token: user.accessToken,
      username: username
    })
  );

  return user;
};

export  const signInWithGoogle = async () => {
  try {
     const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user
    store.dispatch(
      authSlice.actions.setData({
        id: user.uid,
        email: user.email,
        token: user.accessToken,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    store.dispatch(authSlice.actions.logout());
  } catch (error) {
    console.log(error);
  }
};

//  PASSWORD
export const resetPassword = async (email) => {
   await sendPasswordResetEmail(auth, email)
}

export const updateNewPassword = async(newPassword) => {
    try{ 
      await updatePassword(newPassword);
   
    } catch(error) {
      alert(error.message)
    }
}
// LOGIN 
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  store.dispatch(
    authSlice.actions.setData({
      id: user.uid,
      email: user.email,
      token: user.accessToken,
    })
  );

  return user
}


// FIRESTORE

export const dodajOglas = async (data) => {
  const result = await addDoc(collection(db, "Oglasi"), data);
  return result;
};

export const addUsers = async (data) => {
  const result = await addDoc(collection(db, "users"), data);
  return result;
};




export const izbrisiOglas = async (id) => {
  const docRef = doc(db, "Oglasi", id);
  return await deleteDoc(docRef)
}


export const getOglase = async () => {
  const quotesCollection = collection(db, "Oglasi");
  const quoteResults = await getDocs(quotesCollection);
  const quoteList = quoteResults.docs.map((doc) => ({...doc.data(), id : doc.id}));
  return quoteList;
};

export const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const usersResults = await getDocs(usersCollection);
  const usersList = usersResults.docs.map((doc) => ({...doc.data(), id : doc.id}));
  return usersList;
};


export const updateOglas = async (id, data) => {
  const docRef = doc(db, "Oglasi", id);
  return await updateDoc(docRef, data);
};

export const getOglasById = async (id) => {
  const docRef = doc(db, "Oglasi", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return { ...data, id: id };
};


//        STORAGE       STORAGE /////////////////

export const uploadImage = async (image) => {
  const imageRef = ref(storage, `oglasi/${image.name + v4()}`)
  const response = await uploadBytes(imageRef, image)
  return response 
}
