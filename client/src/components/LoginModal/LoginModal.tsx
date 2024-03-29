import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useUser } from '../../../Context/UserContext';

export default function LoginModal({ show, onHide, onSwitchToRegister }) { //Röda men funkar 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login, logout } = useUser();

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
        console.log('Användarobjekt:', userData.user);
        login(userData.user);
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
    logout();
  };

  return (
    <Modal show={show} onHide={() => { onHide(); setUsername(''); setPassword(''); setError(''); }}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? 'You are logged in' : 'Login'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <>
            <p>You are logged in with e-mail: {user.username}</p>
            <Button variant="dark" onClick={handleLogout}>
              Log out
            </Button>
          </>
        ) : (
          <Form>
            <Form.Group controlId="formUsername" style={{ marginBottom: '10px' }}>
              <Form.Control
                type="text"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" style={{ marginBottom: '10px' }}>
              <Form.Control
                type="password"
                placeholder="Password"
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
