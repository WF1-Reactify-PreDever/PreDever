// src/sjy_profile/components/post/PostEditor.js
import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
`;

function PostEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <Container>
      <h2>게시물 편집기</h2>
      <Editor editorState={editorState} onChange={setEditorState} />
    </Container>
  );
}

export default PostEditor;
