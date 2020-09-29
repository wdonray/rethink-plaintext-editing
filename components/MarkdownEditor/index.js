import React from 'react';
import PropTypes from 'prop-types';
import MDEditor from '@uiw/react-md-editor';
import css from './style.css';
import path from 'path';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

// Highlight is not working
function MarkdownEditor({ file, write }) {
  const [value, setValue] = React.useState('');
  React.useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div>
      <div>
        <h1 style={{ textDecoration: 'underline' }}>
          {path.basename(file.name)}
        </h1>
        <Editor
          onChange={event => setValue(event.target.value)}
          className={css.container__editor}
          value={value}
          onValueChange={code => setValue(code)}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12
          }}
        />
        <button onClick={() => write(file, value)}>Save</button>
      </div>
      <MDEditor.Markdown source={value} />
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
