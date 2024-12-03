import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Markdown 확장 기능
import rehypeRaw from "rehype-raw"; // HTML 렌더링 활성화

const templateOptions = [
  { value: "simple", label: "1,2학년 개발자 포트폴리오 예시" },
  { value: "professional", label: "3학년 개발자 포트폴리오 예시" },
  { value: "creative", label: "4학년 개발자 포트폴리오 예시" },
];

const PostEditorPage = () => {
  // State for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 상태
  const [selectedTemplate, setSelectedTemplate] = useState(templateOptions[0]); // Default template

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageMarkdown = `![Uploaded Image](${e.target.result})`;
        setContent((prevContent) => `${prevContent}\n\n${imageMarkdown}`);
      };
      reader.readAsDataURL(file);
    }
  };

  //  템플릿 선택에 따른 기본 내용
  const templateContents = {
    simple: {
      title: "한성대학교 컴퓨터 공학과 1,2학년 포트폴리오",
      content: `
      ## 트랙
      • 한성대학교 컴퓨터공학과 (2024 ~ 현재)
      •	주요 강의: 자료구조, 프로그래밍 언어, 데이터베이스 기초.
      •	GitHub: github.com/honggildong
      
      ## 기술 스택
      • Python, Java, HTML/CSS
      • Git/GitHub
  
      ## 프로젝트
      • 학생 출석 관리 시스템
      • 블로그 웹 애플리케이션
      `,
    },

    professional: {
      title: "3학년 포트폴리오",
      content: ` 
      ## 트랙
      • 한성대학교 컴퓨터공학과 (2021 ~ 현재)
    
      ## 기술 스택
      • **프로그래밍 언어**: JavaScript, Python, Java, SQL
      • **웹 기술**: React.js, Node.js, HTML/CSS, Express.js
      • **데이터베이스**: MySQL, MongoDB
      • **버전 관리**: Git/GitHub
      • **툴**: Postman, Figma, Visual Studio Code
    
      ## 프로젝트 경험
      ### 1. 팀 프로젝트: E-commerce 웹 애플리케이션
       **설명**: 사용자 인증 및 장바구니 기능이 포함된 온라인 쇼핑몰 개발.
       **역할**: 
      • 백엔드: Node.js 및 Express.js를 사용하여 REST API 설계 및 데이터 관리.
      • 프론트엔드: React.js를 활용한 사용자 인터페이스 구현.
       **성과**:
      • 사용자 등록/로그인 시스템 완성.
      • 관리자 페이지에서 상품 관리 기능 구현.
    
      ### 2. 개인 프로젝트: Task Management Web App
      • **설명**: 작업 추가, 수정, 삭제 기능을 제공하는 간단한 작업 관리 애플리케이션.
      • **사용 기술**: React.js, Firebase (Authentication 및 Firestore).
      • **특징**:
        - 실시간 데이터 동기화.
        - Firebase를 활용한 사용자 인증.
    
      ## 활동 및 수상
      • **2023 한성대학교 해커톤 참가**
      • "IoT 기반 스마트 캠퍼스 솔루션" 개발로 우수상 수상.
      • **학교 알고리즘 동아리**
      • 주간 알고리즘 스터디 및 대회 준비.
    
      ## 관심 분야
      • 클라우드 컴퓨팅 (AWS, Firebase)
      • 프론트엔드 개발 및 UI/UX 디자인
      • 데이터베이스 설계 및 최적화
      `,
    },

    creative: {
      title: "4학년 포트폴리오",
      content: ` 
      ## 트랙
      • 한성대학교 컴퓨터공학과 (2020 ~ 2024)
    
      ## 기술 스택
      • **프로그래밍 언어**: JavaScript, Python, Java, TypeScript
      • **웹 기술**: React.js, Next.js, Node.js, HTML/CSS, TailwindCSS
      • **데이터베이스**: PostgreSQL, MySQL, MongoDB
      • **클라우드 및 기타 기술**: AWS (S3, EC2, RDS), Docker, Kubernetes
      • **버전 관리**: Git/GitHub, GitLab
      • **툴**: JIRA, Postman, Figma
    
      ## 프로젝트 경험
      ### 1. 팀 프로젝트: Job Finder 웹 애플리케이션
       **설명**: 구직자를 위한 맞춤형 채용 공고를 제공하는 웹 플랫폼.
       **역할**: 
       **백엔드**: Node.js와 PostgreSQL을 활용한 데이터 관리 및 API 설계.
       **프론트엔드**: React.js와 TailwindCSS로 사용자 친화적인 인터페이스 구현.
       **성과**:
       • 구직자 매칭 알고리즘 설계로 추천 정확도 85% 달성.
       • 하루 평균 500명의 사용자가 이용하는 플랫폼으로 성장.
    
      ### 2. 개인 프로젝트: Portfolio Generator
      • **설명**: 개발자를 위한 동적 포트폴리오 생성 웹 애플리케이션.
      • **사용 기술**: Next.js, Firebase, TailwindCSS.
      • **특징**:
      • 템플릿 선택 및 실시간 미리보기 기능 제공.
      • Firebase를 활용한 사용자 데이터 저장 및 인증.
      • GitHub API를 연동하여 프로젝트를 자동으로 포트폴리오에 추가.
    
      ### 3. 캡스톤 디자인: AI 기반 학습 추천 시스템
      • **설명**: 머신러닝 모델을 활용한 개인 맞춤형 학습 경로 추천 시스템.
      • **사용 기술**: Python (Scikit-learn, Pandas), Flask, React.js.
      • **성과**:
      • 모델 정확도 92% 달성.
      • 학교 내 시범 운영 후 200명 이상의 학생들이 사용.
    
      ## 활동 및 수상
      • **2024 삼성 소프트웨어 경진대회 참가**
      • "AI 기반 학습 추천 시스템"으로 최우수상 수상.
      • **학교 알고리즘 동아리 회장**
      • 알고리즘 스터디 운영 및 코딩 테스트 준비 지원.
      **오픈소스 기여**
      • GitHub에서 JavaScript 기반 오픈소스 프로젝트에 버그 수정 및 문서 기여.
    
      ## 관심 분야 및 목표
      • 클라우드 컴퓨팅 및 DevOps 엔지니어링.
      • 대규모 분산 시스템 설계 및 최적화.
      • 머신러닝을 활용한 데이터 분석 및 응용.
      
      `,
    }
  };

  // 템플릿 변경 핸들러
  const handleTemplateChange = (option) => {
    setSelectedTemplate(option);
    const { title, content } = templateContents[option.value];
    setTitle(title);
    setContent(content);
  };

  // 게시물 저장 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!title || !content) {
      alert("Please fill out both the title and content fields.");
      return;
    }

    // Simulated save action (e.g., API call)
    const newPost = {
      title,
      content,
      template: selectedTemplate.label,
      date: new Date().toISOString(),
    };
    console.log("Post saved:", newPost);

    // Reset form after saving
    setTitle("");
    setContent("");
    alert("Post saved successfully!");
  };

  return (
    <div style={{ display: "flex", padding: "20px", justifyContent: "center", alignItems: "flex-start", margin: "0 auto", maxWidth: "1200px", marginTop: "40px", gap: "20px" }}>
      {/* Left: Editor Section */}
      <div style={{
        flex: 1, maxWidth: "50%", marginRight: "20px", backgroundColor: "#f9f9f9", padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}>
        <h1>새 게시물 작성</h1>

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

        {/* 템플릿 선택 */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "block",
            display: "block",
            marginBottom: "8px"
          }}>
            학년별 게시물 작성 폼</label>
          <Select
            options={templateOptions}
            value={selectedTemplate}
            onChange={handleTemplateChange}
            placeholder="Select a template"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #ccc",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                padding: "4px",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#888",
              }),
            }}
          />
        </div>

        {/* 게시물 작성 폼 */}
        <form onSubmit={handleSubmit}
          style={{
            maxWidth: "1500px", // 폼 전체 너비를 크게 설정
            background: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "40px",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="title" style={{
              display: "block", fontWeight: "bold", fontSize: "18px",
              color: "#333",
              marginBottom: "8px",
            }}>
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                outline: "none",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
              }}
              placeholder={`${selectedTemplate.label}`}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="content" style={{
              display: "block", fontWeight: "bold", fontSize: "18px",
              color: "#333",
              marginBottom: "8px",
            }}>
              본문
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                height: "150px",
                outline: "none",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 부드러운 그림자 적용
                backgroundColor: "#f9f9f9", // 연한 배경색
                marginTop: "12px", // 위 요소와의 간격
                transition: "all 0.2s ease",
                boxSizing: "border-box", // 패딩과 테두리를 width에 포함
              }}
              placeholder={`${selectedTemplate.label}`}
              onFocus={(e) =>
                (e.target.style.border = "1px solid #007BFF")
              }
              onBlur={(e) =>
                (e.target.style.border = "1px solid #ddd")
              }
            ></textarea>
          </div>

          {/* 이미지 업로드 버튼 */}
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="imageUpload" style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "8px", display: "block" }}>이미지 업로드</label>
            <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#007BFF",
              color: "#FFF",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "#0056b3")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "#007BFF")
            }
          >
            게시물 저장
          </button>
        </form>
      </div>

      {/* Right: Preview Section */}
      <div style={{ flex: 1, backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "5px" }}>
        <h2>미리보기</h2>
        <div style={{ border: "1px solid #ddd", padding: "10px", minHeight: "300px" }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{
            img: ({ node, ...props }) => <img style={{ maxWidth: "100%", borderRadius: "5px" }} {...props} />
          }}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PostEditorPage;