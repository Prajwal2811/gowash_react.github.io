import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

function Login() {
  const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

    const [email, setEmail] = useState('admin@gowash.com');
    const [password, setPassword] = useState('admin123');
    const [message, setMessage] = useState(null);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login check
    if (email === 'admin@gowash.com' && password === 'admin123') {
      setMessage({ type: 'success', text: 'Login successful!' });
      
      // Simulate short delay before redirecting (e.g., API processing)
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } else {
      setMessage({ type: 'danger', text: 'Invalid email or password.' });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 shadow">
            <div className="text-center mb-4">
              {/* <h2 style={{ fontWeight: 'bold', color: '#007bff' }}>GoWash</h2> */}
              <small className="text-muted">Admin Panel</small>
            </div>

            {message && <Alert variant={message.type}>{message.text}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}               // <-- This shows the current email state in the input
                onChange={(e) => setEmail(e.target.value)}  // Updates email state as you type
                required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Password"
                value={password}           // <-- This shows the current password state in the input
                onChange={(e) => setPassword(e.target.value)} // Updates password state as you type
                required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
                Login
            </Button>
            </Form>

          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
