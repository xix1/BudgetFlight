import { defineStore } from 'pinia';
import router from '@/router/index.js';
import { auth } from '@/firebase/config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    onAuthStateChanged
} from 'firebase/auth';

export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            user: null,
            errorMessage: '',
        }

    },
    getters: {

    },
    actions: {
        init() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.setUser(user);
                    // router.replace({name:'home'})
                }
                else {
                    this.user = {}
                    router.push({ name: 'home' })
                }
            })
        },
        setUser(user) {
            this.user = user;
        },

        async register(email, password) {            
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                if (user) {
                    router.push({ name: 'search' });
                    this.setUser(user);
                }
            }
            catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    console.log(error.code)
                    this.errorMessage = "This email is already in use. Please try another email.";
                    console.log(this.errorMessage)
                } else {
                    this.errorMessage = "An error occurred. Please try again.";
                }
            }
        },
        async login(email, password) {       
            try {
                const { user } = await signInWithEmailAndPassword(auth, email, password);
                if (user) {
                    console.log(user)
                    this.setUser(user);
                    router.push({ name: 'search' });
                }
            }
            catch (error) {
                console.log(error);
                if (error.code === "auth/wrong-password") {
                    this.errorMessage = "Wrong password. Please try again.";
                }
                else if (error.code === "auth/user-not-found") {
                    this.errorMessage = "User not found. Please try again.";
                }
                 else {
                    this.errorMessage = "An error occurred. Please try again.";
                }
            }
        },
        async loginWithGoogle() {
            const provider = new GoogleAuthProvider();
            try {
                const { user } = await signInWithPopup(auth, provider);
                if (user) {
                    console.log(user)
                    this.setUser(user);
                    router.push({ name: 'search' });
                }
            } catch (error) {
                console.error(error);
            }
        },
        async loginWithFacebook() {
            const provider = new FacebookAuthProvider();
            try {
                const { user } = await signInWithPopup(auth, provider);
                this.setUser(user);
                router.push({ name: 'search' });
            } catch (error) {
                console.error(error);
            }
        },
        async logout() {
            await signOut(auth);
            // this.setUser(null);

        },
    },
});

