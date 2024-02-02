import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
interface pvalue{
  name : string
}
const DraftEditor = (props:pvalue) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );

    return (
        <>
        <div className='card '>
            <div className='card-header'>
            <h6>{props.name}</h6>
            </div>
          <div className='card-body'>
           <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
      />
          </div>
          <div className='card-footer'>
            
          </div>
        </div>
        

        </>
    )
}

export default DraftEditor
