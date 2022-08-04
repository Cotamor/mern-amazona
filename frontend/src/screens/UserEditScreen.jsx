import { useState, useReducer, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { Store } from '../Store'
import { getError } from '../utils'
import { Button, Container, Form } from 'react-bootstrap'
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

    default:
      return state
  }
}

const UserEditScreen = () => {
  const params = useParams()
  const { id: userId } = params
  const { state } = useContext(Store)
  const { userInfo } = state
  const navigate = useNavigate()

  const [{ loading, loadingUpdate, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        setName(data.name)
        setEmail(data.email)
        setIsAdmin(data.isAdmin)
        dispatch({ type: 'FETCH_SUCCESS' })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [userInfo, userId])

  const updateHandler = async (e) => {
    e.preventDefault()
    try {
      await axios.put(
        `/api/users/${userId}`,
        {
          _id: userId,
          name,
          email,
          isAdmin,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      )
      dispatch({ type: 'UPDATE_SUCCESS' })
      toast.success('User updated successfully')
      navigate('/admin/users')
    } catch (err) {
      toast.error(getError(err))
      dispatch({ type: 'UPDATE_FAIL' })
    }
  }

  return (
    <Container className="small-container">
      <Helmet>
        <title>Edit User</title>
      </Helmet>
      <h1 className="my-3">Edit User</h1>
      <h3>ID: {userId}</h3>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Check
            className="mb-3"
            type="checkbox"
            id="isAdmin"
            label="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />

          <div className="mb-3">
            <Button type="submit" disabled={loadingUpdate}>
              Update
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  )
}
export default UserEditScreen
