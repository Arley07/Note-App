import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import NoteList from '../componentes/NoteList';
import MessageModal from '../componentes/MessageModal';
import { getNotes, updateNote, deleteNote, getTags, Note } from '../services/api';

const ArchivedNotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageModalTitle, setMessageModalTitle] = useState('');
  const [messageModalMessage, setMessageModalMessage] = useState('');
  const [messageModalVariant, setMessageModalVariant] = useState<'success' | 'warning' | 'danger'>('success');
  const [showNumbers, setShowNumbers] = useState(false);
  const [tags, setTags] = useState<string[]>([]); // Estado para las categorías (tags)
  const [selectedTag, setSelectedTag] = useState<string | null>(null); // Estado para la categoría seleccionada

  const fetchNotes = async () => {
    const archivedNotes = await getNotes(true, selectedTag || undefined); // Filtra por categoría
    setNotes(archivedNotes);
  };

  const fetchTags = async () => {
    const tags = await getTags(); // Obtiene todas las categorías (tags)
    setTags(tags);
  };

  useEffect(() => {
    fetchNotes();
    fetchTags();
  }, [selectedTag]); // Actualiza las notas cuando cambia la categoría seleccionada

  const handleUnarchiveNote = async (id: number) => {
    await updateNote(id, { archived: false });
    showMessage('Nota desarchivada', 'success');
    fetchNotes();
  };

  const handleDeleteNote = async (id: number) => {
    await deleteNote(id);
    showMessage('Nota eliminada', 'danger');
    fetchNotes();
  };

  const showMessage = (message: string, variant: 'success' | 'warning' | 'danger') => {
    setMessageModalTitle(variant === 'success' ? 'Éxito' : variant === 'warning' ? 'Advertencia' : 'Error');
    setMessageModalMessage(message);
    setMessageModalVariant(variant);
    setShowMessageModal(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Notas Archivadas</h1>
      <div className="d-flex gap-2 mb-3">
        <Button variant="info" onClick={() => setShowNumbers(!showNumbers)}>
          {showNumbers ? 'Ocultar Números' : 'Enumerar'}
        </Button>
      </div>
      <div className="row">
        <div className="col-md-3">
          <h5>Categorías</h5>
          <ul className="list-group">
            <li
              className={`list-group-item ${selectedTag === null ? 'active' : ''}`}
              onClick={() => setSelectedTag(null)}
              style={{ cursor: 'pointer' }}
            >
              Todas
            </li>
            {tags.map((tag) => (
              <li
                key={tag}
                className={`list-group-item ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
                style={{ cursor: 'pointer' }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-9">
          <NoteList notes={notes} onArchive={handleUnarchiveNote} onDelete={handleDeleteNote} showNumbers={showNumbers} />
        </div>
      </div>
      <MessageModal
        show={showMessageModal}
        onHide={() => setShowMessageModal(false)}
        title={messageModalTitle}
        message={messageModalMessage}
        variant={messageModalVariant}
      />
    </div>
  );
};

export default ArchivedNotesPage;