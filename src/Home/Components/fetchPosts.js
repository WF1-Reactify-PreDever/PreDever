import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const fetchPosts = async () => {
  const postsCollection = collection(db, "posts");
  const postSnapshot = await getDocs(postsCollection);
  const postList = postSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return postList;
};

export default fetchPosts;