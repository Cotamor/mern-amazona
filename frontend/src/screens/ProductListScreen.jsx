import { useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import { getError } from '../utils'
import { Button, Table, Row, Col } from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { toast } from 'react-toastify'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true }
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false }
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false }
    default:
      return state
  }
}

const ProductListScreen = () => {
  const [{ loading, error, products, pages, loadingCreate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    })

  const navigate = useNavigate()
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const page = sp.get('page') || 1

  const { state } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [page, userInfo])

  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' })
        const { data } = await axios.post(
          '/api/products',
          {},
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        )
        toast.success('Product created successfully')
        dispatch({ type: 'CREATE_SUCCESS' })
        navigate(`/admin/product/${data.product._id}`)
      } catch (err) {
        toast.error(getError(err))
        dispatch({ type: 'CREATE_FAIL' })
      }
    }
  }

  return (
    <div>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="col text-end">
          <Button type="button" onClick={createHandler}>
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <LoadingBox></LoadingBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Table hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
export default ProductListScreen
