import { defineStore } from "pinia";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  validatePassword,
} from "firebase/auth";

import { auth } from "@/firebase";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export const useAccountStore = defineStore("account", {
  state: () => ({
    isLoggedIn: false,
    user: {},
  }),
  actions: {
    async checkAuthState() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user = user;
            this.LoggedIn = true;
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    },
    async loginViaGoogle() {
      try {
        const result = await signInWithPopup(auth, provider);
        this.isLoggedIn = true;
        this.user = result.user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.isLoggedIn = false;
        this.user = {};
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async loginViaUsernameAndPassword(email, password) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        this.isLoggedIn = true;
        this.user = result.user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
});
