import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firebase 설정 import
import "./PostDetailStyle.css"; // CSS 파일 import

function PostDetail() {
  const { id } = useParams(); // URL에서 id 값을 가져옴
  const [post, setPost] = useState(null); // 게시물 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [comments, setComments] = useState([]); // 댓글 데이터
  const [newComment, setNewComment] = useState(""); // 새 댓글 입력 상태

  // 게시물 데이터 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id); // Firebase에서 posts 컬렉션의 문서 참조
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Fetched post data:", data);

          // 데이터 매핑 후 상태 업데이트
          setPost({
            title: data.title || "Untitled Post",
            content: data.content || "No content available.",
            author: data.author || "Anonymous",
            timestamp: data.timestamp
              ? new Date(data.timestamp.toDate()).toLocaleString()
              : "Unknown date",
          });
        } else {
          console.error("No such document!");
          setPost(null); // 데이터가 없을 경우 null로 설정
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null); // 오류 발생 시 상태를 null로 설정
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchPost();
  }, [id]);

  // 댓글 추가 핸들러
  const handleAddComment = () => {
    if (newComment.trim()) {
      const commentWithAuthor = {
        author: `익명${comments.length + 1}`,
        content: newComment,
        likes: 0,
      };
      setComments([...comments, commentWithAuthor]);
      setNewComment("");
    }
  };

  // 댓글 좋아요 핸들러
  const handleLikeComment = (index) => {
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, likes: comment.likes + 1 } : comment
    );
    setComments(updatedComments);
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  if (!post) {
    return <div>Post not found</div>; // 데이터가 없을 경우 표시
  }

  return (
    <div className="post-detail-container">
      {/* 상단 네비게이션 */}
      <header className="post-header">
        <Link to="/" className="logo">Predever</Link>
      </header>

      {/* 게시물 내용 */}
      <main className="post-content">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-author">{post.author}</span> · <span>{post.timestamp}</span>
        </div>
        <div className="post-body">{post.content}</div>

        {/* 상호작용 버튼 */}
        <div className="post-actions">
          <button className="btn-primary">판매하기</button>
          <button className="btn-danger">좋아요</button>
        </div>
      </main>

      {/* 댓글 섹션 */}
      <section className="comment-section">
        <h2 className="comment-title">댓글</h2>

        {/* 댓글 입력 */}
        <div className="comment-input">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
          />
          <button onClick={handleAddComment} className="btn-primary">
            등록
          </button>
        </div>

        {/* 댓글 목록 */}
        <CommentList
          comments={comments}
          onLike={handleLikeComment}
          onDelete={handleDeleteComment}
        />
      </section>
    </div>
  );
}

// 댓글 목록 컴포넌트
const CommentList = ({ comments, onLike, onDelete }) => {
  return (
    <ul className="comment-list">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <li key={index} className="comment-item">
            <div className="comment-content">
              <strong>{comment.author}</strong>
              <p>{comment.content}</p>
            </div>
            <div className="comment-actions">
              <button className="btn-like" onClick={() => onLike(index)}>
                좋아요 {comment.likes}
              </button>
              <button className="btn-delete" onClick={() => onDelete(index)}>
                삭제
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="no-comments">댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
      )}
    </ul>
  );
};

export default PostDetail;