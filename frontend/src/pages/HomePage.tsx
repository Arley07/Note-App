import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import NoteList from '../componentes/NoteList';
import CreateNoteModal from '../componentes/CreateNoteModal';
import MessageModal from '../componentes/MessageModal';
import { getNotes, createNote, updateNote, deleteNote, Note } from '../services/api';

const HomePage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageModalTitle, setMessageModalTitle] = useState('');
  const [messageModalMessage, setMessageModalMessage] = useState('');
  const [messageModalVariant, setMessageModalVariant] = useState<'success' | 'warning' | 'danger'>('success');
  const [showNumbers, setShowNumbers] = useState(false); // Estado para mostrar números

  const fetchNotes = async () => {
    const activeNotes = await getNotes(false);
    setNotes(activeNotes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async (note: { title: string; content: string }) => {
    await createNote(note);
    showMessage('Nota creada exitosamente', 'success');
    fetchNotes();
  };

  const handleArchiveNote = async (id: number) => {
    await updateNote(id, { archived: true });
    showMessage('Nota archivada', 'warning');
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
      <h1 className="mb-4">Notas Activas</h1>
      <div className="d-flex gap-2 mb-3">
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          Crear Nota
        </Button>
        <Button variant="info" onClick={() => setShowNumbers(!showNumbers)}>
          {showNumbers ? 'Ocultar Números' : 'Enumerar'}
        </Button>
      </div>
      <NoteList notes={notes} onArchive={handleArchiveNote} onDelete={handleDeleteNote} showNumbers={showNumbers} />
      <CreateNoteModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onCreate={handleCreateNote}
      />
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

export default HomePage;