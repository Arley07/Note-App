import React, { useState } from 'react'; // Agrega esta línea
import { Note } from '../services/api';
import DeleteConfirmationModal from './DeleteConfirmationModal';


interface NoteListProps {
  notes: Note[];
  onArchive: (id: number) => void;
  onDelete: (id: number) => void;
  showNumbers: boolean; // Prop para mostrar números
}

const NoteList: React.FC<NoteListProps> = ({ notes, onArchive, onDelete, showNumbers }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setNoteToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (noteToDelete !== null) {
      onDelete(noteToDelete);
      setShowDeleteModal(false);
    }
  };

  return (
    <div>
      {notes.map((note, index) => (
        <div key={note.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            {showNumbers && <h6 className="text-muted">Nota #{index + 1}</h6>}
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.content}</p>
            <div className="d-flex gap-2">
              <button
                onClick={() => onArchive(note.id)}
                className={`btn btn-sm ${note.archived ? 'btn-warning' : 'btn-success'}`}
              >
                {note.archived ? 'Desarchivar' : 'Archivar'}
              </button>
              <button
                onClick={() => handleDeleteClick(note.id)}
                className="btn btn-sm btn-danger"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default NoteList;