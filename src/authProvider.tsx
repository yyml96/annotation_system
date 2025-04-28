//https://firebase.google.com/docs/auth/web/firebaseui
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from "react-admin";
import axios from 'axios';

const firebaseConfig = {
    apiKey: "AIzaSyBoQxesXRTWn7AanNw1N7LRP5QDIKE3Xo0",
    authDomain: "dynamic-qc.firebaseapp.com",
    projectId: "dynamic-qc",
    storageBucket: "dynamic-qc.appspot.com",
    messagingSenderId: "5945927102",
    appId: "1:5945927102:web:f9625c7ebcb25804f8c5ef"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            const user = userCredential.user;
            const uid = user.uid;

            const response = await axios.get(`http://localhost:8098/backend/api/getUserRole?uid=${uid}`);
            const userRole = response.data.role;

            const userIdResponse = await axios.get(`http://localhost:8098/backend/api/getUserIdByFirebaseUid?firebase_uid=${uid}`);
            const userId = userIdResponse.data.id;

            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userId', userId);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    },
    logout: () => {
        return signOut(auth).then(() => {
            localStorage.removeItem('userRole');
            localStorage.removeItem('userId');
            return Promise.resolve();
        }).catch((error) => {
            return Promise.reject(error);
        });
    },
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            return signOut(auth).then(() => {
                return Promise.reject();
            });
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                if (user) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    },
    getPermissions: () => Promise.resolve(
        [
            { action: ["create", "edit", "delete", "list"], resource: "posts" }

        ]
    ),
    getIdentity: () => {
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');

        if (userId) {
            return Promise.resolve({
                id: userId,
                role: userRole,
            });
        } else {
            return Promise.reject(new Error("No user identity found"));
        }
    }
};
