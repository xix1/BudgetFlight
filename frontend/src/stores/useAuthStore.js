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
    state: () => ({
        user: null,
        email:'',
        password:'',
    }),
    getters: {

    },
    actions: {
        init(){
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    this.setUser(user);
                    router.replace({name:'home'})
                }
                else {
                    this.user = {}
                    router.replace({name:'login'})
                }
            })
        },
        setUser(user) {
            this.user = user;
        },

        async register(email, password) {
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                if(user){
                    this.setUser(user);
                    
                    router.replace({name:'home'});
                }
            }
            catch(error) {
                console.log(error);
            }
        },
        async login(){
            try {
                const { user } = await signInWithEmailAndPassword(auth, this.email, this.password);
                if(user){
                    router.replace({name:'home'});
                    this.setUser(user);
                }
            }
            catch (error) {
                console.log(error);
            }
        },
        async loginWithGoogle() {
            const provider = new GoogleAuthProvider();
            try {
              const { user } = await signInWithPopup(auth, provider).user;
              this.setUser(user);
            } catch (error) {
              console.error(error);
            }
          },
          async loginWithFacebook() {
            const provider = new FacebookAuthProvider();
            try {
              const { user } = await signInWithPopup(auth, provider);
              this.setUser(user);
            } catch (error) {
              console.error(error);
            }
          },
        async logout(){
            await signOut(auth);
            router.replace({name:'login'})
            this.setUser(null);
        },
    },
});

//Listening to user status changes
auth.onAuthStateChanged((user) => {
    useAuthStore().$patch({ user });
  });