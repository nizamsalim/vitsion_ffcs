import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Collections } from "@/lib/constants";
import { Role, type User } from "@/lib/types";

type FirebaseError = {
  code: string;
  message: string;
};

export class AuthService {
  static login(email: string, password: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        resolve(res.user);
      } catch (error) {
        console.log((error as FirebaseError).code);

        reject("Invalid login credentials");
      }
    });
  }
  static logout() {
    return new Promise(async (resolve, reject) => {
      try {
        await signOut(auth);
        resolve(null);
      } catch (error) {
        reject((error as FirebaseError).message);
      }
    });
  }
  static getLoggedInUser(user: FirebaseUser): Promise<Partial<User>> {
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(
          collection(db, Collections.STUDENTS),
          where("id", "==", user.uid)
        );
        const res = await getDocs(q);
        const dbUser = res.docs[0].data();
        resolve({
          ...dbUser,
          role: dbUser.email.startsWith("vitsion") ? Role.ADMIN : Role.STUDENT,
        } as User);
      } catch (error) {
        reject("Something went wrong. Please try again");
      }
    });
  }

  static triggerChangePassword(user: Partial<User>) {
    return new Promise(async (resolve, reject) => {
      try {
        await sendPasswordResetEmail(auth, user.email!);
        resolve(
          "Please check your email for the password reset email. Make sure to check your spam folders too. This session will be logged out now"
        );
      } catch (error) {
        reject("Could not send password reset mail. Please try again later");
      }
    });
  }
}
