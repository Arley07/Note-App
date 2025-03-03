import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArchivedNotesPage from './pages/ArchivedNotesPage';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">Notas App</Link>
          <div className="navbar-nav">
            <Link to="/" className="nav-link">Activas</Link>
            <Link to="/archived" className="nav-link">Archivadas</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/archived" element={<ArchivedNotesPage />} />
      </Routes>
    </Router>
  );
};

export default App;