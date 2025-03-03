import React, { useState } from 'react';

interface NoteFormProps {
  onSubmit: (note: { title: string; content: string }) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Crear Nueva Nota</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Contenido</label>
            <textarea
              className="form-control"
              id="content"
              placeholder="Contenido"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Crear Nota</button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;