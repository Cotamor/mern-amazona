import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Store } from '../Store'
import MessageBox from '../components/MessageBox'
import axios from 'axios'

const CartScreen = () => {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)

  const {
    cart: { cartItems },
  } = state

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`)
    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock')
      return
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
  }

  const removeItemHandler = (item) => {
    console.log('remove')
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const checkoutHandler = async () => {
    console.log('checkout')
    navigate('/signin?redirect=/shipping')
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>Cart is empty</MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-thumbnail img-fluid rounded"
                      />
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal(
                    {cartItems.reduce((acc, cur) => acc + cur.quantity, 0)}{' '}
                    items) : ${' '}
                    {cartItems.reduce(
                      (acc, cur) => acc + cur.price * cur.quantity,
                      0
                    )}
                  </h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to CheckOut
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
