import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import { Navbar, Container, Nav, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react'
import { Store } from './Store'

function App() {
  const { state } = useContext(Store)
  const { cart } = state

  return (
    <Router>
      <div className="d-flex flex-column site-container">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container bg="primary">
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>

              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart{' '}
                  {cart.cartItems.length > 0 && (
                    <>
                      <Badge pill bg="danger">
                        Items: {cart.cartItems.length}
                      </Badge>
                      <Badge pill bg="info">
                        Qty:{' '}
                        {cart.cartItems.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}
                      </Badge>
                    </>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reverved</div>
        </footer>
      </div>
    </Router>
  )
}

export default App
