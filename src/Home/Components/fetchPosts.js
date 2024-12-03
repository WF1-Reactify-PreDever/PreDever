import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Firebase 설정 파일 import

const fetchPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts")); // 'posts' 컬렉션 읽기
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export default fetchPosts;