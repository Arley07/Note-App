import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import NoteList from '../componentes/NoteList';
import MessageModal from '../componentes/MessageModal';
import { getNotes, updateNote, deleteNote, Note } from '../services/api';

const ArchivedNotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageModalTitle, setMessageModalTitle] = useState('');
  const [messageModalMessage, setMessageModalMessage] = useState('');
  const [messageModalVariant, setMessageModalVariant] = useState<'success' | 'warning' | 'danger'>('success');
  const [showNumbers, setShowNumbers] = useState(false); // Estado para mostrar números

  const fetchNotes = async () => {
    const archivedNotes = await getNotes(true);
    setNotes(archivedNotes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

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
      <NoteList notes={notes} onArchive={handleUnarchiveNote} onDelete={handleDeleteNote} showNumbers={showNumbers} />
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