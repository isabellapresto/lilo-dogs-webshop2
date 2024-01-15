import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function LoginModal({ show, onHide, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Replace the following fetch URL with your login endpoint
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Clear input fields upon successful login
        setUsername('');
        setPassword('');
        setError('');
        // Add logic for handling successful login
        console.log('Login successful!');
        onHide();
      } else {
        // Clear input fields upon unsuccessful login
        setUsername('');
        setPassword('');
        const errorData = await response.json();
        setError(errorData.message || 'Inloggningen misslyckades.');
      }
    } catch (error) {
      console.error('Ett fel uppstod vid inloggning:', error);
      // Clear input fields upon error
      setUsername('');
      setPassword('');
      setError('Ett fel uppstod vid inloggning.');
    }
  };

  return (
    <Modal show={show} onHide={() => { onHide(); setUsername(''); setPassword(''); setError(''); }}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <Button variant="dark" onClick={handleLogin}>
            Login
          </Button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          <p style={{ marginTop: '10px' }}>
            Don't have an account?{' '}
            <span style={{ color: '#AB8262', cursor: 'pointer' }} onClick={onSwitchToRegister}>
              Register here
            </span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
