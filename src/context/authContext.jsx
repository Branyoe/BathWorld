import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../dbConf";
import { collection, doc, setDoc } from "firebase/firestore";
import { getUserRoles } from "../DB";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('There is not auth provider');
  return context;
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const signUp = (email, password) => createUser(auth, email, password);
  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logOut = () => signOut(auth)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const { roleCode } = await getUserRoles(currentUser.email);
          setUser({ ...currentUser, roleCode: roleCode ? roleCode : 1});
        } catch (error) {
          console.error("Error fetching user roles:", error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  return <authContext.Provider value={{ signUp, signIn, user, logOut, loading }}>{children}</authContext.Provider>
};

const createUser = async (auth, email, password, roleCode = 1) => {
  try {
    const userCredential = await (createUserWithEmailAndPassword(auth, email, password));
    const userData = userCredential.user;
    const newUserReference = doc(collection(db, "users"));
    const user = await setDoc(newUserReference, {
      email: userData.email,
      roleCode: roleCode,
    });
    return user;
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
}