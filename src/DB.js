import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "./dbConf";

export const getBathroom = (id) => getDoc(doc(db, "bathrooms", id));
export const addComment = ({bathroomId, userEmail, comment, ratingValue}) => {
  const newComment = doc(collection(db, "comments"));
  setDoc(newComment, { bathroomId, userEmail, comment, ratingValue });
}
export const getCommentByUserEmail = async (userEmail, bathroomId) => {
  const q = query(collection(db, "comments"), where("bathroomId", "==", bathroomId), where("userEmail", "==", userEmail));

  const querySnapshot = await getDocs(q);
  const docs = []
  querySnapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
}
export const getAllComments = async (bathroomId) => {
  const q = query(collection(db, "comments"), where("bathroomId", "==", bathroomId));

  const querySnapshot = await getDocs(q);
  const docs = []
  querySnapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
}

export const watchBathrooms = async (setState) => {
  const q = query(collection(db, "bathrooms"));
  onSnapshot(q, (querySnapshot) => {
    const bathrooms = [];
    querySnapshot.forEach((doc) => {
      bathrooms.push({ ...doc.data(), id: doc.id });
    });
    setState(bathrooms);
  });
}

export const watchComments = async (bathroomId, setState) => {
  const q = query(collection(db, "comments"), where("bathroomId", "==", bathroomId));
  onSnapshot(q, (querySnapshot) => {
    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({ ...doc.data(), id: doc.id });
    });
    setState(comments);
  });
}