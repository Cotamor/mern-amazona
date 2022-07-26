import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

function App() {
  return (
    <Router>
      <header className="App-header">
        <Link to="/">Amazona</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:slug" element={<ProductScreen />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
