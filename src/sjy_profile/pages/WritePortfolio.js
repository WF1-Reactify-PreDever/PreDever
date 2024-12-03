// src/sjy_profile/pages/WritePortfolio.js
import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// 템플릿 데이터
const templates = [
  { id: 1, name: 'Template 1', src: '/assets/templates/template1/index.html' },
  { id: 2, name: 'Template 2', src: '/assets/templates/template2/index.html' },
  { id: 3, name: 'Template 3', src: '/assets/templates/template3/index.html' },
  { id: 4, name: 'Template 4', src: '/assets/templates/template4/index.html' },
  { id: 5, name: 'Template 5', src: '/assets/templates/template5/index.html' },
  { id: 6, name: 'Template 6', src: '/assets/templates/template6/index.html' },
];

// 공통 스타일
const styles = {
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  successButton: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  dangerButton: {
    bottom: '20px',
    left: '20px',
    backgroundColor: '#dc3545',
    color: 'white',
    width: 'auto'
  },
  container: {
    display: 'flex',
    overflow: 'hidden',
  },
  sidebar: {
    width: '300px',
    borderRight: '1px solid #ddd',
    padding: '20px',
    overflowY: 'auto',
    transition: 'width 0.3s ease',
  },
  previewArea: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropArea: {
    height: '800px',
    width: '95%',
    border: '2px dashed #ddd',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
};

// 드래그 가능한 템플릿 컴포넌트
function DraggableTemplate({ template, isTemplateConfirmed }) {
  const [, drag] = useDrag(() => ({
    type: 'template',
    item: { id: template.id },
    canDrag: !isTemplateConfirmed,
  }));

  return (
    <div
      ref={!isTemplateConfirmed ? drag : null}
      style={{
        margin: '10px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        cursor: isTemplateConfirmed ? 'not-allowed' : 'pointer',
        backgroundColor: isTemplateConfirmed ? '#e0e0e0' : '#f0f0f0',
      }}
    >
      {template.name}
    </div>
  );
}

// WritePortfolio 컴포넌트
function WritePortfolio() {
  const { username } = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isTemplateConfirmed, setIsTemplateConfirmed] = useState(false);
  const iframeRef = useRef(null);

  const [, drop] = useDrop(() => ({
    accept: 'template',
    drop: (item) => handleTemplateDrop(item),
    canDrop: () => !isTemplateConfirmed,
  }));

  const handleTemplateDrop = (item) => {
    const selected = templates.find((template) => template.id === item.id);
    setSelectedTemplate(selected);
    setIsTemplateConfirmed(false);
  };

  const handleConfirmTemplate = () => {
    if (!selectedTemplate) {
      alert('템플릿을 먼저 선택해주세요.');
      return;
    }
    setIsTemplateConfirmed(true);
    applyContentEditable();
  };

  const handleResetTemplate = () => {
    setSelectedTemplate(null);
    setIsTemplateConfirmed(false);
  };

  const applyContentEditable = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const doc = iframe.contentDocument;
      // 모든 텍스트 요소에 contenteditable 적용
      const editableElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, li, button');
      editableElements.forEach((element) => {
        element.setAttribute('contenteditable', 'true');
        element.style.cursor = 'text';
      });
      // button 클릭 동작 방지
      const buttons = doc.querySelectorAll('button');
      buttons.forEach((button) => {
        button.addEventListener('click', (e) => e.preventDefault());
      });
    }
  };

  const handleSaveTemplate = () => {
    if (!selectedTemplate) {
      alert('템플릿을 먼저 선택해주세요.');
      return;
    }
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const doc = iframe.contentDocument;
      const htmlContent = doc.documentElement.outerHTML;

      // Blob 생성
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // 파일 다운로드 트리거
      const link = document.createElement('a');
      link.href = url;
      link.download = `${username}_template.html`;
      link.click();

      // URL 객체 해제
      URL.revokeObjectURL(url);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={styles.container}>
        {/* 왼쪽 사이드바 */}
        <div style={styles.sidebar}>
          {!isTemplateConfirmed && (
            <>
              <h2>템플릿 리스트</h2>
              {templates.map((template) => (
                <DraggableTemplate
                  key={template.id}
                  template={template}
                  isTemplateConfirmed={isTemplateConfirmed}
                />
              ))}
            </>
          )}
          <div style={{ marginTop: '20px' }}>
            {!isTemplateConfirmed ? (
              <button
                onClick={handleConfirmTemplate}
                style={{ ...styles.button, ...styles.primaryButton }}
              >
                템플릿 선택
              </button>
            ) : (
              <button
                onClick={handleSaveTemplate}
                style={{ ...styles.button, ...styles.successButton }}
              >
                게시하기
              </button>
            )}
          </div>
        </div>

        {/* 오른쪽 미리보기 영역 */}
        <div style={styles.previewArea}>
          {isTemplateConfirmed ? (
            <iframe
              ref={iframeRef}
              title="Portfolio Template"
              src={selectedTemplate?.src || ''}
              width="100%"
              height="100%"
              style={{ border: 'none', minHeight: '95vh' }}
              onLoad={applyContentEditable}
            ></iframe>
          ) : (
            <div ref={drop} style={styles.dropArea}>
              {selectedTemplate ? (
                <iframe
                  title="Portfolio Template"
                  src={selectedTemplate.src}
                  width="100%"
                  height="800px"
                  style={{ border: 'none' }}
                ></iframe>
              ) : (
                <p>템플릿을 드래그해서 여기에 놓아주세요.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {!isTemplateConfirmed && selectedTemplate && (
        <button
          onClick={handleResetTemplate}
          style={{ ...styles.button, ...styles.dangerButton, position: 'absolute', bottom: '20px', left: '20px' }}
        >
          초기화
        </button>
      )}
    </DndProvider>
  );
}

export default WritePortfolio;
