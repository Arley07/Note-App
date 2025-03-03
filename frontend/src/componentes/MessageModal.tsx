import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface MessageModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  message: string;
  variant?: 'success' | 'warning' | 'danger';
}

const MessageModal: React.FC<MessageModalProps> = ({ show, onHide, title, message, variant = 'success' }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success':
        return 'bg-success text-white';
      case 'warning':
        return 'bg-warning text-white';
      case 'danger':
        return 'bg-danger text-white';
      default:
        return 'bg-success text-white';
    }
  };

  // Cambiar el título a "Éxito" si el variant es "danger"
  const getTitle = () => {
    return variant === 'danger' ? 'Éxito' : title;
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className={getVariantClass()}>
        <Modal.Title>{getTitle()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;