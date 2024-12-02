// src/sjy_profile/components/post/PortfolioEditor.js
import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import pdfExportService from '../../services/pdfExportService';

const Container = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
`;

function PortfolioEditor({ template }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleExportPDF = () => {
    const content = document.getElementById('portfolio-content').innerHTML;
    pdfExportService.exportToPDF(content);
  };

  return (
    <Container>
      <h2>포트폴리오 편집기</h2>
      <div id="portfolio-content">
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
      <button onClick={handleExportPDF}>PDF로 내보내기</button>
    </Container>
  );
}

export default PortfolioEditor;
