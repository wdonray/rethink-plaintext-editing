import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import { Editor } from '@tinymce/tinymce-react';
import css from './style.css';

function PlaintextEditor({ file, write }) {
  const [value, setValue] = React.useState('');
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setValue(await file.text());
      setSaved(false);
    })();
  }, [file]);

  return (
    <div>
      <h1 style={{ textDecoration: 'underline' }}>
        {path.basename(file.name)}
      </h1>
      <Editor
        apiKey="71kldpr49t2zcz4ikb3jvp1umfq1efdct7upw0izffufxrig"
        initialValue={'Loading'}
        value={value}
        onChange={event => setValue(event.target.getContent())}
        init={{
          setup: function(editor) {
            editor.ui.registry.addButton('customInsertButton', {
              text: 'Save',
              onAction: function() {
                write(file, editor.getContent());
                setSaved(true);
              }
            });
          },
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          height: 500,
          branding: false,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'customInsertButton |undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
        }}
      />
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
