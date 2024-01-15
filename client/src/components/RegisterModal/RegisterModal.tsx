import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function RegisterModal({ show, onHide, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
        setUsername(''); // Clear username input
        setPassword(''); // Clear password input
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registreringen misslyckades.');
        setSuccess(false);
      }
    } catch (error) {
      console.error('Ett fel uppstod vid registrering:', error);
      setError('Ett fel uppstod vid registrering.');
      setSuccess(false);
    }
  };

  return (
    <Modal show={show} onHide={() => { onHide(); setError(''); setSuccess(false); }}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success ? (
          <div>
            <p>You are now registered!</p>
            <Button variant="dark" onClick={onSwitchToLogin}>
              Login
            </Button>
          </div>
        ) : (
          <Form>
            <Form.Group controlId="formUsername" style={{ marginBottom: '10px' }}>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" style={{ marginBottom: '10px' }}>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" onClick={handleRegister}>
              Register
            </Button>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}
