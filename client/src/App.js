import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import ProductList from './views/productList';
import EditProduct from './views/editProduct';
import CreateProduct from './views/productCreate';
import CreateCategory from './views/categoryCreate';
import CategoryList from './views/categoryList';
import EditCategory from './views/categoryEdit';
import CreateShipment from './views/createShipment';

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
              <Nav.Link as={Link} to="/category-list">Kategori Listesi</Nav.Link> 
              <Nav.Link as={Link} to="/create-product">Ürün Oluştur</Nav.Link>
              <Nav.Link as={Link} to="/create-category">Kategori Oluştur</Nav.Link>
              <Nav.Link as={Link} to="/create-shipment">Sipariş Olustur</Nav.Link>
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
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/edit-category/:id" element={<EditCategory />} />
          <Route path="/create-shipment" element={<CreateShipment />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
