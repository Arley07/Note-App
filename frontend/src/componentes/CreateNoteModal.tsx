import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface CreateNoteModalProps {
  show: boolean;
  onHide: () => void;
  onCreate: (note: { title: string; content: string; tags?: string[] }) => void;
  tags: string[]; // Lista de categorías disponibles
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ show, onHide, onCreate, tags }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // Estado para las categorías seleccionadas

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ title, content, tags: selectedTags });
    setTitle('');
    setContent('');
    setSelectedTags([]);
    onHide();
  };

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag)); // Desmarcar la categoría
    } else {
      setSelectedTags([...selectedTags, tag]); // Marcar la categoría
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nueva Nota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Contenido"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categorías</Form.Label>
            <div>
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'primary' : 'outline-primary'}
                  onClick={() => handleTagChange(tag)}
                  className="me-2 mb-2"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Crear Nota
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNoteModal;