import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "./dbConf";

// Bathrooms
export const getBathroom = (id) => getDoc(doc(db, "bathrooms", id));

export const addBathroom = ({
  name,
  address,
  lat,
  lng,
  mainPhoto,
  cost,
  tags
}) => {
  const newBathroom = doc(collection(db, "bathrooms"));
  setDoc(newBathroom, {
    name,
    address,
    lat,
    lng,
    mainPhoto,
    cost,
    tags,
    totalRating: 0,
    type: "gratis",
  });
}

export const updateBathroom = async (id, data) => {
  const docRef = doc(db, "bathrooms", id);
  await updateDoc(docRef, data);
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

// Comments
export const addComment = ({ bathroomId, userEmail, comment, ratingValue, date }) => {
  const newComment = doc(collection(db, "comments"));
  setDoc(newComment, { bathroomId, userEmail, comment, ratingValue, date });
}

export const getCommentByUserEmailAndBathroomId = async (userEmail, bathroomId) => {
  const q = query(collection(db, "comments"), where("bathroomId", "==", bathroomId), where("userEmail", "==", userEmail));

  const querySnapshot = await getDocs(q);
  const docs = []
  querySnapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });

  return docs;
}

export const getCommentByUserEmail = async (userEmail) => {
  const q = query(collection(db, "comments"), where("userEmail", "==", userEmail));

  const querySnapshot = await getDocs(q);
  const docs = []
  querySnapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs.sort((a, b) => {
    if(!a.date) a.date = 0;
    if(!b.date) b.date = 0;
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });;
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

export const getAllComments = async (bathroomId) => {
  const q = query(collection(db, "comments"), where("bathroomId", "==", bathroomId));

  const querySnapshot = await getDocs(q);
  const docs = []
  querySnapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
}

// ratings
export const setTotalBathRating = async (bathId, totalRating, date) => {
  const docRef = doc(db, "bathrooms", bathId)
  if (!date) {
    await updateDoc(docRef, {
      totalRating: totalRating
    })
  } else {
    await updateDoc(docRef, {
      totalRating: totalRating,
      ratingModifiedDate: date
    })
  }
}
