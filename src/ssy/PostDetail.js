import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./PostDetailStyle.css";

const PostDetail = () => {
  const location = useLocation();
  const { id } = location.state; // HomePage에서 전달된 문서 ID

  const [post, setPost] = useState(null); // 게시물 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [comments, setComments] = useState([]); // 댓글 데이터
  const [newComment, setNewComment] = useState(""); // 새 댓글 입력 상태

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id); // Firestore 문서 참조
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        {
          author: "익명",
          content: newComment,
        },
      ]);
      setNewComment("");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-detail-container">
      {/* 상단 바 */}
      <div className="post-header">
        <Link to="/" className="logo">
          Predever
        </Link>
      </div>

      {/* 게시물 내용 */}
      <main className="post-content">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-author">{post.author}</span> ·{" "}
          <span>{new Date(post.timestamp).toLocaleString()}</span>
        </div>
        <div className="post-body">{post.content}</div>
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
        <ul className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index} className="comment-item">
                <div className="comment-content">
                  <strong>{comment.author}</strong>
                  <p>{comment.content}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="no-comments">댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default PostDetail;