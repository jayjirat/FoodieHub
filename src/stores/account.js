import { defineStore } from "pinia";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  updatePassword,
  deleteUser,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { db, auth } from "@/firebase";

import { doc, getDoc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export const useAccountStore = defineStore("account", {
  state: () => ({
    isLoggedIn: false,
    user: {},
    profile: {},
  }),
  actions: {
    async checkAuthState() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.user = user;
            this.isLoggedIn = true;

            const userRef = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userRef);
            this.profile = userSnapshot.data();
            this.profile.createdAt = this.profile.createdAt.toDate();
            this.profile.updatedAt = this.profile.updatedAt.toDate();

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

    async register(email, password) {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const newUser = {
          uID: result.user.uid,
          email: result.user.email,
          status: "active",
          role: "member",
          imageUrl:
            "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const userRef = doc(db, "users", newUser.uID);
        await setDoc(userRef, newUser);

        return {
          success: true,
          message: "User created successfully",
          status: "info",
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async changePassword(newPassword) {
      if (this.user) {
        try {
          await updatePassword(this.user, newPassword);
        } catch (error) {
          throw new Error(error.message);
        }
      }
    },
    async deleteUser() {
      if (this.user) {
        const userRef = doc(db, "users", this.user.uid);
        try {
          await deleteDoc(userRef);
          await deleteUser(this.user);
        } catch (error) {
          throw new Error();
        }
      }
    },

    async uploadProfileImage(imageUrl) {
      if (this.user) {
        try {
          const update = {
            imageUrl: imageUrl,
          };
          const userRef = doc(db, "users", this.user.uid);
          await updateDoc(userRef, update);
        } catch (error) {
          throw new Error(error.message);
        }
      }
    },
  },
});
