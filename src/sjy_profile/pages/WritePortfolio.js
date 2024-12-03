import React, { useState } from 'react';
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
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isTemplateConfirmed, setIsTemplateConfirmed] = useState(false);

  // Drop 영역
  const [, drop] = useDrop(() => ({
    accept: 'template',
    drop: (item) => {
      if (!isTemplateConfirmed) {
        setIsTemplateConfirmed(false);
        const selected = templates.find((template) => template.id === item.id);
        setSelectedTemplate(selected);
      }
      // 드롭 후 초기화 로직 실행
      setIsTemplateConfirmed(false);
    },
    canDrop: () => !isTemplateConfirmed,
  }));

  const handleConfirmTemplate = () => {
    if (selectedTemplate) {
      setIsTemplateConfirmed(true);
    } else {
      alert('템플릿을 먼저 선택해주세요.');
    }
  };

  const handleResetTemplate = () => {
    setSelectedTemplate(null);
    setIsTemplateConfirmed(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        {/* 왼쪽 탭 */}
        <div
          style={{
            width: isTemplateConfirmed ? '300px' : '300px',
            borderRight: '1px solid #ddd',
            padding: '20px',
            overflowY: 'auto',
            transition: 'width 0.3s ease',
          }}
        >
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
              {/* 버튼 */}
              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={handleConfirmTemplate}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  템플릿 선택
                </button>
              </div>
            </>
          )}
          {/* 게시하기 버튼 */}
          {isTemplateConfirmed && (
            <button
              onClick={() => alert('게시하기 기능 구현 필요')}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              게시하기
            </button>
          )}
        </div>

        {/* 오른쪽 미리보기 */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            display: isTemplateConfirmed ? 'block' : 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isTemplateConfirmed ? (
            <iframe
              title="Portfolio Template"
              src={selectedTemplate?.src || ''}
              width="100%"
              height="100%"
              style={{ border: 'none', minHeight: '95vh' }}
            ></iframe>
          ) : (
            <>
              <h2>미리보기</h2>
              <div
                ref={drop}
                style={{
                  height: '800px',
                  width: '95%',
                  border: '2px dashed #ddd',
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                }}
              >
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
            </>
          )}
        </div>
      </div>
      {/* 초기화 버튼 */}
      {!isTemplateConfirmed && selectedTemplate && (
        <button
          onClick={handleResetTemplate}
          style={{
            position: 'relative',
            bottom: '20px',
            left: '20px',
            padding: '10px 20px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          초기화
        </button>
      )}
    </DndProvider>
  );
}

export default WritePortfolio;
