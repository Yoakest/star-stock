import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import ProductList from './views/productList';
import EditProduct from './views/editProduct';
import CreateProduct from './views/createProduct';

function App() {
  return (
    <Router>
      {/* Navbar Başlangıcı */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Stok Takip</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Ürün Listesi</Nav.Link>
              <Nav.Link as={Link} to="/create-product">Ürün Oluştur</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Navbar Bitişi */}

      {/* Sayfa İçeriği */}
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
