import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Store } from '../Store'
import { Helmet } from 'react-helmet-async'
import { Form, Button } from 'react-bootstrap'
import { useReducer } from 'react'
import axios from 'axios'
import { getError } from '../utils'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true }
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false }
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false }
    default:
      return state
  }
}

const ProductEditScreen = () => {
  const params = useParams() // /product/:id
  const { id: productId } = params

  const { state } = useContext(Store)
  const { userInfo } = state
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  })

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/products/${productId}`)
        setName(data.name)
        setSlug(data.slug)
        setPrice(data.price)
        setImage(data.image)
        setCategory(data.category)
        setCountInStock(data.countInStock)
        setBrand(data.brand)
        setDescription(data.description)
        dispatch({ type: 'FETCH_SUCCESS' })
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) })
      }
    }
    fetchData()
  }, [productId])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <div>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="container small-container">
          <h1 className="my-3">Edit Product</h1>
          <Form onSubmit={submitHandler}>
            {/* Name */}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            {/* Slug */}
            <Form.Group className="mb-3" controlId="slug">
              <Form.Label>slug</Form.Label>
              <Form.Control
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            {/* Image */}
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image File</Form.Label>
              <Form.Control
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>

            {/* Category */}
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>

            {/* Brand */}
            <Form.Group className="mb-3" controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>

            {/* CountInStock */}
            <Form.Group className="mb-3" controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>setDescription</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid mb-3">
              <Button type="submit" variant="primary">
                Update
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  )
}
export default ProductEditScreen
