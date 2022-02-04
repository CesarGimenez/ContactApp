import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Contacts } from "../Pages/Contacts";
import { Products } from "../Pages/Products";
import { Orders } from "../Pages/Orders";
import { Container, Nav, Navbar } from "react-bootstrap";

export const Navigation = () => {
  return (
    <div>
      <Router>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to={"/"}>
              ContactApp
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/products"}>
                Productos
              </Nav.Link>
              <Nav.Link as={Link} to={"/orders"}>
                Ordenes
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<Contacts />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route path="*" element={<Contacts />} />
        </Routes>
      </Router>
    </div>
  );
};
