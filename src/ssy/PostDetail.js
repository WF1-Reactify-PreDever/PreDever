import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";



function PostDetail() {
    const { id } = useParams(); // URL에서 id 값을 가져옴

    // 게시물 샘플 데이터
    const post = {
        id: id,
        title: "github 커밋하고 펫 키우기",
        content: `\n\n\n\n\ngithub에서 커밋을 통해 자신의 펫을 키우는 게임형 프로젝트입니다.\n\n\n\n\n\n
        커밋을 많이 할수록 펫이 성장하며, 다양한 활동을 통해 레벨을 올릴 수 있습니다.\n\n\n\n
    이는 개발자들이 재미있게 자신의 작업을 시각적으로 확인하도록 돕는 프로젝트입니다.\n\n\n\n\n`,
        timestamp: "2024년 11월 7일",
        author: "hyobin",
    };

    // 댓글 관리
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        if (newComment.trim()) {
            const commentWithAuthor = {
                author: `익명${comments.length + 1}`,
                content: newComment,
            };
            setComments([...comments, commentWithAuthor]);
            setNewComment("");
        }
    };

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
                padding: "20px",
                boxSizing: "border-box",
                overflowY: "auto", // 세로 스크롤
            }}
        >
            {/* 상단 바 */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 123, 255, 0.8)", // 투명도 있는 파란색
                    color: "#fff",
                    padding: "10px 20px",
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%", // 화면 전체 너비
                    boxSizing: "border-box", // 패딩 포함

                }}
            >
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        color: "#fff",
                        fontSize: "30px",
                        fontWeight: "bold",
                    }}
                >
                    Predever
                </Link>
            </div>
            {/* 제목 섹션 */}
            <div style={{
                marginBottom: "20px",
                marginTop: "50px",
            }}>
                <h1 style={{ fontSize: "34px", fontWeight: "bold", marginBottom: "30px" }}>
                    {post.title}
                </h1>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    {/* 작성자와 시간 */}
                    <div style={{ fontSize: "14px", color: "#555" }}>
                        <span style={{ fontWeight: "bold" }} >{post.author}</span> · <span>{post.timestamp}</span>
                    </div>

                    {/* 버튼들 */}
                    <div>
                        <button
                            style={{
                                padding: "5px 10px",
                                marginRight: "10px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                width: "70px", // 버튼의 고정 너비 설정
                                height: "25px", // 버튼의 고정 높이 설정
                                borderRadius: "15px",
                                cursor: "pointer",
                            }}
                        >
                            판매하기
                        </button>
                        <button
                            style={{
                                padding: "5px 10px",
                                backgroundColor: "#ff4d4d",
                                color: "#fff",
                                border: "none",
                                width: "70px", // 버튼의 고정 너비 설정
                                height: "25px", // 버튼의 고정 높이 설정
                                borderRadius: "15px",
                                cursor: "pointer",
                            }}
                        >
                            좋아요
                        </button>
                    </div>
                </div>
            </div>

            {/* 구분선 */}
            <hr
                style={{
                    border: "none",
                    borderTop: "1px solid #ddd",
                    margin: "20px 0",
                }}
            />
            {/* 게시물 내용 */}
            <div
                style={{
                    lineHeight: "1.6",
                    fontSize: "16px",
                    color: "#333",
                    marginBottom: "30px", // 댓글과 간격
                    whiteSpace: "pre-line", // \n을 줄바꿈으로 처리
                    backgroundColor: "rgba(211, 211, 211, 0.2)", // 투명도가 높은 옅은 회색
                    padding: "20px", // 내용과 배경 사이의 여백
                    borderRadius: "10px", // 모서리를 둥글게
                }}
            >
                {post.content}
            </div>

            {/* 댓글 섹션 */}
            <div style={{ borderTop: "1px solid #ddd", paddingTop: "20px" }}>
                <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>댓글</h2>

                {/* 댓글 입력 필드 */}
                <div style={{ display: "flex", marginBottom: "20px" }}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        style={{
                            flex: 1,
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            marginRight: "10px",
                        }}
                    />
                    <button
                        onClick={handleAddComment}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        등록
                    </button>
                </div>

                {/* 댓글 목록 */}
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <li
                                key={index}
                                style={{
                                    marginBottom: "10px",
                                    padding: "10px",
                                    backgroundColor: "#f9f9f9",
                                    borderRadius: "5px",
                                    position: "relative", // 버튼 배치를 위한 position 설정
                                }}
                            >
                                {/* 버튼 섹션 */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        display: "flex",
                                        gap: "5px",
                                    }}
                                >
                                    {/* 좋아요 버튼 */}
                                    <button
                                        style={{
                                            backgroundColor: "#ff4d4d",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "5px",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => alert(`댓글 ${index + 1} 좋아요!`)}
                                    >
                                        좋아요
                                    </button>

                                    {/* 삭제 버튼 */}
                                    <button
                                        style={{
                                            backgroundColor: "#ddd",
                                            color: "#333",
                                            border: "none",
                                            borderRadius: "5px",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            const updatedComments = comments.filter((_, i) => i !== index);
                                            setComments(updatedComments);
                                        }}
                                    >
                                        삭제
                                    </button>


                                </div>

                                {/* 익명 이름 */}
                                <strong>{comment.author}</strong>
                                {/* 줄바꿈된 내용 */}
                                <p style={{ margin: "5px 0 0", color: "#333" }}>{comment.content}</p>
                            </li>
                        ))
                    ) : (
                        <p style={{ color: "#555" }}>댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default PostDetail;
