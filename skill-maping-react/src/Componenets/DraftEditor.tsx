import { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface pvalue {
  name: string,
  onEditorContentChange: (name: string, content: string) => void
}

const DraftEditor = (props: pvalue) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    props.onEditorContentChange(props.name, content);
  };

  return (
    <div>
      <div className='card-header'>
        <h6>{props.name}</h6>
      </div>
      <div className='card-body'>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorStateChange}
        />
      </div>
    </div>
  );
};
export default DraftEditor;

