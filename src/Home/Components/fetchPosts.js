import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Firebase 설정 파일 import

const fetchPosts = async () => {
  try {
    console.log("Firestore에서 포스트 데이터를 가져오는 중..."); // 시작 로그

    const querySnapshot = await getDocs(collection(db, "posts")); // 'posts' 컬렉션 읽기
    console.log("포스트 응답 크기: " + querySnapshot.size); // 문서 개수 출력

    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // 로그 출력: 각 문서 데이터
      console.log("포스트 응답 ID: " + doc.id);
      console.log("작성자: " + data.author);
      console.log("작성자 ID: " + data.authorId);
      console.log("댓글 수: " + data.comments);
      console.log("내용: " + data.content);
      console.log("좋아요 수: " + data.likes);
      console.log("타임스탬프: " + data.timestamp);
      console.log("제목: " + data.title);
      console.log("조회수: " + data.views);
      console.log("-----------------------------");

      return {
        id: doc.id, // Firestore 문서 ID 포함
        ...data,
      };
    });

    console.log("가져온 포스트 데이터: ", posts); // 최종 배열 출력
    return posts;
  } catch (error) {
    console.error("포스트 데이터를 가져오는 중 오류 발생: " + error);
    return [];
  }
};

export default fetchPosts;