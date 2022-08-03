import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import { Helmet } from 'react-helmet-async'
import { Form, Button, FormGroup } from 'react-bootstrap'
import { useReducer } from 'react'
import axios from 'axios'
import { getError } from '../utils'
import { toast } from 'react-toastify'
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
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' }
    case 'UPLOAD_SUCCESS':
      return { ...state, loadingUpload: false, errorUpload: '' }
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload }
    default:
      return state
  }
}

const ProductEditScreen = () => {
  const params = useParams() // /product/:id
  const { id: productId } = params

  const navigate = useNavigate()

  const { state } = useContext(Store)
  const { userInfo } = state
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
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

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch({ type: 'UPDATE_REQUEST' })
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          category,
          brand,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      )
      dispatch({ type: 'UPDATE_SUCCESS' })
      toast.success('Product updated successfully')
      navigate('/admin/products')
    } catch (err) {
      toast.error(getError(err))
      dispatch({ type: 'UPDATE_FAIL' })
    }
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const bodyFormData = new FormData()
    bodyFormData.append('file', file)
    try {
      dispatch({ type: 'UPLOAD_REQUEST' })
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      dispatch({ type: 'UPLOAD_SUCCESS' })

      toast.success('Image uploaded successfully')
      console.log(data)
      setImage(data.secure_url)
    } catch (err) {
      toast.error(getError(err))
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) })
    }
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

            {/* Image Upload */}
            <Form.Group className="mb-3" controlId="imageFile">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={uploadFileHandler} />
              {loadingUpload && <LoadingBox></LoadingBox>}
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
              <Button type="submit" variant="primary" disabled={loadingUpdate}>
                Update
              </Button>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            </div>
          </Form>
        </div>
      )}
    </div>
  )
}
export default ProductEditScreen
