"use client";
import { useEffect, useState } from 'react';
import 'ckeditor5/ckeditor5.css';

export default function BlogEditor({ data, onChange }) {
  const [mounted, setMounted] = useState(false);
  const [Editor, setEditor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🔄 BlogEditor useEffect triggered');
    setMounted(true);

    console.log('📦 Starting to import CKEditor modules...');

    // Import CKEditor components
    import('@ckeditor/ckeditor5-react')
      .then((CKEditorModule) => {
        console.log('✅ Step 1: CKEditor React loaded');
        return import('ckeditor5').then((ckeditor5Module) => {
          console.log('✅ Step 2: CKEditor5 core loaded');
          setEditor({
            CKEditor: CKEditorModule.CKEditor,
            ClassicEditor: ckeditor5Module.ClassicEditor,
            Bold: ckeditor5Module.Bold,
            Essentials: ckeditor5Module.Essentials,
            Italic: ckeditor5Module.Italic,
            Paragraph: ckeditor5Module.Paragraph,
            Undo: ckeditor5Module.Undo,
            Heading: ckeditor5Module.Heading,
            Link: ckeditor5Module.Link,
            List: ckeditor5Module.List,
            BlockQuote: ckeditor5Module.BlockQuote,
            Table: ckeditor5Module.Table,
            TableToolbar: ckeditor5Module.TableToolbar,
            Image: ckeditor5Module.Image,
            ImageCaption: ckeditor5Module.ImageCaption,
            ImageStyle: ckeditor5Module.ImageStyle,
            ImageToolbar: ckeditor5Module.ImageToolbar,
            ImageUpload: ckeditor5Module.ImageUpload,
            Underline: ckeditor5Module.Underline,
            Strikethrough: ckeditor5Module.Strikethrough,
            HorizontalLine: ckeditor5Module.HorizontalLine,
            Indent: ckeditor5Module.Indent,
          });
          console.log('✅ CKEditor modules loaded successfully! Editor should appear now.');
        });
      })
      .catch((err) => {
        console.error('❌ Failed to load CKEditor:', err);
        console.error('❌ Error details:', err.stack);
        setError(err.message);
      });
  }, []);

  // Don't render anything on server
  if (!mounted) {
    return null;
  }

  // Show loading state
  if (!Editor) {
    return (
      <div style={{
        border: '2px solid rgba(206, 155, 40, 0.2)',
        borderRadius: '8px',
        padding: '50px 20px',
        textAlign: 'center',
        background: '#fafafa',
        minHeight: '450px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {error ? (
          <>
            <div style={{ fontSize: '48px' }}>❌</div>
            <p style={{ color: '#f44336', fontWeight: 600, margin: 0 }}>
              Failed to load editor
            </p>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                background: '#ce9b28',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Reload Page
            </button>
          </>
        ) : (
          <>
            <div style={{
              width: '60px',
              height: '60px',
              border: '5px solid rgba(206, 155, 40, 0.2)',
              borderTopColor: '#ce9b28',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ color: '#666', fontSize: '16px', fontWeight: 500, margin: 0 }}>
              Loading rich text editor...
            </p>
            <p style={{ color: '#999', fontSize: '13px', margin: 0 }}>
              This may take a few seconds
            </p>
          </>
        )}
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const { CKEditor, ClassicEditor, ...plugins } = Editor;

  // Custom upload adapter
  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return {
        upload: () => {
          return loader.file.then(file => new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);

            fetch('/api/upload/blog-image', {
              method: 'POST',
              body: formData
            })
              .then(res => res.json())
              .then(data => {
                if (data.url) {
                  resolve({ default: data.url });
                } else {
                  reject(data.error || 'Upload failed');
                }
              })
              .catch(reject);
          }));
        }
      };
    };
  }

  return (
    <div className="ckeditor-container">
      <CKEditor
        editor={ClassicEditor}
        data={data || ''}
        config={{
          licenseKey: 'GPL',
          toolbar: [
            'undo', 'redo', '|',
            'heading', '|',
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'link', 'uploadImage', 'blockQuote', 'insertTable', 'horizontalLine', '|',
            'bulletedList', 'numberedList', '|',
            'indent', 'outdent'
          ],
          plugins: [
            plugins.Bold,
            plugins.Essentials,
            plugins.Italic,
            plugins.Paragraph,
            plugins.Undo,
            plugins.Heading,
            plugins.Link,
            plugins.List,
            plugins.BlockQuote,
            plugins.Table,
            plugins.TableToolbar,
            plugins.Image,
            plugins.ImageCaption,
            plugins.ImageStyle,
            plugins.ImageToolbar,
            plugins.ImageUpload,
            plugins.Underline,
            plugins.Strikethrough,
            plugins.HorizontalLine,
            plugins.Indent,
            CustomUploadAdapterPlugin
          ],
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
            ]
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
          },
          image: {
            toolbar: [
              'imageStyle:inline',
              'imageStyle:block',
              'imageStyle:side',
              '|',
              'toggleImageCaption',
              'imageTextAlternative'
            ]
          },
          link: {
            defaultProtocol: 'https://',
            decorators: {
              openInNewTab: {
                mode: 'manual',
                label: 'Open in new tab',
                defaultValue: true,
                attributes: {
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }
              }
            }
          },
          placeholder: 'Start writing your blog content here...\n\n✨ Use the toolbar to format text, add images, tables, and more!'
        }}
        onReady={(editor) => {
          console.log('✅ Editor is ready!', editor);
        }}
        onChange={(event, editor) => {
          const content = editor.getData();
          onChange(content);
        }}
        onError={(error, details) => {
          console.error('Editor error:', error, details);
        }}
      />

      <style jsx global>{`
        /* CKEditor Container */
        .ckeditor-container {
          width: 100%;
          max-width: 100%; /* No max-width restriction */
          position: relative;
          isolation: isolate;
        }

        .ckeditor-container .ck.ck-editor {
          width: 100%;
          max-width: 100%; /* Ensure editor uses full width */
          display: block;
        }

        /* Toolbar - Fixed Layout */
        .ckeditor-container .ck.ck-toolbar {
          background: linear-gradient(90deg, #fafafa 0%, #ffffff 100%) !important;
          border: 2px solid rgba(206, 155, 40, 0.3) !important;
          border-bottom: 1px solid rgba(206, 155, 40, 0.2) !important;
          border-radius: 8px 8px 0 0 !important;
          padding: 10px 12px !important;
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 4px !important;
          align-items: center !important;
        }

        .ckeditor-container .ck.ck-toolbar .ck-toolbar__items {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 4px !important;
          align-items: center !important;
        }

        /* Toolbar Buttons */
        .ckeditor-container .ck.ck-button {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-width: 36px !important;
          min-height: 36px !important;
          padding: 6px 8px !important;
          background: transparent !important;
          border: 1px solid transparent !important;
          border-radius: 4px !important;
          transition: all 0.2s ease !important;
          cursor: pointer !important;
        }

        .ckeditor-container .ck.ck-button:not(.ck-disabled):hover {
          background: rgba(206, 155, 40, 0.1) !important;
          border-color: rgba(206, 155, 40, 0.2) !important;
        }

        .ckeditor-container .ck.ck-button.ck-on {
          background: rgba(206, 155, 40, 0.2) !important;
          border-color: rgba(206, 155, 40, 0.4) !important;
        }

        .ckeditor-container .ck.ck-button .ck-button__label {
          display: inline !important;
        }

        /* Toolbar Separator */
        .ckeditor-container .ck.ck-toolbar__separator {
          width: 1px !important;
          height: 28px !important;
          background: rgba(206, 155, 40, 0.3) !important;
          margin: 0 4px !important;
        }

        /* Dropdown */
        .ckeditor-container .ck.ck-dropdown {
          display: inline-block !important;
        }

        .ckeditor-container .ck.ck-dropdown__button {
          min-width: 70px !important;
        }

        /* Editable Area */
        .ckeditor-container .ck.ck-editor__editable {
          min-height: 450px !important;
          max-height: 650px !important;
          overflow-y: auto !important;
          border: 2px solid rgba(206, 155, 40, 0.3) !important;
          border-top: none !important;
          border-radius: 0 0 8px 8px !important;
          padding: 25px !important;
          font-size: 16px !important;
          line-height: 1.8 !important;
          background: #ffffff !important;
        }

        .ckeditor-container .ck.ck-editor__editable:focus {
          border-color: #ce9b28 !important;
          box-shadow: 0 0 0 3px rgba(206, 155, 40, 0.1) !important;
          outline: none !important;
        }

        .ckeditor-container .ck.ck-editor__editable.ck-focused {
          border-color: #ce9b28 !important;
          box-shadow: 0 0 0 3px rgba(206, 155, 40, 0.1) !important;
        }

        /* Content Styling */
        .ckeditor-container .ck-content h1 {
          font-size: 32px !important;
          font-weight: 700 !important;
          margin: 20px 0 15px !important;
          color: #000 !important;
        }

        .ckeditor-container .ck-content h2 {
          font-size: 28px !important;
          font-weight: 700 !important;
          margin: 18px 0 12px !important;
          color: #000 !important;
        }

        .ckeditor-container .ck-content h3 {
          font-size: 24px !important;
          font-weight: 700 !important;
          margin: 16px 0 10px !important;
          color: #000 !important;
        }

        .ckeditor-container .ck-content p {
          margin-bottom: 15px !important;
        }

        .ckeditor-container .ck-content ul,
        .ckeditor-container .ck-content ol {
          margin: 15px 0 !important;
          padding-left: 30px !important;
        }

        .ckeditor-container .ck-content li {
          margin-bottom: 8px !important;
        }

        .ckeditor-container .ck-content a {
          color: #ce9b28 !important;
          text-decoration: underline !important;
        }

        .ckeditor-container .ck-content blockquote {
          border-left: 4px solid #ce9b28 !important;
          padding: 15px 20px !important;
          margin: 20px 0 !important;
          background: rgba(206, 155, 40, 0.05) !important;
          font-style: italic !important;
          color: #666 !important;
        }

        .ckeditor-container .ck-content table {
          margin: 20px 0 !important;
          border-collapse: collapse !important;
          width: 100% !important;
        }

        .ckeditor-container .ck-content table td,
        .ckeditor-container .ck-content table th {
          border: 1px solid #ddd !important;
          padding: 12px !important;
        }

        .ckeditor-container .ck-content table th {
          background: rgba(206, 155, 40, 0.1) !important;
          font-weight: 700 !important;
        }

        .ckeditor-container .ck-content img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 8px !important;
          margin: 20px 0 !important;
        }

        /* Fix for dropdown panels */
        .ck.ck-dropdown__panel {
          z-index: 9999 !important;
        }

        /* Fix for balloon panels */
        .ck.ck-balloon-panel {
          z-index: 9999 !important;
        }
      `}</style>
    </div>
  );
}
