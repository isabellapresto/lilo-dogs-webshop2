import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useUser } from "../../../Context/UserContext"


export default function LoginModal({ show, onHide, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login, logout } = useUser(); // Hämta user, login och logout från useUser-hook

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        console.log('Användarobjekt:', userData.user); // notera .user här
        login(userData.user); // notera .user här
        onHide();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Inloggningen misslyckades.');
      }
    } catch (error) {
      setError('Ett fel uppstod vid inloggning.');
    }
  };
  

  const handleLogout = () => {
    // Logga ut användaren
    logout();
    // Eventuell annan logik för utloggning
  };

  return (
    <Modal show={show} onHide={() => { onHide(); setUsername(''); setPassword(''); setError(''); }}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? 'Du är inloggad' : 'Login'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          // Visa inloggningsstatus
          <>
            <p>Du är inloggad som {user.username}</p>
            <Button variant="dark" onClick={handleLogout}>
              Logga ut
            </Button>
          </>
        ) : (
          // Visa inloggningsformulär om användaren inte är inloggad
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
          </Form>
        )}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {!user && (
          <p style={{ marginTop: '10px' }}>
            Don't have an account?{' '}
            <span style={{ color: '#AB8262', cursor: 'pointer' }} onClick={onSwitchToRegister}>
              Register here
            </span>
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
}