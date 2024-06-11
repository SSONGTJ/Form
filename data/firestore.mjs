// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDocs,
  setDoc,
  collection,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 폼 리스트 전체 가져오기
export async function allQuestList() {
  const questRef = collection(db, "quest");
  const descQuery = query(questRef, orderBy("created_at", "desc"));

  const querySnapshot = await getDocs(descQuery);

  if (querySnapshot.empty) {
    return [];
  }

  const fetchedQuest = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());

    const aQuest = {
      id: doc.id,
      title: doc.data()["title"],
      type: doc.data()["type"],
      created_at: doc.data()["created_at"].toDate(),
    };

    // .toLocaleTimeString('ko')
    fetchedQuest.push(aQuest);
  });

  return fetchedQuest;
}

// 할일 추가하기
export async function addAQuest({ title, type }) {
  // Add a new document with a generated id
  const newQuestRef = doc(collection(db, "quest"));

  const createdAtTimestamp = Timestamp.fromDate(new Date());

  const newData = {
    id: newQuestRef.id,
    title: title,
    type: type,
    created_at: createdAtTimestamp,
  };

  // later...
  await setDoc(newQuestRef, newData);

  return {
    id: newQuestRef.id,
    title: title,
    type: type,
    created_at: createdAtTimestamp.toDate(),
  };
}

module.exports = { allQuestList, addAQuest };
