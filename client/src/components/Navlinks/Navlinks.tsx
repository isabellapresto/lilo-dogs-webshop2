import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { FaBars, FaUser, FaShoppingBag } from 'react-icons/fa';
import LogoWhite from "../../assets/logo/logo-white.png";
import "./NavLinks.css";
import Cart from '../Cart/Cart';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';

export default function Navlinks() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

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
    // Logic for handling successful login
    // Set isLoggedIn to true and close the login modal
    setIsLoggedIn(true);
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    // Logic for handling logout
    // Set isLoggedIn to false
    setIsLoggedIn(false);
  };

  return (
    <Navbar
      variant="dark"
      expand="lg"
      fixed="top"
      className="justify-content-start"
      style={{
        backgroundColor: scrolling ? '#888168' : 'transparent',
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
              <FaUser />
            </Nav.Link>
            <Nav.Link onClick={handleCartDrawerToggle}>
              <FaShoppingBag />
            </Nav.Link>
          </div>
        </Nav>

        <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
          <Nav className="ms-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#about">SHOP</Nav.Link>
            <Nav.Link href="#projects">ABOUT US</Nav.Link>
            {isLoggedIn && <Nav.Link href="#orders">MY ORDERS</Nav.Link>}
          </Nav>
        </Navbar.Collapse>

        <Nav className="d-none d-lg-flex align-items-center">
          {isLoggedIn ? (
            <Nav.Link onClick={handleLogout} className="me-3">
              <FaUser />
            </Nav.Link>
          ) : (
            <Nav.Link onClick={handleLoginModalToggle} className="me-3">
              <FaUser />
            </Nav.Link>
          )}
          <Nav.Link onClick={handleCartDrawerToggle}>
            <FaShoppingBag />
          </Nav.Link>
        </Nav>

        <Offcanvas show={mobileMenuOpen} onHide={() => setMobileMenuOpen(false)} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>MENU</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Item>
                <Nav.Link href="#" active>
                  HOME
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#">
                  SHOP
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" as="span">
                  ABOUT US
                </Nav.Link>
              </Nav.Item>
              {isLoggedIn && (
                <Nav.Item>
                  <Nav.Link href="#orders">
                    MY ORDERS
                  </Nav.Link>
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


//LILO loggan ändra färg?
// ikoner horisontellt
// bort med ringen runt menyn
