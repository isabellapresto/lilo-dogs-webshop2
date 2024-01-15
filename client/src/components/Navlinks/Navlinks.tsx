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
        {/* Hamburger menu icon for small screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleMobileMenuToggle}>
          <FaBars />
        </Navbar.Toggle>

        {/* Logo */}
        <Navbar.Brand className="ms-auto" href="#">
          <img
            alt="Logo"
            src={LogoWhite}
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Icons for Member and Shopping Bag (visible only on mobile devices) */}
        <Nav className="d-lg-none ms-auto me-3">
          <div className="d-flex">
            <Nav.Link onClick={handleLoginModalToggle} className="me-3">
              <FaUser /> {/* Member-icon */}
            </Nav.Link>
            <Nav.Link onClick={handleCartDrawerToggle}>
              <FaShoppingBag /> {/* Shopping bag-icon */}
            </Nav.Link>
          </div>
        </Nav>

        {/* Navigation links */}
        <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
          <Nav className="ms-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#about">SHOP</Nav.Link>
            <Nav.Link href="#projects">ABOUT US</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Icons for Member and Shopping Bag (visible only on larger screens) */}
        <Nav className="d-none d-lg-flex align-items-center">
          <Nav.Link onClick={handleLoginModalToggle} className="me-3">
            <FaUser /> {/* Member-icon */}
          </Nav.Link>
          <Nav.Link onClick={handleCartDrawerToggle}>
            <FaShoppingBag /> {/* Shopping bag-icon */}
          </Nav.Link>
        </Nav>

        {/* Offcanvas Menu for Mobile */}
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
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Offcanvas Menu for Cart */}
        <Cart show={cartDrawerOpen} onHide={() => setCartDrawerOpen(false)} />

        {/* Login Modal */}
        <LoginModal show={loginModalOpen} onHide={handleLoginModalToggle} onSwitchToRegister={handleSwitchToRegister} />

        {/* Register Modal */}
        <RegisterModal show={registerModalOpen} onHide={handleRegisterModalToggle} onSwitchToLogin={handleSwitchToLogin} />
      </Container>
    </Navbar>
  );
}

//LILO loggan ändra färg?
// ikoner horisontellt
// bort med ringen runt menyn
