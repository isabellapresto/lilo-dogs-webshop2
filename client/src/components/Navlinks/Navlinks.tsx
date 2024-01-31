import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { FaBars, FaUser, FaShoppingBag } from 'react-icons/fa';
import LogoWhite from "../../assets/logo/logo-white.png";
import "./NavLinks.css";
import Cart from '../Cart/Cart';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import { useUser } from "../../../Context/UserContext";
import { useCart } from "../../../Context/CartContext"; // Importera useCart från CartContext

export default function Navlinks() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { user } = useUser();
  const { cartItemCount } = useCart(); // Använd useCart för att få cartItemCount

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 200;
      setScrolling(!isTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentPath = window.location.pathname;
  const isProductPage = currentPath.includes('/products');
  const isMyOrdersPage = currentPath.includes('/my-orders');
  const isSuccessPage = currentPath.includes('/success');
  const isDetailsPage = currentPath.includes('/delivery-details');
  const isProductOrMyOrdersOrSuccessPage = isProductPage || isMyOrdersPage  || isSuccessPage || isDetailsPage;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCartDrawerToggle = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  const handleLoginModalToggle = () => {
    setLoginModalOpen(!loginModalOpen);
  };

  const handleRegisterModalToggle = () => {
    setRegisterModalOpen(!registerModalOpen);
  };

  const handleSwitchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Navbar
      variant="dark"
      expand="lg"
      fixed="top"
      className="justify-content-start"
      style={{
        backgroundColor: isProductOrMyOrdersOrSuccessPage || scrolling ? '#888168' : 'transparent'
      }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleMobileMenuToggle}>
          <FaBars />
        </Navbar.Toggle>

        <Navbar.Brand className="ms-auto" href="#">
          <img
            alt="Logo"
            src={LogoWhite}
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Nav className="d-lg-none ms-auto me-3">
          <div className="d-flex">
            <Nav.Link onClick={handleLoginModalToggle} className="me-3">
              <FaUser  />
            </Nav.Link>
            <Nav.Link onClick={handleCartDrawerToggle}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
      <FaShoppingBag style={{ fontSize: '18px' }} />
      {cartItemCount > 0 && (
        <span
          className="badge bg-secondary"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            fontSize: '10px',
            transform: 'translate(50%, -50%)', // Centrerar vertikalt och horisontellt
          }}
        >
          {cartItemCount}
        </span>
      )}
    </div>
            </Nav.Link>
          </div>
        </Nav>

        <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
          <Nav className="ms-auto">
            <Nav.Link href={`/`}>HOME</Nav.Link>
            <Nav.Link href={`/products`}>SHOP</Nav.Link>
            {user && <Nav.Link href={`/my-orders`}>MY ORDERS</Nav.Link>}
          </Nav>
        </Navbar.Collapse>

        <Nav className="d-none d-lg-flex align-items-center">
          {isLoggedIn ? (
            <Nav.Link onClick={handleLogout} className="me-3">
              <FaUser  />
            </Nav.Link>
          ) : (
            <Nav.Link onClick={handleLoginModalToggle} className="me-3">
              <FaUser style={{ fontSize: '18px' }}  />
            </Nav.Link>
          )}
          <Nav.Link onClick={handleCartDrawerToggle}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
      <FaShoppingBag style={{ fontSize: '18px' }} />
      {cartItemCount > 0 && (
        <p
          className="badge bg-secondary"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            fontSize: '10px',
            transform: 'translate(50%, -50%)', // Centrerar vertikalt och horisontellt
          }}
        >
          {cartItemCount}
        </p>
      )}
    </div>
          </Nav.Link>
        </Nav>

        <Offcanvas show={mobileMenuOpen} onHide={() => setMobileMenuOpen(false)} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>MENU</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Item>
                <Nav.Link href={`/`}>HOME</Nav.Link>
                <Nav.Link href={`/products`}>SHOP</Nav.Link>
              </Nav.Item>
              {user && (
                <Nav.Item>
                  {user && <Nav.Link href={`/my-orders`}>MY ORDERS</Nav.Link>}
                </Nav.Item>
              )}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        <Cart show={cartDrawerOpen} onHide={() => setCartDrawerOpen(false)} />

        <LoginModal show={loginModalOpen} onHide={handleLoginModalToggle} onSwitchToRegister={handleSwitchToRegister} onLogin={handleLogin} />
        <RegisterModal show={registerModalOpen} onHide={handleRegisterModalToggle} onSwitchToLogin={handleSwitchToLogin} />
      </Container>
    </Navbar>
  );
}
