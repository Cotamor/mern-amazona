import Alert from 'react-bootstrap/Alert'
const MessageBox = ({ variant, children }) => {
  return <Alert variant={variant ? variant : 'info'}>{children}</Alert>
}
export default MessageBox
