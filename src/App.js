import React, {useState} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component'
import Dashboard from './components/dashboard.component'

function App() {
  const [token, setToken] = useState();

  if(token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
             Laravel Ace
            </Link>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav ml-auto">
              </ul>
            </div>
          </div>
        </nav>

          <div className="container">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
            </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App
