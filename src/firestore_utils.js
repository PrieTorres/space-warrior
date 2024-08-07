import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./config/firestore.js";

export const addRank = async (rank) => {
  if (!rank?.name || !rank?.points)
    throw new Error("missing required fields (points and name)");

  try {
    const docRef = await addDoc(collection(db, "rank"), {
      name: rank.name,
      points: rank.points,
      insertedDate: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    return { error: error?.message, code: error?.code };
  }
}

export const getRanks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "rank"))
    const ranks = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }));

    return ranks;
  } catch (error) {
    console.error("unable to get ranking data ", error);
    return [];
  }
}

/*export function getToken(e) {
  e?.preventDefault();
  grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise.execute('6LfQ1x8qAAAAAMs-XblQ02u27xomLrio5S2twFn3', {action: 'LOGIN'});
    return token;
  });
}*/
