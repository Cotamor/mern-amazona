import { Link, useLocation } from 'react-router-dom'
import { Container, Form, Button, FormGroup } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'

const SigninScreen = () => {
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form>
        <FormGroup className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </FormGroup>
        <FormGroup className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
        </FormGroup>
        <div className="mb-3">
          <Button>Sign In</Button>
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your accound</Link>
        </div>
      </Form>
    </Container>
  )
}
export default SigninScreen
