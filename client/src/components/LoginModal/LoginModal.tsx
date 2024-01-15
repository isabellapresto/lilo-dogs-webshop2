import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function LoginModal({ show, onHide, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Skicka användarnamn och lösenord till din backend för inloggning
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Inloggningen lyckades!');
        onHide(); // Stäng modalen efter inloggning
      } else {
        console.error('Inloggningen misslyckades.');
        // Visa felmeddelande eller vidta andra åtgärder vid inloggningssvårigheter
      }
    } catch (error) {
      console.error('Ett fel uppstod vid inloggning:', error);
      // Visa felmeddelande eller vidta andra åtgärder vid inloggningssvårigheter
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" onClick={onSwitchToRegister}>
            Switch to Register
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
