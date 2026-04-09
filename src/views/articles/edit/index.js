import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dw90vkmoc/auto/upload';
const CLOUDINARY_UPLOAD_PRESET = 'akomyawo';

/* ─── Styles (identical design language to BlogCreate) ────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .blog-editor-root {
    --ink:        #1a1a2e;
    --ink-muted:  #5a5a7a;
    --paper:      #faf9f7;
    --surface:    #ffffff;
    --accent:     #c0392b;
    --accent-dim: #f5e6e4;
    --border:     #e8e4de;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: var(--paper);
    min-height: 100vh;
    padding: 2rem 1rem;
  }

  .blog-editor-root .editor-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .blog-editor-root .editor-header .header-rule {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, var(--ink) 0%, transparent 100%);
  }
  .blog-editor-root .editor-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
    white-space: nowrap;
  }
  .blog-editor-root .editor-header .edit-badge {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: var(--accent-dim);
    color: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 99px;
    padding: 2px 10px;
  }

  /* ── Skeleton loader ── */
  .blog-editor-root .skeleton {
    background: linear-gradient(90deg, var(--border) 25%, #f0ede7 50%, var(--border) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 6px;
  }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  .blog-editor-root .sk-title  { height: 48px; width: 70%; margin-bottom: 1.5rem; }
  .blog-editor-root .sk-editor { height: 320px; margin-bottom: 1.5rem; }
  .blog-editor-root .sk-image  { height: 180px; width: 100%; margin-bottom: 1.5rem; }
  .blog-editor-root .sk-btn    { height: 44px; width: 160px; }

  /* ── Card ── */
  .blog-editor-root .editor-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    box-shadow: 0 4px 32px rgba(26,26,46,0.06);
    overflow: hidden;
  }
  .blog-editor-root .editor-card-body { padding: 2rem 2.5rem; }

  /* ── Field label ── */
  .blog-editor-root .field-label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink-muted);
    margin-bottom: 0.45rem;
    display: block;
  }

  /* ── Title input ── */
  .blog-editor-root .title-input {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 600;
    border: none;
    border-bottom: 2px solid var(--border);
    border-radius: 0;
    padding: 0.4rem 0;
    background: transparent;
    color: var(--ink);
    width: 100%;
    outline: none;
    box-shadow: none !important;
    transition: border-color 0.2s;
  }
  .blog-editor-root .title-input:focus { border-bottom-color: var(--accent); }
  .blog-editor-root .title-input::placeholder { color: #bbb; }

  /* ── Quill ── */
  .blog-editor-root .ql-toolbar.ql-snow {
    border: 1.5px solid var(--border);
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    background: var(--paper);
    padding: 8px 12px;
    flex-wrap: wrap;
  }
  .blog-editor-root .ql-container.ql-snow {
    border: 1.5px solid var(--border);
    border-top: none;
    border-radius: 0 0 8px 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    min-height: 320px;
  }
  .blog-editor-root .ql-editor {
    min-height: 300px;
    line-height: 1.8;
    color: var(--ink);
    padding: 1.25rem 1.5rem;
  }
  .blog-editor-root .ql-editor h1,
  .blog-editor-root .ql-editor h2,
  .blog-editor-root .ql-editor h3 { font-family: 'Playfair Display', serif; }
  .blog-editor-root .ql-editor img {
    max-width: 100%;
    border-radius: 8px;
    margin: 0.75rem 0;
    display: block;
  }
  .blog-editor-root .ql-editor blockquote {
    border-left: 3px solid var(--accent);
    padding-left: 1rem;
    color: var(--ink-muted);
    font-style: italic;
  }

  /* ── Upload zone ── */
  .blog-editor-root .upload-zone {
    border: 2px dashed var(--border);
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    position: relative;
    background: var(--paper);
  }
  .blog-editor-root .upload-zone:hover,
  .blog-editor-root .upload-zone.drag-over {
    border-color: var(--accent);
    background: var(--accent-dim);
  }
  .blog-editor-root .upload-zone input[type='file'] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  .blog-editor-root .upload-zone .zone-icon { font-size: 2rem; margin-bottom: 0.5rem; }
  .blog-editor-root .upload-zone p { margin: 0; font-size: 0.85rem; color: var(--ink-muted); }
  .blog-editor-root .upload-zone strong { color: var(--accent); }

  /* ── Featured image preview ── */
  .blog-editor-root .featured-preview {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 0.75rem;
    max-width: 100%;
    aspect-ratio: 2/1;
    background: var(--border);
  }
  .blog-editor-root .featured-preview img { width: 100%; height: 100%; object-fit: cover; }
  .blog-editor-root .featured-preview .remove-btn {
    position: absolute;
    top: 8px; right: 8px;
    background: rgba(0,0,0,0.6);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 28px; height: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: background 0.2s;
  }
  .blog-editor-root .featured-preview .remove-btn:hover { background: var(--accent); }
  .blog-editor-root .featured-preview .replace-label {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: rgba(26,26,46,0.65);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    text-align: center;
    padding: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .blog-editor-root .featured-preview .replace-label:hover { background: rgba(192,57,43,0.8); }
  .blog-editor-root .featured-preview .replace-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  /* ── Attachment items ── */
  .blog-editor-root .attachment-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.75rem;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    margin-bottom: 0.5rem;
    background: var(--paper);
    transition: border-color 0.2s;
  }
  .blog-editor-root .attachment-item:hover { border-color: var(--accent); }
  .blog-editor-root .attachment-item .att-icon { font-size: 1.3rem; flex-shrink: 0; }
  .blog-editor-root .attachment-item .att-info { flex: 1; min-width: 0; }
  .blog-editor-root .attachment-item .att-name {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    text-decoration: none;
  }
  .blog-editor-root .attachment-item .att-name:hover { color: var(--accent); }
  .blog-editor-root .attachment-item .att-type { font-size: 0.72rem; color: var(--ink-muted); text-transform: uppercase; }
  .blog-editor-root .attachment-item .att-remove {
    background: none;
    border: none;
    color: var(--ink-muted);
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    transition: color 0.2s;
  }
  .blog-editor-root .attachment-item .att-remove:hover { color: var(--accent); }
  .blog-editor-root .attachment-item .att-thumb {
    width: 40px; height: 40px;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
  }

  /* ── Divider ── */
  .blog-editor-root .section-divider {
    border: none;
    border-top: 1.5px solid var(--border);
    margin: 2rem 0;
  }

  /* ── Submit bar ── */
  .blog-editor-root .submit-bar { display: flex; align-items: center; gap: 1rem; padding-top: 0.5rem; }

  .blog-editor-root .btn-publish {
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.04em;
    background: var(--ink);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.7rem 2rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .blog-editor-root .btn-publish:hover:not(:disabled) { background: var(--accent); transform: translateY(-1px); }
  .blog-editor-root .btn-publish:disabled { opacity: 0.5; cursor: not-allowed; }

  .blog-editor-root .btn-cancel {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    background: none;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    padding: 0.7rem 1.5rem;
    color: var(--ink-muted);
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .blog-editor-root .btn-cancel:hover { border-color: var(--ink); color: var(--ink); }

  /* ── Spinner ── */
  .blog-editor-root .spinner {
    display: inline-block;
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-right: 6px;
    vertical-align: middle;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Progress bar ── */
  .blog-editor-root .upload-progress { height: 3px; background: var(--border); border-radius: 99px; margin-top: 0.5rem; overflow: hidden; }
  .blog-editor-root .upload-progress-bar { height: 100%; background: var(--accent); border-radius: 99px; animation: indeterminate 1.4s ease infinite; }
  @keyframes indeterminate { 0% { transform: translateX(-100%); width: 60%; } 100% { transform: translateX(200%); width: 60%; } }
`;

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const cloudinaryUpload = async file => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('resource_type', 'auto');
  const response = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
  if (!response.ok) throw new Error('Upload failed');
  const data = await response.json();
  if (!data.secure_url) throw new Error('Upload did not return a URL');
  return { url: data.secure_url, name: file.name, type: file.type };
};

const normalizeAttachment = a => {
  if (!a) return null;
  return typeof a === 'string'
    ? { url: a, name: a.split('/').pop(), type: '' }
    : a;
};

const fileIcon = type => {
  if (!type) return '📎';
  if (type.startsWith('image/')) return null;
  if (type === 'application/pdf') return '📄';
  if (type.includes('word') || type.includes('doc')) return '📝';
  if (type.includes('sheet') || type.includes('excel') || type.includes('xlsx')) return '📊';
  if (type.includes('presentation') || type.includes('ppt')) return '📑';
  if (type.includes('zip') || type.includes('rar')) return '🗜️';
  if (type.startsWith('video/')) return '🎬';
  if (type.startsWith('audio/')) return '🎵';
  return '📎';
};

const FORMATS = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'align', 'color', 'background',
];

/* ─── Component ───────────────────────────────────────────────────────────── */
const BlogEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const quillRef = useRef(null);
  const inlineImageInputRef = useRef(null);
  const replaceImageInputRef = useRef(null);

  const [loading, setLoading]           = useState(true);
  const [title, setTitle]               = useState('');
  const [content, setContent]           = useState('');
  const [image_url, setImage]           = useState('');
  const [attachments, setAttachments]   = useState([]);
  const [uploadingImage, setUploadingImage]         = useState(false);
  const [uploadingAttachments, setUploadingAttachments] = useState(false);
  const [uploadingInline, setUploadingInline]       = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [dragOver, setDragOver]         = useState(false);

  /* ── Fetch existing post ── */
  useEffect(() => {
    fetch(`https://ako-api.vercel.app/posts/${id}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(d => {
        if (d) {
          setTitle(d.title || '');
          setContent(d.content || '');
          setImage(d.image_url || '');
          setAttachments((d.attachments || []).map(normalizeAttachment).filter(Boolean));
        }
      })
      .catch(() => toast.error('Unable to load article'))
      .finally(() => setLoading(false));
  }, [id]);

  /* ── Inline image into Quill ── */
  const insertImageIntoEditor = useCallback(url => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;
    const range = quill.getSelection(true);
    quill.insertEmbed(range.index, 'image', url);
    quill.setSelection(range.index + 1);
  }, []);

  const handleInlineImageUpload = async e => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingInline(true);
    try {
      for (const file of files) {
        const uploaded = await cloudinaryUpload(file);
        insertImageIntoEditor(uploaded.url);
      }
      toast.success('Image(s) inserted into article');
    } catch {
      toast.error('Failed to insert image');
    } finally {
      setUploadingInline(false);
      e.target.value = '';
    }
  };

  /* ── Quill toolbar modules ── */
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        image: () => inlineImageInputRef.current?.click(),
      },
    },
  };

  /* ── Featured image ── */
  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const uploaded = await cloudinaryUpload(file);
      setImage(uploaded.url);
      toast.success('Featured image updated');
    } catch {
      toast.error('Featured image upload failed');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  /* ── Attachments ── */
  const processAttachmentFiles = async files => {
    if (!files.length) return;
    setUploadingAttachments(true);
    try {
      const uploaded = await Promise.all(files.map(cloudinaryUpload));
      setAttachments(prev => [...prev, ...uploaded]);
      toast.success(`${uploaded.length} file(s) attached`);
    } catch {
      toast.error('Attachment upload failed');
    } finally {
      setUploadingAttachments(false);
    }
  };

  const handleAttachmentsUpload = e =>
    processAttachmentFiles(Array.from(e.target.files || []));

  const handleDrop = e => {
    e.preventDefault();
    setDragOver(false);
    processAttachmentFiles(Array.from(e.dataTransfer.files || []));
  };

  const removeAttachment = idx =>
    setAttachments(prev => prev.filter((_, i) => i !== idx));

  /* ── Submit ── */
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(`https://ako-api.vercel.app/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, image_url, attachments }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await response.json();
      toast.success('Article updated successfully');
      navigate('/articles');
    } catch {
      toast.error('Something went wrong, try again');
    } finally {
      setSubmitting(false);
    }
  };

  const busy = uploadingImage || uploadingAttachments || uploadingInline || submitting;

  return (
    <>
      <style>{styles}</style>

      {/* Hidden inputs */}
      <input
        ref={inlineImageInputRef}
        type='file'
        accept='image/*'
        multiple
        style={{ display: 'none' }}
        onChange={handleInlineImageUpload}
      />
      <input
        ref={replaceImageInputRef}
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />

      <div className='blog-editor-root'>

        {/* Header */}
        <div className='editor-header'>
          <h1>Edit Article</h1>
          <span className='edit-badge'>Editing</span>
          <div className='header-rule' />
        </div>

        <div className='editor-card'>
          <div className='editor-card-body'>

            {loading ? (
              /* ── Skeleton ── */
              <>
                <div className='skeleton sk-title' />
                <div className='skeleton sk-editor' />
                <div className='skeleton sk-image' />
                <div className='skeleton sk-btn' />
              </>
            ) : (
              <>
                {/* Title */}
                <div className='mb-4'>
                  <label className='field-label'>Article Title</label>
                  <input
                    className='title-input'
                    placeholder='Enter a compelling title…'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>

                {/* Content */}
                <div className='mb-4'>
                  <label className='field-label'>
                    Content
                    {uploadingInline && (
                      <span style={{ marginLeft: '0.5rem', color: '#c0392b', fontWeight: 400 }}>
                        <span className='spinner' style={{ borderTopColor: '#c0392b', borderColor: 'rgba(192,57,43,0.3)' }} />
                        Inserting image…
                      </span>
                    )}
                  </label>
                  <ReactQuill
                    ref={quillRef}
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={FORMATS}
                    placeholder='Write your article here. Use the image icon in the toolbar to embed images…'
                  />
                  <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.4rem' }}>
                    💡 Tip: click the <strong>image icon</strong> in the toolbar to embed images inline within your article.
                  </p>
                </div>

                <hr className='section-divider' />

                {/* Featured image */}
                <div className='mb-4'>
                  <label className='field-label'>Featured Image</label>
                  {!image_url ? (
                    <>
                      <div className='upload-zone'>
                        <input type='file' accept='image/*' onChange={handleImageUpload} disabled={uploadingImage} />
                        <div className='zone-icon'>🖼️</div>
                        <p><strong>Click to upload</strong> or drag &amp; drop</p>
                        <p style={{ marginTop: '0.2rem' }}>Recommended: 800 × 400 px</p>
                      </div>
                      {uploadingImage && <div className='upload-progress'><div className='upload-progress-bar' /></div>}
                    </>
                  ) : (
                    <>
                      <div className='featured-preview'>
                        <img src={image_url} alt='Featured preview' />
                        {/* Replace overlay */}
                        <label className='replace-label'>
                          {uploadingImage ? '⏳ Uploading…' : '🔄 Click to replace image'}
                          <input
                            className='replace-input'
                            type='file'
                            accept='image/*'
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                          />
                        </label>
                        {/* Remove button */}
                        <button className='remove-btn' onClick={() => setImage('')} title='Remove image'>✕</button>
                      </div>
                      {uploadingImage && <div className='upload-progress'><div className='upload-progress-bar' /></div>}
                    </>
                  )}
                </div>

                {/* Attachments */}
                <div className='mb-4'>
                  <label className='field-label'>Attachments</label>
                  <div
                    className={`upload-zone${dragOver ? ' drag-over' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                  >
                    <input
                      type='file'
                      multiple
                      accept='image/*,video/*,audio/*,.pdf,.doc,.docx,.xlsx,.xls,.ppt,.pptx,.txt,.csv,.zip,.rar,.7z,.mp4,.mov,.mp3'
                      onChange={handleAttachmentsUpload}
                      disabled={uploadingAttachments}
                    />
                    <div className='zone-icon'>📎</div>
                    <p><strong>Click to attach files</strong> or drag &amp; drop</p>
                    <p style={{ marginTop: '0.2rem' }}>Images, PDFs, Word, Excel, PowerPoint, Videos, Audio, ZIP…</p>
                  </div>
                  {uploadingAttachments && <div className='upload-progress'><div className='upload-progress-bar' /></div>}

                  {attachments.length > 0 && (
                    <div className='mt-3'>
                      {attachments.map((file, idx) => {
                        const icon = fileIcon(file.type);
                        const isImage = file.type?.startsWith('image/');
                        return (
                          <div key={idx} className='attachment-item'>
                            {isImage
                              ? <img src={file.url} alt={file.name} className='att-thumb' />
                              : <span className='att-icon'>{icon}</span>
                            }
                            <div className='att-info'>
                              <a href={file.url} target='_blank' rel='noreferrer' className='att-name'>
                                {file.name}
                              </a>
                              <span className='att-type'>{file.type || 'attachment'}</span>
                            </div>
                            <button className='att-remove' onClick={() => removeAttachment(idx)} title='Remove'>✕</button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <hr className='section-divider' />

                {/* Actions */}
                <div className='submit-bar'>
                  <button className='btn-publish' onClick={handleSubmit} disabled={busy}>
                    {submitting ? <><span className='spinner' />Saving…</> : 'Save Changes'}
                  </button>
                  <button className='btn-cancel' onClick={() => navigate('/articles')} disabled={busy}>
                    Cancel
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default BlogEdit;
