import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function RegisterModal({ show, onHide }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Skicka användarnamn och lösenord till din backend för registrering
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Registreringen lyckades!');
        onHide(); // Stäng modalen efter registrering
      } else {
        console.error('Registreringen misslyckades.');
        // Visa felmeddelande eller vidta andra åtgärder vid registreringssvårigheter
      }
    } catch (error) {
      console.error('Ett fel uppstod vid registrering:', error);
      // Visa felmeddelande eller vidta andra åtgärder vid registreringssvårigheter
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
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
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
